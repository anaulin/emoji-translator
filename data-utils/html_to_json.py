# Python script that converts an HTML page into a JSON object that provides an
# index from keywords to Emoji Unicode codepoints. Intended to be run on the
# page at: http://unicode.org/emoji/charts-beta/full-emoji-list.html

import argparse
import json

from bs4 import BeautifulSoup


OUT_FILE='emoji_data.json'

# Parses HTML in_file, building an object that represents and index from keyword
# to list of unicode codepoints that match it (since a word might have more than
# one matching emoji). Then dumps the object into a JSON file, to be consumed by
# the Emo extension.
def process_file(in_file):
  print 'Processing input file:', in_file
  with open(in_file, 'r') as f:
    html = f.read()
  soup = BeautifulSoup(html, 'html.parser')
  data = {}
  for row in soup.find_all('tr'):
    if not row.td:
      # The header row has no 'td' elements. Skip it.
      continue

    # Parse content in row
    codes = toCodepoints(row.select(".code")[0].string)
    names = []
    for name_cell in row.select(".name"):
      if name_cell.select("a"):
        # Cell with annotation links.
        for annotation in name_cell.select("a"):
          names.append(annotation.string.lower())
      else:
        # Plain name cell.
        names.append(name_cell.string.lower())

    # Add content of row into our index
    for name in names:
      if name not in data:
        data[name] = []
      data[name].append(codes)
      print name, codes

  with open(OUT_FILE, 'w') as f:
    json.dump(data, f)
  print 'Data written to', OUT_FILE

# Converts a string like "U+1F1FF U+1F1FC" into an array of values.
def toCodepoints(input_str):
  points = []
  for point in input_str.split():
    parts = point.split('+')
    points.append(int(parts[1], 16))
  return points

if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  parser.add_argument('--input_file', help='Input filename.',
      default='full-emoji-list.html')
  args = parser.parse_args()
  process_file(args.input_file)
