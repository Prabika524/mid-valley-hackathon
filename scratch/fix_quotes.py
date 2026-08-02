import re

filepath = r'c:\Users\ASUS\Downloads\Mid-Valley-Hackathon-main\Mid-Valley-Hackathon-main\src\pages\CalendarPage.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Replace any '...' inside FESTIVALS block that contains unescaped single quotes by converting single quotes inside strings to double quotes or escaping them properly.

def fix_line(line):
    # Regex to find single quoted strings: 'something'
    # If it contains single quotes inside without backslash, fix it.
    parts = line.split("'")
    if len(parts) <= 3:
        return line
    # If line has multiple single quotes, let's fix keys like name: 'The Dwarika's Restaurant'
    # We can replace single quotes inside property values with double quotes or backticks if needed.
    return line

lines = text.split('\n')
fixed = []
in_festivals = False
for line in lines:
    if 'const FESTIVALS: Festival[] = [' in line:
        in_festivals = True
    if 'const MONTH_NAMES =' in line:
        in_festivals = False
    
    if in_festivals:
        # Fix lines like name: 'The Dwarika's Restaurant'
        # Or history: '... princess's hair ...'
        # Replace 'The Dwarika's Restaurant' with "The Dwarika's Restaurant" or escape the inner single quotes
        # We can look for strings starting with ' and ending with ' or ',
        stripped = line.strip()
        if stripped.startswith('{ name:') or stripped.startswith('name:') or stripped.startswith('category:') or stripped.startswith('description:') or stripped.startswith('history:') or stripped.startswith('experience:'):
            colon_idx = line.find(':')
            prefix = line[:colon_idx+1]
            val_part = line[colon_idx+1:].strip()
            has_comma = val_part.endswith(',')
            if has_comma:
                val_part = val_part[:-1]
            if val_part.startswith("'") and val_part.endswith("'"):
                inner = val_part[1:-1]
                inner_clean = inner.replace("\\'", "'").replace("'", "\\'")
                val_part = f"'{inner_clean}'"
            if has_comma:
                val_part += ','
            line = f"{prefix} {val_part}"
        elif stripped.startswith("'"):
            # array element like 'The chariot — over 15 meters tall — is slowly towed by hand through Patan's narrow streets over 4-6 weeks.',
            has_comma = stripped.endswith(',')
            content_str = stripped[1:-2] if has_comma else stripped[1:-1]
            content_clean = content_str.replace("\\'", "'").replace("'", "\\'")
            indent = line[:line.find("'")]
            comma = "," if has_comma else ""
            line = f"{indent}'{content_clean}'{comma}"

    fixed.append(line)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write('\n'.join(fixed))

print('Fixed all lines cleanly!')
