/*****************************************

Use: "Wzk1NjgzMjIsMTMzNjk0MTAsMTQyODY5MTQsMTQyODY5MTQsMTQ2ODAxMzAsNDMyNTQ0MiwxMTUzNDQwMiwxNDY4MDEzMCwxNTA3MzM0NiwxNDI4NjkxNCwxMzIzODMzOCw0NDU2NTE0XQ==".decrypt("key")
=> "Hello World!"

******************************************/

String.prototype.encode = function() {
    let array = [];
    for (let i of this) {
        array.push(i.charCodeAt(0))
    }
    return array
}
Array.prototype.lastItem = function() {
    return this[this.length - 1]
}
String.prototype.decrypt = function(key) {
    const keyEncoded = key.encode()
    let array = JSON.parse(
        new Buffer(this.toString(), 'base64').toString('ascii')
    )
    let decrypted = array.map(x => {
        x = parseInt(x)
        for (let i of keyEncoded) {
            x = x - 1 >> i % 12
        }
        return x;
    })
    return String.fromCharCode(...decrypted)
}
