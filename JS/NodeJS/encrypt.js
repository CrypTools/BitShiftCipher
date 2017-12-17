/*****************************************

Use: "Hello World!".encrypt("key")
=> "Wzk1NjgzMjIsMTMzNjk0MTAsMTQyODY5MTQsMTQyODY5MTQsMTQ2ODAxMzAsNDMyNTQ0MiwxMTUzNDQwMiwxNDY4MDEzMCwxNTA3MzM0NiwxNDI4NjkxNCwxMzIzODMzOCw0NDU2NTE0XQ=="

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
String.prototype.encrypt = function(key) {
    const encoded = this.encode();
    const keyEncoded = key.encode();
    // console.log(keyEncoded)
    let array = encoded.map(x => {
        x = parseInt(x)
        for (let i of keyEncoded) {
            x = x + 1 << i % 12
        }
        return x;
    })
    return new Buffer(JSON.stringify(array)).toString('base64')
}
