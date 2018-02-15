/* ==========================================================================
 *
 *  Use:
 *  "WzM3NDQyLDUyNDg4LDU1ODc0LDU2MDcyLDU3NDEwLDE3MTYwLDQ1MTIyLDU3NjA4LDU4OTQ2LDU2MDcyLDUxNzc4XQ==".decrypt("key")
 *  => "Hello World!"
 *
 * ========================================================================== */

String.prototype.encode = function() {
    let array = [];
    for (let i of this) {
        array.push(i.charCodeAt(0))
    }
    return array
}
String.prototype.decrypt = function(key) {
    const keyEncoded = key.encode()
	if (typeof atob === 'undefined') {
        global.atob = b64Encoded => new Buffer(b64Encoded, 'base64').toString();
    }
    let array = JSON.parse(
        atob(this.toString())
    )
    let decrypted = array.map(x => {
		keyEncoded.reverse()
        x = parseInt(x)
        for (let i of keyEncoded) {
            x = x - 1 >> i % 8
        }
        return x;
    })
    return String.fromCharCode(...decrypted)
}

module.exports = (text, key) => text.decrypt(key)
