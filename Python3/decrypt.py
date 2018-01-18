import base64

def encode(text):
        encoded = [ord(i) for i in text]
        return encoded

def decrypt(text, key):
	encoded_key = encode(key)
	decoded_b64 = eval(base64.b64decode(text))
	#print(decoded)
	buf = []
	for x in decoded_b64:
		encoded_key = list(reversed(encoded_key))
		for i in encoded_key:
			x = x - 1 >> i % 12
		buf.append(x)
	
	decrypted_string = ''.join(chr(letter) for letter in buf)
	print(decrypted_string)
	# return decrypted_string

####################################
#
# Use: decrypt("Wzk1NjgzMjIsIDEzNDM2OTI4LCAxNDI4NjkxNCwgMTQzNTQ0MzIsIDE0NjgwMTMwLCA0MzkyOTYwLCAxMTUzNDQwMiwgMTQ3NDc2NDgsIDE1MDczMzQ2LCAxNDM1NDQzMiwgMTMyMzgzMzgsIDQ1MjQwMzJd", "key")
#
####################################
