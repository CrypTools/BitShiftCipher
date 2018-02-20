// Test made using EyeJS - https://eye.js.org

const path = require('path').normalize(__testDir + "/../")

const { encrypt, decrypt } = require(path + "lib.js")


eye.test("Encryption", "node",
	$ => $(encrypt("Hello World", "key")).Equal("WzM3NDQyLDUyNDg4LDU1ODc0LDU2MDcyLDU3NDEwLDE3MTYwLDQ1MTIyLDU3NjA4LDU4OTQ2LDU2MDcyLDUxNzc4XQ==")
)
eye.test("Decryption", "node",
	$ => $(decrypt("WzM3NDQyLDUyNDg4LDU1ODc0LDU2MDcyLDU3NDEwLDE3MTYwLDQ1MTIyLDU3NjA4LDU4OTQ2LDU2MDcyLDUxNzc4XQ==", "key")).Equal("Hello World"),
	$ => $(decrypt(encrypt("Hello World!", "key"), "key")).Equal("Hello World!")
)
