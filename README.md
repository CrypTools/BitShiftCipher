# BitShift Cipher
<p align="center">
<!-- replace image by project Image -->
<img height="128" src="https://cryptools.github.io/img/bit-shift.svg">
</p>
<p align="center">
<img src="https://cryptools.github.io/img/status/implemented.svg">
<img src="https://img.shields.io/github/license/Cryptools/BitShiftCipher.svg">
<img src="https://img.shields.io/github/contributors/Cryptools/BitShiftCipher.svg">
</p>

A homemade encryption solution

## How it works

### Encoding

The Bitshift Cipher works by (as the name suggests) shifting over the bits of the text's ASCII. We do this using the bitwise `<<` operator, which is used to shift the bits a certain number of places.

To encode the text, we loop through the text, and for each character `x`, we loop through the key array, and for each key character `i`:

```py
x = x + 1 << i % 12
```

We limit the maximum shift using modulo to avoid having a bit shifted by hundreds of places

Example:

Let's imagine we are currently working on the character `A`, and that our key is `YO`

```Python
A = 0b01000001 # ASCII for A
    0b01000010 # plus 1
    0b0100001000000 # Y is 89, 89 % 12 = 5, so we add 5 zeros.
    # next charachter in key: O
    0b0100001000001 # plus 1
    0b01000010000010000000 # O is 79, 79 % 12 = 7, so we add 7 zeros.
```

After each character is encoded, we add it to an array and reverse the key to make cryptanalysis harder.

Let's say the next character in our string is `B`, our key now is `OY`, as it was reversed.

```Python
B = 0b01000010 # ASCII for B
    0b01000011 # plus 1
    0b010000110000000 # O is 79, 79 % 12 = 7, so we add 7 zeros.
    # next character in key: Y
    0b010000110000001 # plus 1
    0b01000011000000100000 # Y is 89, 89 % 12 = 5, so we add 5 zeros.
```

Our array now looks like this: `[0b01000010000010000000, 0b01000011000000100000]`, or in decimal: `[270464, 274464]`.

Finally, we encode the array in base64 to get the final encrypted string: `b'WzI3MDQ2NCwgMjc0NDY0XQ=='`.

### Decoding

To decode, we start by decoding and evaluating the base64 string, and then we reverse the key. We can then loop through the text and key like for the encoding process:

```Python
x = x - 1 >> i % 12
```

Example:

The character `A` was encoded as `0b01000010000010000000`. The key was `YO`, but we reversed it, so we will be using `OY`.

```Python
? = 0b01000010000010000000
  = 0b01000010000001111111  # minus 1
  = 0b0100001000000 # O is 79, 79 % 12 = 7, so we remove the 7 least significant bits
  # next character in key: Y
  = 0b0100000111111 # minus 1
  = 0b01000001 # Y is 89, 89 % 12 = 5, so we remove the 5 least significant bits
```

`0b01000001` is `A` in ASCII, so we have successfully decoded the first letter. We carry on like this, making sure that we remember to reverse the key every time.

## Pros & Cons

### Pros
* Reversing the key makes cryptanalysis hard.
* Key can be as long as you want, and include special characters, making brute force harder.

### Cons
* Different languages have different outputs depending on the base64 support.

## Implementations

|  Language  |           Encrypt           |           Decrypt           |
|------------|-----------------------------|-----------------------------|
| Javascript | [encrypt.js](js/encrypt.js) | [decrypt.js](js/decrypt.js) |
|   Python   | [encrypt.py](py/encrypt.py) | [decrypt.py](py/decrypt.py) |
|   Swift    | [lib.swift](swift/lib.swift)| [lib.swift](swift/lib.swift)|

## Running the tests

Tests are automatically handled by [Travis CI](https://travis-ci.org).

## Contributing

Please read [CONTRIBUTING.md](https://github.com/CrypTools/cryptools.github.io/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/CrypTools/BitShiftCipher/tags).

## Authors

* **Arthur Guiot** - *Initial work* - [@arguiot](https://github.com/arguiot)

See also the list of [contributors](https://github.com/CrypTools/BitShiftCipher/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
