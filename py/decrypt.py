# ==============================================================================
#
#    Use:
#    decrypt(b'WzM3NDQyLCA1MjQ4OCwgNTU4NzQsIDU2MDcyLCA1NzQxMCwgMTcxNjAsIDQ1MTIyLCA1NzYwOCwgNTg5NDYsIDU2MDcyLCA1MTc3OCwgMTc2NzJd', "key")
#    => "Hello World!"
#
# ==============================================================================

import base64

def encode(text):

        encoded_arr = [ord(i) for i in text]
        return encoded_arr

def decrypt(text, key):

	encoded_key = encode(key)
	decoded_b64 = eval(base64.b64decode(text))
	buf = []

	for x in decoded_b64:
		encoded_key = list(reversed(encoded_key))

		for i in encoded_key:
			x = x - 1 >> i % 8

		buf.append(x)

	decrypted_string = ''.join(chr(letter) for letter in buf)

	return decrypted_string
