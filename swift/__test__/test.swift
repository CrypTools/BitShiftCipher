// copy pasted

/*********************************

Use: "Hello World!".encrypt("key")
	 "Hello World!".encrypt("key").decrypt("key")

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
    func encrypt(_ keyValue: String) -> String {
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
    func decrypt(_ keyValue: String) -> String {
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

// Basic testing for swift

#if os(Linux) || os(FreeBSD)
    import Glibc
#else
    import Darwin
#endif

func test() -> Int {
    print("Testing Encryption")
    if "Hello World!".encrypt("key") == "WzM3NDQyLCA1MjQ4OCwgNTU4NzQsIDU2MDcyLCA1NzQxMCwgMTcxNjAsIDQ1MTIyLCA1NzYwOCwgNTg5NDYsIDU2MDcyLCA1MTc3OCwgMTc2NzJd" {
        print("Done! No problems")
    } else {
        print("Oups!\n \"Hello World!\".encrypt('key') failed")
        print("Output: \("Hello World!".encrypt("key"))")
        exit(1)
    }

    print("Testing Decryption")
    if "WzM3NDQyLCA1MjQ4OCwgNTU4NzQsIDU2MDcyLCA1NzQxMCwgMTcxNjAsIDQ1MTIyLCA1NzYwOCwgNTg5NDYsIDU2MDcyLCA1MTc3OCwgMTc2NzJd".decrypt("key") == "Hello World!" {
        print("Done! No problems")
    } else {
        print("Oups!\n \"WzM3NDQyLCA1MjQ4OCwgNTU4NzQsIDU2MDcyLCA1NzQxMCwgMTcxNjAsIDQ1MTIyLCA1NzYwOCwgNTg5NDYsIDU2MDcyLCA1MTc3OCwgMTc2NzJd\".decrypt('key') isn't equal to \"Hello World!\"")
        print("Output: \("WzM3NDQyLCA1MjQ4OCwgNTU4NzQsIDU2MDcyLCA1NzQxMCwgMTcxNjAsIDQ1MTIyLCA1NzYwOCwgNTg5NDYsIDU2MDcyLCA1MTc3OCwgMTc2NzJd".decrypt("key"))")
        exit(1)
    }
    print("Tests are done.")
    return 0
}

let exec = test()
