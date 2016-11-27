// Object holding all our emoji data. Populated on DOMContentLoaded.
var emoji_data;

// Main translation function.
// "input" is the plain text to translate
// Overview of algorithm:
// 1. Split input text into words.
// 2. For each word, normalize it by lowercasing it, then check if we have a
//    that word in our dataset.
//    2.1. If we have a matching word in our dataset, pick a random codepoint
//    and append the corresponding string to our output.
//    2.2. If we don't have a matching word, append the original word to our
//    dataset.
// Future improvements:
//   * handle punctuation correctly (i.e. remove it from word before matching)
//   * add synonyms
function translate(input) {
  var tokens = input.split(/\s+/);
  var output = [];
  for (var i = 0; i < tokens.length; i++) {
    console.log("Checking token: " + tokens[i]);
    var token = tokens[i].toLowerCase();
    var codepoints = emoji_data[token];
    if (codepoints != undefined && codepoints.length > 0) {
      var randomPoints = codepoints[Math.floor(Math.random() * codepoints.length)];
      console.log("Points: " + randomPoints)
      output.push(String.fromCodePoint(...randomPoints))
    } else {
      // No matching emoji found. Append original.
      output.push(tokens[i]);
    }
    console.log("Output so far: " + output);
  }
  return output.join(" ");
}


function loadData() {
  console.log("Loading data");
  var loadStart = new Date().getTime()
  var oReq = new XMLHttpRequest();
  oReq.overrideMimeType("application/json");
  oReq.open("GET", "emoji_data.json", true);
  oReq.addEventListener("loadend", function() {
    emoji_data = JSON.parse(oReq.responseText);
    var loadTimeMs = new Date().getTime() - loadStart
    console.log("Loaded emoji_data in " + loadTimeMs + " ms");
  });
  oReq.send();
};

document.addEventListener('DOMContentLoaded', function() {
  // Populate data object from json file.
  loadData();
  // Add click listener to "translate" button.
  console.log("Adding button listener");
  var translateButton = document.getElementById("translate");
  translateButton.addEventListener("click", function() {
    console.log("Button clicked. Translating.");
    var input = document.getElementById("inputText").value
    console.log("Textarea input: " + input);
    var output = translate(input);
    console.log("Translated: " + output);
    var outputDiv = document.getElementById("output");
    outputDiv.innerHTML = output;
    outputDiv.style.display = "block";
  });
});
