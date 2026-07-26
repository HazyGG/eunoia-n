name = 'Nisrina Dhiya Zahira'

print('===================')

for character in name:
    print(character)

print('===================')

#======================

name = 'World'
line = '+'
for _ in name:
    line += '-'
print(line + '+')
print('|' + name + '|')
print(line + '+')

name = 'World'

for character in name:
    print(character)

#======================

name = 'World'
line = '+'

for _ in name:
    line += '-'
print('+' + name + '+')

for character in name:
    print(character + '     ' + character)

print('+' + name + '+')

#Solusi dari atas^^ ada dibawah ini

name = 'World'

line = '+' + name + '+'
spaces = ''
for _ in name:
    spaces += ' '
    
print(line)
for char in name:
    print(char + spaces + char)
print(line)

#======================

name = 'World'
spaces = ''
for char in name:
    spaces += ' '
    print(spaces + char)

#======================

if True:
    print('Yes true')
if False:
    print('No false')

#----------------------

sentence = 'Hello World'
excited = False
confused = True
if excited:
    sentence += '!'
if confused:
    sentence += '?'
print(sentence)

sentence = 'Hello World'
excited = True

if excited:
    new_sentence = ''
    for char in sentence:
        new_sentence += char + '!'
    sentence = new_sentence
    
print (sentence)

#======================

sentence = 'Hello World'
excited = True

if excited:
    new_sentence = ' '
    for char in sentence:
        new_sentence += char + '!'
    sentence = new_sentence

print(sentence)