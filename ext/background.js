// Object holding all our emoji data. Populated on DOMContentLoaded.
var emoji_data;

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
function translate(input) {
  var tokens = input.split(/\s+/);
  var re = /\b((?:\w|')+)\b/g;
  var output = [];
  var lastIndex = 0;
  while (match = re.exec(input)) {
    var word = match[0];
    output.push(input.slice(lastIndex, match.index));
    lastIndex = match.index + word.length;
    var codepoints = emoji_data[word.toLowerCase()];
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

// Function to load Emoji data from file.
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

// onClickHandler for context menus.
function contextMenuOnClickHandler(info, tab) {
 var selection = info["selectionText"];
 if (selection) {
   // TODO(anaulin): Implement. (Put selection in textarea, then translate.)
   console.log("Translating selection: " + selection);
 } else {
   // TODO(anaulin): Implement.
   console.log("No selection. Show popup for text entry instead.");
 }
};

// Add onClick listener for contextMenus.
chrome.contextMenus.onClicked.addListener(contextMenuOnClickHandler);

// Set up context menu tree at install time.
chrome.runtime.onInstalled.addListener(function() {
  // Create one test item for each context type.
  var contexts = ["page","selection"];
  var title = "Emo - translate English to Emoji";
  for (var i = 0; i < contexts.length; i++) {
    var context = contexts[i];
    var id = chrome.contextMenus.create({"title": title, "contexts":[context],
                                         "id": "context" + context});
    console.log("Added contextMenu for context " + context + ", with item id: " + id);
  }
});

// When this view loads, load the data.
document.addEventListener('DOMContentLoaded', function() {
  // Populate data object from json file.
  loadData();
});
