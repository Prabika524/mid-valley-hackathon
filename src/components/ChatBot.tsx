import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  MessageCircle,
  X,
  Send,
  Paperclip,
  ImageIcon,
  Loader2,
  Bot,
  User,
  ChevronDown,
  Mountain,
  AlertCircle,
  Trash2,
} from 'lucide-react';

// ── Types ─────────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  imageUrl?: string; // base64 data URL
  timestamp: Date;
  error?: boolean;
}

interface GroqContentPart {
  type: 'text' | 'image_url';
  text?: string;
  image_url?: { url: string };
}

// ── Groq API helper ───────────────────────────────────────────────────────────

const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';
// qwen/qwen3.6-27b is Groq's supported vision (multimodal) model
const GROQ_MODEL = 'qwen/qwen3.6-27b';

const SYSTEM_PROMPT = `You are "Himalayan Guide" – a knowledgeable, friendly AI assistant specializing in Nepal's heritage, culture, nature, and travel. 

When a user shares an image:
1. First determine if the image is from Nepal (look for Himalayan landscapes, pagoda temples, prayer flags, traditional Newari architecture, monasteries, stupas, trekking trails, wildlife like snow leopards or rhinos, local attire, etc.).
2. If it IS from Nepal: identify the specific location/landmark/cultural element and share rich, engaging historical and cultural context.
3. If it is NOT from Nepal: politely say so, explain what you see, and offer to answer any Nepal-related questions.

For text questions about Nepal, provide accurate, enthusiastic information covering:
- UNESCO World Heritage Sites (Pashupatinath, Boudhanath, Swayambhunath, Patan Durbar Square, Bhaktapur Durbar Square, Changu Narayan, Lumbini, Chitwan, Sagarmatha)
- Trekking routes (Everest Base Camp, Annapurna Circuit, Langtang, Mustang, etc.)
- Nepali festivals (Dashain, Tihar, Holi, Bisket Jatra, etc.)
- Flora, fauna, geography
- Local cuisine, customs, etiquette
- Travel tips and best seasons

Always keep responses warm, concise, and informative. Use emojis sparingly for personality. If a question is completely unrelated to Nepal, gently steer the conversation back.`;

async function callGroqAPI(
  messages: { role: string; content: string | GroqContentPart[] }[],
  apiKey: string
): Promise<string> {
  const response = await fetch(GROQ_API_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [{ role: 'system', content: SYSTEM_PROMPT }, ...messages],
      max_tokens: 1024,
      temperature: 0.7,
      reasoning_format: 'hidden',
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(
      (err as { error?: { message?: string } }).error?.message ||
      `Groq API error: ${response.status}`
    );
  }

  const data = await response.json() as {
    choices: { message: { content: string } }[];
  };
  const reply = data.choices[0]?.message?.content ?? 'No response received.';
  return reply.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
}

// Convert a File to base64 data URL
function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ── Markdown-lite renderer ────────────────────────────────────────────────────

function renderText(text: string): React.ReactNode[] {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Bold **text**
    const parts = line.split(/(\*\*[^*]+\*\*)/g).map((p, j) => {
      if (p.startsWith('**') && p.endsWith('**')) {
        return <strong key={j}>{p.slice(2, -2)}</strong>;
      }
      return p;
    });

    // Bullet points
    if (line.startsWith('- ') || line.startsWith('• ')) {
      return (
        <div key={i} className="flex gap-2 my-0.5">
          <span className="text-cyan-400 mt-0.5">•</span>
          <span>{parts.slice(1)}</span>
        </div>
      );
    }

    return (
      <React.Fragment key={i}>
        {parts}
        {i < lines.length - 1 && <br />}
      </React.Fragment>
    );
  });
}

// ── ChatBot component ─────────────────────────────────────────────────────────

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: "Namaste! 🙏 I'm your **Himalayan Guide** – your AI companion for everything Nepal. Ask me about heritage sites, trekking routes, culture, or upload an image and I'll tell you all about it!",
      timestamp: new Date(),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [pendingImage, setPendingImage] = useState<{
    file: File;
    url: string;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasNewMessage, setHasNewMessage] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const textInputRef = useRef<HTMLTextAreaElement>(null);
  const chatHistory = useRef<{ role: string; content: string | GroqContentPart[] }[]>([]);

  const envKey = (import.meta as unknown as { env: Record<string, string> }).env.VITE_GROQ_API_KEY;
  const apiKey = envKey || '';

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus input on open
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => textInputRef.current?.focus(), 300);
      setHasNewMessage(false);
    }
  }, [isOpen]);

  const handleImageSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      alert('Image must be under 10 MB.');
      return;
    }
    const url = await fileToBase64(file);
    setPendingImage({ file, url });
    // Reset file input so same file can be re-selected
    e.target.value = '';
  };

  const sendMessage = useCallback(async () => {
    const text = inputText.trim();
    if (!text && !pendingImage) return;
    if (isLoading) return;

    if (!apiKey || apiKey === 'gsk_your_groq_api_key_here') {
      const errMsg: ChatMessage = {
        id: Date.now().toString(),
        role: 'assistant',
        text: '⚠️ No Groq API key found. Please add your `VITE_GROQ_API_KEY` to the `.env` file and restart the dev server.',
        timestamp: new Date(),
        error: true,
      };
      setMessages((prev) => [...prev, errMsg]);
      return;
    }

    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      role: 'user',
      text: text || (pendingImage ? 'What can you tell me about this image?' : ''),
      imageUrl: pendingImage?.url,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setPendingImage(null);
    setIsLoading(true);

    // Build content for Groq
    const content: GroqContentPart[] = [];
    if (pendingImage) {
      content.push({ type: 'image_url', image_url: { url: pendingImage.url } });
    }
    if (userMsg.text) {
      content.push({ type: 'text', text: userMsg.text });
    }

    const userGroqMessage = {
      role: 'user',
      content: content.length === 1 && content[0].type === 'text'
        ? content[0].text!
        : content,
    };

    chatHistory.current = [...chatHistory.current, userGroqMessage];

    try {
      const reply = await callGroqAPI(chatHistory.current, apiKey);
      const assistantMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: reply,
        timestamp: new Date(),
      };
      chatHistory.current = [
        ...chatHistory.current,
        { role: 'assistant', content: reply },
      ];
      setMessages((prev) => [...prev, assistantMsg]);
      if (!isOpen) setHasNewMessage(true);
    } catch (err) {
      const errMsg: ChatMessage = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        text: `❌ Error: ${(err as Error).message}. Please check your API key and try again.`,
        timestamp: new Date(),
        error: true,
      };
      setMessages((prev) => [...prev, errMsg]);
      // Remove the failed user message from history
      chatHistory.current = chatHistory.current.slice(0, -1);
    } finally {
      setIsLoading(false);
    }
  }, [inputText, pendingImage, isLoading, apiKey, isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const clearChat = () => {
    chatHistory.current = [];
    setMessages([
      {
        id: 'welcome',
        role: 'assistant',
        text: "Namaste! 🙏 I'm your **Himalayan Guide** – your AI companion for everything Nepal. Ask me about heritage sites, trekking routes, culture, or upload an image and I'll tell you all about it!",
        timestamp: new Date(),
      },
    ]);
  };

  const formatTime = (d: Date) =>
    d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <>
      {/* ── Floating Button ───────────────────────────────────────────────── */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
        {/* Unread badge */}
        {!isOpen && hasNewMessage && (
          <div
            className="text-xs font-semibold px-3 py-1.5 rounded-full animate-bounce"
            style={{
              background: 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
              color: '#fff',
              boxShadow: '0 0 20px rgba(34,211,238,0.5)',
            }}
          >
            New reply ↓
          </div>
        )}

        <button
          onClick={() => setIsOpen((o) => !o)}
          aria-label={isOpen ? 'Close chatbot' : 'Open Nepal AI Guide'}
          className="relative w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300"
          style={{
            background: isOpen
              ? 'rgba(15,23,42,0.9)'
              : 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
            border: '1px solid rgba(34,211,238,0.5)',
            boxShadow: isOpen
              ? '0 0 20px rgba(34,211,238,0.2)'
              : '0 0 30px rgba(34,211,238,0.6), 0 0 60px rgba(34,211,238,0.2)',
            transform: isOpen ? 'scale(0.95)' : 'scale(1)',
          }}
        >
          {/* Pulse ring when closed */}
          {!isOpen && (
            <span
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                background: 'rgba(34,211,238,0.25)',
                animationDuration: '2s',
              }}
            />
          )}
          {isOpen ? (
            <ChevronDown size={22} color="#22d3ee" />
          ) : (
            <Mountain size={22} color="#fff" />
          )}
        </button>
      </div>

      {/* ── Chat Panel ───────────────────────────────────────────────────── */}
      <div
        className="fixed bottom-24 right-6 z-50 flex flex-col rounded-2xl overflow-hidden transition-all duration-400"
        style={{
          width: '380px',
          maxHeight: '600px',
          background: 'rgba(7,12,27,0.92)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid rgba(34,211,238,0.25)',
          boxShadow:
            '0 24px 60px rgba(0,0,0,0.7), 0 0 40px rgba(34,211,238,0.1)',
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transform: isOpen ? 'translateY(0) scale(1)' : 'translateY(20px) scale(0.97)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-3 flex-shrink-0"
          style={{
            background: 'rgba(6,182,212,0.12)',
            borderBottom: '1px solid rgba(34,211,238,0.2)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: 'linear-gradient(135deg, #06b6d4, #0284c7)',
                boxShadow: '0 0 15px rgba(34,211,238,0.4)',
              }}
            >
              <Mountain size={18} color="#fff" />
            </div>
            <div>
              <p className="text-sm font-semibold text-white leading-none">
                Himalayan Guide
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: '#22d3ee',
                    boxShadow: '0 0 6px #22d3ee',
                    animation: 'pulse-glow 2s infinite',
                  }}
                />
                <span className="text-xs" style={{ color: '#94a3b8' }}>
                  Powered by Groq
                </span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={clearChat}
              title="Clear chat"
              className="p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: '#94a3b8' }}
            >
              <Trash2 size={15} />
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="p-2 rounded-lg transition-colors hover:bg-white/10"
              style={{ color: '#94a3b8' }}
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div
          className="flex-1 overflow-y-auto p-4 flex flex-col gap-4"
          style={{ minHeight: 0 }}
        >
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2.5 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}
            >
              {/* Avatar */}
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
                style={{
                  background:
                    msg.role === 'assistant'
                      ? 'linear-gradient(135deg, #06b6d4, #0284c7)'
                      : 'rgba(255,255,255,0.1)',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {msg.role === 'assistant' ? (
                  <Bot size={14} color="#fff" />
                ) : (
                  <User size={14} color="#94a3b8" />
                )}
              </div>

              {/* Bubble */}
              <div
                className="max-w-[78%] flex flex-col gap-1.5"
                style={{ alignItems: msg.role === 'user' ? 'flex-end' : 'flex-start' }}
              >
                {/* Image preview */}
                {msg.imageUrl && (
                  <img
                    src={msg.imageUrl}
                    alt="Uploaded"
                    className="rounded-xl max-w-full"
                    style={{
                      maxHeight: '180px',
                      objectFit: 'cover',
                      border: '1px solid rgba(34,211,238,0.3)',
                    }}
                  />
                )}

                {/* Text bubble */}
                {msg.text && (
                  <div
                    className="rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
                    style={
                      msg.role === 'user'
                        ? {
                          background:
                            'linear-gradient(135deg, rgba(6,182,212,0.85), rgba(14,165,233,0.85))',
                          color: '#fff',
                          borderBottomRightRadius: '4px',
                        }
                        : msg.error
                          ? {
                            background: 'rgba(239,68,68,0.12)',
                            border: '1px solid rgba(239,68,68,0.3)',
                            color: '#fca5a5',
                            borderBottomLeftRadius: '4px',
                          }
                          : {
                            background: 'rgba(255,255,255,0.06)',
                            border: '1px solid rgba(255,255,255,0.1)',
                            color: '#e2e8f0',
                            borderBottomLeftRadius: '4px',
                          }
                    }
                  >
                    {msg.role === 'assistant' && !msg.error ? (
                      renderText(msg.text)
                    ) : (
                      msg.text
                    )}
                  </div>
                )}

                <span className="text-xs px-1" style={{ color: '#475569' }}>
                  {formatTime(msg.timestamp)}
                </span>
              </div>
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex gap-2.5">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                style={{ background: 'linear-gradient(135deg, #06b6d4, #0284c7)' }}
              >
                <Bot size={14} color="#fff" />
              </div>
              <div
                className="rounded-2xl px-4 py-3 flex items-center gap-1.5"
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderBottomLeftRadius: '4px',
                }}
              >
                {[0, 0.2, 0.4].map((delay, i) => (
                  <span
                    key={i}
                    className="w-2 h-2 rounded-full"
                    style={{
                      background: '#22d3ee',
                      animation: `pulse-glow 1.2s ease-in-out ${delay}s infinite`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Image preview strip */}
        {pendingImage && (
          <div
            className="flex items-center gap-3 px-4 py-2 flex-shrink-0"
            style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
          >
            <div className="relative">
              <img
                src={pendingImage.url}
                alt="Pending"
                className="w-12 h-12 rounded-lg object-cover"
                style={{ border: '1px solid rgba(34,211,238,0.4)' }}
              />
              <button
                onClick={() => setPendingImage(null)}
                className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full flex items-center justify-center"
                style={{ background: '#ef4444' }}
              >
                <X size={9} color="#fff" />
              </button>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-white truncate">
                {pendingImage.file.name}
              </p>
              <p className="text-xs" style={{ color: '#94a3b8' }}>
                <ImageIcon size={10} className="inline mr-1" />
                Image attached — add a question or just send
              </p>
            </div>
          </div>
        )}

        {/* Input area */}
        <div
          className="flex items-end gap-2 px-3 py-3 flex-shrink-0"
          style={{ borderTop: '1px solid rgba(34,211,238,0.15)' }}
        >
          {/* Image attach */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageSelect}
            id="chatbot-image-input"
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            title="Attach image"
            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{
              background: pendingImage
                ? 'rgba(34,211,238,0.2)'
                : 'rgba(255,255,255,0.06)',
              border: `1px solid ${pendingImage ? 'rgba(34,211,238,0.5)' : 'rgba(255,255,255,0.1)'}`,
              color: pendingImage ? '#22d3ee' : '#94a3b8',
            }}
          >
            <Paperclip size={16} />
          </button>

          {/* Text input */}
          <textarea
            ref={textInputRef}
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask about Nepal… (Enter to send)"
            rows={1}
            className="flex-1 resize-none rounded-xl px-3 py-2.5 text-sm outline-none transition-all duration-200"
            style={{
              background: 'rgba(255,255,255,0.05)',
              border: '1px solid rgba(255,255,255,0.12)',
              color: '#f8fafc',
              maxHeight: '120px',
              lineHeight: '1.5',
            }}
            onInput={(e) => {
              const t = e.currentTarget;
              t.style.height = 'auto';
              t.style.height = Math.min(t.scrollHeight, 120) + 'px';
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = '#22d3ee';
              e.currentTarget.style.boxShadow =
                '0 0 15px rgba(34,211,238,0.25)';
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.12)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          />

          {/* Send */}
          <button
            onClick={sendMessage}
            disabled={isLoading || (!inputText.trim() && !pendingImage)}
            className="flex-shrink-0 w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{
              background:
                isLoading || (!inputText.trim() && !pendingImage)
                  ? 'rgba(255,255,255,0.05)'
                  : 'linear-gradient(135deg, #06b6d4, #0ea5e9)',
              border: '1px solid rgba(255,255,255,0.1)',
              color:
                isLoading || (!inputText.trim() && !pendingImage)
                  ? '#475569'
                  : '#fff',
              boxShadow:
                !isLoading && (inputText.trim() || pendingImage)
                  ? '0 0 15px rgba(34,211,238,0.4)'
                  : 'none',
            }}
          >
            {isLoading ? (
              <Loader2 size={16} className="animate-spin" />
            ) : (
              <Send size={16} />
            )}
          </button>
        </div>

        {/* Footer note */}
        <div
          className="text-center py-1.5 flex-shrink-0 flex items-center justify-center gap-1"
          style={{
            color: '#334155',
            fontSize: '10px',
            borderTop: '1px solid rgba(255,255,255,0.05)',
          }}
        >
          <AlertCircle size={9} />
          AI can make mistakes. Verify important information.
        </div>
      </div>
    </>
  );
}
