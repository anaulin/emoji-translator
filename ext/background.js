// onClickHandler for context menus.
function contextMenuOnClickHandler(info, tab) {
 var selection = info["selectionText"];
 if (selection) {
   // TODO(anaulin): Implement.
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
