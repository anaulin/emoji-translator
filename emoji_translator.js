// The class that performs the translation work.
var Translator = function(emojiData) {
  this.init(emojiData);
};

Translator.prototype = {
  // Holds a dictionary from words to codepoints.
  emojiData: {},
  // Regex used to iterate over words, treating punctuation correctly.
  tokenizationRe: /\b((?:\w|')+)\b/g,

  init: function(emojiData) {
    console.log("Initializing Translator with data.");
    this.emojiData = emojiData;
  },

  // Main translation function.
  // "input" is the plain text to translate
  // Rough overview of algorithm:
  // 1. Iterate over words from the input string.
  // 2. For each word, normalize it by lowercasing it, then check if we have a
  //    that word in our dataset.
  //    2.1. If we have a matching word in our dataset, pick a random codepoint
  //    and append the corresponding string to our output.
  //    2.2. If we don't have a matching word, append the original word to our
  //    dataset.
  // 3. While iterating, also add any non-word characters in between words.
  // Future improvements:
  //   * add synonyms
  //   * look into stemming (to correctly identify plurals, etc)
  translate: function(input) {
    var output = [];
    var lastIndex = 0;
    while (match = this.tokenizationRe.exec(input)) {
      var word = match[0];
      output.push(input.slice(lastIndex, match.index));
      lastIndex = match.index + word.length;
      var codepoints = this.emojiData[word.toLowerCase()];
      if (codepoints != undefined && codepoints.length > 0) {
        var randomPoints = codepoints[Math.floor(Math.random() * codepoints.length)];
        output.push(String.fromCodePoint(...randomPoints))
      } else {
        // No matching emoji found. Append original word.
        output.push(match[0]);
      }
    }
    // Add any trailing non-word characters to the output.
    if (lastIndex < input.length) {
      output.push(input.slice(lastIndex));
    }
    return output.join("");
  }
};
