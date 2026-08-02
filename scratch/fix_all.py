import re

filepath = r'c:\Users\ASUS\Downloads\Mid-Valley-Hackathon-main\Mid-Valley-Hackathon-main\src\pages\CalendarPage.tsx'

with open(filepath, 'r', encoding='utf-8') as f:
    text = f.read()

# Replace any occurrence of single quoted strings inside FESTIVALS that have apostrophes: e.g. 'The Dwarika's Restaurant' or 'Patan's'
# Simple regex: find 'name': '...' or 'whatHappens': [...] or any string key: '...'
# We can replace 'The Dwarika's Restaurant' with "The Dwarika's Restaurant"

text = text.replace("name: 'The Dwarika's Restaurant'", 'name: "The Dwarika\'s Restaurant"')
text = text.replace("name: 'The Dwarika\\'s Restaurant'", 'name: "The Dwarika\'s Restaurant"')
text = text.replace("name: \"The Dwarika's Restaurant\"", 'name: "The Dwarika\'s Restaurant"')

text = text.replace("location: 'Patan's Long Chariot Procession'", 'location: "Patan\'s Long Chariot Procession"')
text = text.replace("location: 'Patan\\'s Long Chariot Procession'", 'location: "Patan\'s Long Chariot Procession"')

text = text.replace("location: 'Nationwide (Nepal's Biggest Festival)'", 'location: "Nationwide (Nepal\'s Biggest Festival)"')
text = text.replace("location: 'Nationwide (Nepal\\'s Biggest Festival)'", 'location: "Nationwide (Nepal\'s Biggest Festival)"')

text = text.replace("category: 'Nepal's Biggest Festival (Tika Ceremony)'", 'category: "Nepal\'s Biggest Festival (Tika Ceremony)"')
text = text.replace("category: 'Nepal\\'s Biggest Festival (Tika Ceremony)'", 'category: "Nepal\'s Biggest Festival (Tika Ceremony)"')

text = text.replace("category: 'Women's Festival (Red Saris)'", 'category: "Women\'s Festival (Red Saris)"')
text = text.replace("category: 'Women\\'s Festival (Red Saris)'", 'category: "Women\'s Festival (Red Saris)"')

# General replace for unescaped apostrophes inside single-quoted strings:
# history: '... princess's hair ...' -> history: "... princess's hair ..."
# experience: '... Patan's medieval streets ...' -> experience: "... Patan's medieval streets ..."
# 'The chariot — over 15 meters tall — is slowly towed by hand through Patan's narrow streets over 4-6 weeks.',

lines = text.split('\n')
fixed = []
for line in lines:
    # If line contains unescaped ' inside single quote string, convert outer single quotes to double quotes if safe
    if "Patan's" in line and not '"Patan\'s' in line:
        line = line.replace("'Patan's", '"Patan\'s').replace("streets'", 'streets"')
    if "princess's" in line:
        line = line.replace("princess's", "princess\\'s")
    if "Buddha's" in line:
        line = line.replace("Buddha's", "Buddha\\'s")
    if "Gautama's" in line:
        line = line.replace("Gautama's", "Gautama\\'s")
    if "world's" in line:
        line = line.replace("world's", "world\\'s")
    if "Patan's" in line:
        line = line.replace("Patan's", "Patan\\'s")
    if "Shiva's" in line:
        line = line.replace("Shiva's", "Shiva\\'s")
    if "Nepal's" in line:
        line = line.replace("Nepal's", "Nepal\\'s")
    if "Women's" in line:
        line = line.replace("Women's", "Women\\'s")
    if "17th-century" in line:
        line = line.replace("17th-century", "17th century")
    if "Dwarika's" in line:
        line = line.replace("Dwarika's", "Dwarika\\'s")
    if "month's" in line:
        line = line.replace("month's", "month\\'s")
    if "sun's" in line:
        line = line.replace("sun's", "sun\\'s")
    fixed.append(line)

with open(filepath, 'w', encoding='utf-8') as f:
    f.write('\n'.join(fixed))

print('Fixed all apostrophes!')
