# Python script that converts the Unicode Emoji HTML page into a CSV itemizing
# emoji Unicode codepoints, their names and keywords.
# Intended to be run on the page at:
# http://unicode.org/emoji/charts-beta/full-emoji-list.html

import argparse
import csv

from bs4 import BeautifulSoup

# Parses HTML in_file, building an object that represents and index from keyword
# to list of unicode codepoints that match it (since a word might have more than
# one matching emoji). Then dumps the object into a CSV file.
def process_file(in_file, out_file):
  print 'Processing input file:', in_file
  with open(in_file, 'r') as f:
    html = f.read()
  soup = BeautifulSoup(html, 'html.parser')
  data = []
  for row in soup.find_all('tr'):
    if not row.td:
      # The header row has no 'td' elements. Skip it.
      continue

    # Parse content in row. Turn it all into ASCII, because the CSV writer does
    # not by default handle unicode well. We might loose some weird characters,
    # but that is fine for our purposes.
    codes = toCodepoints(row.select(".code")[0].string)
    name = ""
    annotations = []
    for name_cell in row.select(".name"):
      if name_cell.select("a"):
        # Cell with annotation links.
        for annotation in name_cell.select("a"):
          annotations.append(normalize(annotation.string))
      else:
        # Plain name cell.
        name = normalize(name_cell.string)

    # Add content of row into our index
    data.append({
      'name': name,
      'annotations': ', '.join(annotations),
      'codepoints': codes
    })

  with open(out_file, 'w') as f:
    fieldnames = ['name', 'annotations', 'codepoints']
    writer = csv.DictWriter(f, fieldnames=fieldnames)
    writer.writeheader()
    for row in data:
      writer.writerow(row)

  print 'Data written to', out_file

# Converts a string like "U+1F1FF U+1F1FC" into an array of values.
def toCodepoints(input_str):
  points = []
  for point in input_str.split():
    parts = point.split('+')
    points.append(int(parts[1], 16))
  return points

# Normalizes the given string to lowercase and ASCII.
# ASCII conversion will drop and ignore non-ASCII characters.
def normalize(in_string):
  normalized = in_string.lower()
  return normalized.encode('ascii', 'ignore')


if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  parser.add_argument('--input_file', help='Input filename.',
      default='full-emoji-list.html')
  parser.add_argument('--output_file',
    help='Output filename. Will be overwritten.',
    default='emoji-data.csv')
  args = parser.parse_args()
  process_file(args.input_file, args.output_file)
