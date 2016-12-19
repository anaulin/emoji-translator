// Global variable holding an initialized translator object.
var translator;

// When this view loads, load the data and initialize translator object.
document.addEventListener('DOMContentLoaded', function() {
  console.log("Loading data");
  var loadStart = new Date().getTime()
  var oReq = new XMLHttpRequest();
  oReq.overrideMimeType("application/json");
  oReq.open("GET", "emoji_data.json", true /* async */);
  oReq.addEventListener("loadend", function() {
    var emojiData = JSON.parse(oReq.responseText);
    var loadTimeMs = new Date().getTime() - loadStart
    console.log("Loaded emoji_data in " + loadTimeMs + " ms");
    translator = new Translator(emojiData);
  });
  oReq.send();
});

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
