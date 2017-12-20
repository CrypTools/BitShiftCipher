####################################
#
# Use: encrypt("Hello World!", "key")
#
####################################
import base64

def encrypt(text, key):
	def encode(text):
		array = []
		for i in text:
			array.append(ord(i))
		return array
	encoded = encode(text)
	keyEncoded = encode(key)
	buf = []
	for x in encoded:
		for i in keyEncoded:
			x = x + 1 << i % 12
		keyEncoded = list(reversed(keyEncoded))
		buf.append(x)
	array = list(buf)
	return base64.b64encode(str(array).encode("ascii"))
