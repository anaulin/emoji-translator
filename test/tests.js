QUnit.test("Basic translation with no matches", function(assert) {
  var data = { ladybird: [[128030]], hats: [[128082], [127913]]};
  var translator = new Translator(data);
  var translation = translator.translate("Hi there!");
  assert.equal(translation, "Hi there!", "No matching words. Message shouldn't change." );
});

QUnit.test("Basic translation with matches", function(assert) {
  var data = { ladybird: [[128030]], hats: [[128082], [127913]]};
  var translator = new Translator(data);
  var translation = translator.translate("Hi ladybird with many hats");
  assert.ok(!translation.includes("ladybird"),
    "'ladybird' was translated");
  assert.ok(!translation.includes("hats"),
    "'hats' was translated");
  assert.ok(translation.includes(String.fromCodePoint(128030)), "'ladybird' emoji is present");
  assert.ok(translation.includes(String.fromCodePoint(128082))
    || translation.includes(String.fromCodePoint(127913)), "some 'hats' emoji is present");
});

QUnit.test("Matches are case-insensitive", function(assert) {
  var data = { ladybird: [[128030]], hats: [[128082], [127913]]};
  var translator = new Translator(data);
  var translation = translator.translate("Ladybird");
  assert.equal(translation, String.fromCodePoint(128030), "'Ladybird' matches emoji");
  translation = translator.translate("ladYBird");
  assert.equal(translation, String.fromCodePoint(128030), "'ladYBird' matches emoji");
});

QUnit.test("Preserves punctuation", function(assert) {
  var data = { ladybird: [[128030]], hats: [[128082], [127913]]};
  var translator = new Translator(data);
  var ladybird = String.fromCodePoint(128030);
  var translation = translator.translate("Ladybird, oh ladybird!");
  assert.equal(translation, ladybird + ", oh " + ladybird + "!", "Punctuation is preserverd");
});

