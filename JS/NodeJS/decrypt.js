/*****************************************

Use: "Wzk1NjgzMjIsMTM0MzY5MjgsMTQyODY5MTQsMTQzNTQ0MzIsMTQ2ODAxMzAsNDM5Mjk2MCwxMTUzNDQwMiwxNDc0NzY0OCwxNTA3MzM0NiwxNDM1NDQzMiwxMzIzODMzOF0=".decrypt("key")
=> "Hello World!"

******************************************/

String.prototype.encode = function() {
    let array = [];
    for (let i of this) {
        array.push(i.charCodeAt(0))
    }
    return array
}
String.prototype.decrypt = function(key) {
    const keyEncoded = key.encode()
    let array = JSON.parse(
        new Buffer(this.toString(), 'base64').toString('ascii')
    )
    let decrypted = array.map(x => {
		keyEncoded.reverse()
        x = parseInt(x)
        for (let i of keyEncoded) {
            x = x - 1 >> i % 12
        }
        return x;
    })
    return String.fromCharCode(...decrypted)
}
