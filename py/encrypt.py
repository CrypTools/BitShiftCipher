# ==============================================================================
#
#    Use:
#    encrypt("Hello World!", "key")
#    => b'WzM3NDQyLCA1MjQ4OCwgNTU4NzQsIDU2MDcyLCA1NzQxMCwgMTcxNjAsIDQ1MTIyLCA1NzYwOCwgNTg5NDYsIDU2MDcyLCA1MTc3OCwgMTc2NzJd'
#
# ==============================================================================

import base64

def encode(text):

        encoded_arr = [ord(i) for i in text]
        return encoded_arr

def encrypt(text, key):

        encoded_text = encode(text)
        encoded_key = encode(key)
        buf = []

        for x in encoded_text:
                for i in encoded_key:

                        x = x + 1 << i % 8

                encoded_key = list(reversed(encoded_key))
                buf.append(x)

        encrypt_string = base64.b64encode(str(buf).encode("ascii"))
        
        return encrypt_string
