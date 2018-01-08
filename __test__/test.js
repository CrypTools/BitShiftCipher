// Test made using EyeJS - https://eye.js.org

const path = require('path').normalize(__testDir + "/../NodeJS/")

const encrypt = require(path + "encrypt.js")
const decrypt = require(path + "decrypt.js")


eye.test("Encryption", "node",
	$ => $(encrypt("Hello World", "key")).Equal("Wzk1NjgzMjIsMTM0MzY5MjgsMTQyODY5MTQsMTQzNTQ0MzIsMTQ2ODAxMzAsNDM5Mjk2MCwxMTUzNDQwMiwxNDc0NzY0OCwxNTA3MzM0NiwxNDM1NDQzMiwxMzIzODMzOF0=")
)
eye.test("Decryption", "node",
	$ => $(decrypt("Wzk1NjgzMjIsMTM0MzY5MjgsMTQyODY5MTQsMTQzNTQ0MzIsMTQ2ODAxMzAsNDM5Mjk2MCwxMTUzNDQwMiwxNDc0NzY0OCwxNTA3MzM0NiwxNDM1NDQzMiwxMzIzODMzOF0=", "key")).Equal("Hello World"),
	$ => $(decrypt(encrypt("Hello World!", "key"), "key")).Equal("Hello World!")
)
