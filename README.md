# emo
Helping you emote.

A Chrome extension that translates English into emoji. Very much a work in
progress.

Also contains a helper data file with a recent list of Unicode codepoints for
all emoji, their names and associated keywords.

## Repo structure
  * data: Contains a saved version of [Unicode's emoji list](http://unicode.org/emoji/charts-beta/full-emoji-list.html),
    a Python script to turn this HTML into a JSON object indexing from keywords
    to Unicode codepoints, and the output from running this script.
  * ext: Source code for a Chrome extension that lets you translate English code
    into text with emojis.

## Misc
Extension icon is "smiling cat face with heart-shaped eyes", as interpreted by [emojione.com](http://emojione.com).

## License

Distributed under MIT License. See
[LICENSE.md](https://github.com/anaulin/emo/blob/master/LICENSE.md)
in this repo for details.
