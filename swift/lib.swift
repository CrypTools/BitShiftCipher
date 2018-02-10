/*********************************

Use: "Hello World!".encrypt(keyValue: "key")
	 "Hello World!".encrypt(keyValue: "key").decrypt(keyValue: "key")

*********************************/
import Foundation

// Get array of ascii values from string
extension String {
    var asciiArray: [UInt32] {
        return unicodeScalars.filter{$0.isASCII}.map{$0.value}
    }
}
extension Character {
    var asciiValue: UInt32? {
        return String(self).unicodeScalars.filter{$0.isASCII}.first?.value
    }
}
// Base 64
extension String {

    func fromBase64() -> String? {
        guard let data = Data(base64Encoded: self) else {
            return nil
        }

        return String(data: data, encoding: .utf8)
    }

    func toBase64() -> String {
        return Data(self.utf8).base64EncodedString()
    }
}

extension String {
    func encrypt(keyValue: String) -> String {
        let encoded = self.asciiArray
        var keyEncoded = keyValue.asciiArray

        let array = encoded.map({
            x -> (UInt32) in
            var y = x
            for i in keyEncoded {
                y = (y + 1) << (i % 8)
            }
            keyEncoded = keyEncoded.reversed()
            return y;
        })
        return array.description.toBase64()
    }
    func decrypt(keyValue: String) -> String {
        let toString = self.fromBase64()
        let chars = CharacterSet(charactersIn: ",][ ")
        let encoded = toString!.components(separatedBy: chars).filter {$0 != ""}.flatMap { UInt32($0)}
        var keyEncoded = keyValue.asciiArray

        let array = encoded.map({
            x -> (UInt32) in
            keyEncoded = keyEncoded.reversed()
            var y = x
            for i in keyEncoded {
                y = (y - 1) >> (i % 8)
            }
            return y;
        })
        var output = "";
        for i in array {
            output += String(UnicodeScalar(UInt8(i)))
        }
        return output
    }
}
