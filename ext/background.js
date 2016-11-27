// Main translation function.
// TODO(anaulin): Consider breaking this into its own file.
// "input" is the plain text to translate.
function translate(input) {
  var output = "dummy output";
  // TODO(anaulin): Implement.
  return output
}

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
