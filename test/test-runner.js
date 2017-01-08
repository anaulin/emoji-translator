var qunit = require('qunit');

qunit.run({
  code: {
    path: './emoji_translator.js',
    namespace: 'emo'
  },
  tests: [ './test/tests.js' ]
});
