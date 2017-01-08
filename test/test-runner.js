var qunit = require('qunit');

qunit.run({
  code: {
    path: './src/emoji-translator.js',
    namespace: 'Translator'
  },
  tests: [ './test/tests.js' ]
});
