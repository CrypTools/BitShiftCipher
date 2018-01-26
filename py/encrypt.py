import base64

def encode(text):
        # returns integer representing the Unicode code point of a character
        # For example, ord('A') returns 65
        encoded_arr = [ord(i) for i in text]
        return encoded_arr

def encrypt(text, key):
        encoded_text = encode(text)
        encoded_key = encode(key)
        buf = []
        for x in encoded_text:
                for i in encoded_key:
                        x = x + 1 << i % 12
                encoded_key = list(reversed(encoded_key))
                buf.append(x)

        encrypt_string = base64.b64encode(str(buf).encode("ascii"))
        print(encrypt_string)
        # return encrypt_string


####################################
#
# Uncomment:
#encrypt("Hello World!", "key")
#
####################################
