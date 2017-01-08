# emoji_translator.js
[![Build
Status](https://travis-ci.org/anaulin/emoji-translate.svg?branch=travis)](https://travis-ci.org/anaulin/emoji-translate)

A JavaScript library that translates English into emoji.

Also contains a helper data file with a recent list of Unicode codepoints for
all emoji, their names and associated keywords.

## How to use the library

The library provides its functionality via a `Translator` class, which can be
instantiated by passing it the json emoji data object from
[emoji_data.json](https://github.com/anaulin/emo/blob/master/emoji_data.json).

Once you have an initialized `Translator`, you can use its `translate` method to
get an emojified version of your text.

```JavaScript
// Load emoji_translator.js, which defines Translator.
var emojiData = myFunctionToLoadData('emoji_data.json');
var translator = new Translator(emojiData);
translator.translate("I love emoji almost as much as cats. Oh joy!");
// Returns: "I 💖 emoji almost as much as 😸. Oh 😂!"
```

The library can be seen in use at http://anaulin.org/emoji-translator/

## How it works

The current translation implementation looks up words from the input text in a
table of words to emoji unicode codepoints.

If an input word matches more than one emoji in the list, a random matching
emoji is returned. So, for example, "cat" might return different cat emojis on
each call.

The table of emoji names and synonyms is created semi-automatically by parsing
the Unicode website, and adding synonyms and associated concepts by hand. The
utilities used to do this work can be found in the `data-utils` directory of this
repository.

## Developing

Install the dev dependencies using `npm`:
```bash
npm install
```

To run the tests:
```bash
npm test
```

## Future work
Ideas for future improvements can be found on the
[issues tab](https://github.com/anaulin/emo/issues) of this repository.

Feel free to file bugs or feature requests there.

Or better still, send a pull request. 😻

## License

Distributed under MIT License. See
[LICENSE](https://github.com/anaulin/emo/blob/master/LICENSE.md)
for details.
