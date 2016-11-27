document.addEventListener('DOMContentLoaded', function() {
  console.log("Adding button listener");
  var translateButton = document.getElementById("translate");
  translateButton.addEventListener("click", function() {
    console.log("Button clicked. Translating.");
    var input = document.getElementById("inputText").value
    console.log("Textarea input: " + input);
    chrome.runtime.getBackgroundPage(function(page) {
      var output = page.translate(input);
      console.log("Translated: " + output);
      var outputDiv = document.getElementById("output");
      outputDiv.innerHTML = output;
      outputDiv.style.display = "block";
    });
  });
});
