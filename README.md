# BitShiftCipher
A homemade encryption solution

# How it works?
## Encryption
We first take the array of **ASCII code** of the **text** and the **key**.

Then, we loop inside our **text** array, and for each items, we **loop** through the **key** array. In this loop, if `x` was the item from the **text** array, and `i` the item from the **key** array, we have
```
x = x + 1 << i % 12
```
After that, we reverse the **key** array and we continue the loop.

Once the loop is finished, we encode our new array using `base64`, and we output this value.

## Decryption
We first take the array of **ASCII code** of the **key**.

Then, we decrypt the `base64` string, and we evaluate it.

After that, we loop inside our decrypted **text** array,

we reverse the **key** array and we continue the loop

and for each items (in our loop), we **loop** through the **key** array. In this loop, if `x` was the item from the decrypted **text** array, and `i` the item from the **key** array, we have
```
x = x - 1 >> i % 12
```


Once the loop is finished, we decode our array using the **ASCII table**, and we output this value.

# Languages

> ⚠️ Each languages will output different encrypted string, because of their number / math support.

- JavaScript (Node JS only for the moment):
```js
// Encrypt
"Hello World!".encrypt("key")
// Decrypt
"Wzk1NjgzMjIsMTM0MzY5MjgsMTQyODY5MTQsMTQzNTQ0MzIsMTQ2ODAxMzAsNDM5Mjk2MCwxMTUzNDQwMiwxNDc0NzY0OCwxNTA3MzM0NiwxNDM1NDQzMiwxMzIzODMzOF0=".decrypt("key")
```
- Swift:
```swift
// Encrypt
"Hello World!".encrypt(keyValue: "key")
// Decrypt
"Hello World!".encrypt(keyValue: "key").decrypt(keyValue: "key")
```
