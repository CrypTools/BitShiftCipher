####################################
#
# Use: decrypt("Wzk1NjgzMjIsIDEzNDM2OTI4LCAxNDI4NjkxNCwgMTQzNTQ0MzIsIDE0NjgwMTMwLCA0MzkyOTYwLCAxMTUzNDQwMiwgMTQ3NDc2NDgsIDE1MDczMzQ2LCAxNDM1NDQzMiwgMTMyMzgzMzgsIDQ1MjQwMzJd", "key")
#
####################################
import base64

def decrypt(text, key):
	def encode(text):
		array = []
		for i in text:
			array.append(ord(i))
		return array
	keyEncoded = encode(key)
	encoded = eval(base64.b64decode(text))
	buf = []
	for x in encoded:
		keyEncoded = list(reversed(keyEncoded))
		for i in keyEncoded:
			x = x - 1 >> i % 12
		buf.append(x)
	array = list(buf)
	return ''.join(chr(i) for i in array)
