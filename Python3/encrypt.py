import base64

def encode(text):
        array = [ord(i) for i in text]
        return array
    
def encrypt(text, key):
        text_encoded = encode(text)
        print(text_encoded)
        key_encoded = encode(key)
        buf = []
        for x in text_encoded:
                for i in key_encoded:
                        x = x + 1 << i % 12
                        print(x)
                key_encoded = list(reversed(key_encoded))
                print(key_encoded)
                buf.append(x)

        encrypt_string = base64.b64encode(str(buf).encode("ascii"))
        return encrypt_string


####################################
#
# Uncomment to use: 
#encrypt("Hello World!", "key")
#
####################################

