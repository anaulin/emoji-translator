# Python script that converts a CSV sheet with emoji data into a JSON object
# representing an index from keywords to Emoji Unicode codepoints. Intended to be
# run on a CSV like the one at emoji-data-curated.csv.

import argparse
import csv
import json
import re


# Parses CSV in_file, building an object that represents and index from keyword
# to list of unicode codepoints that match it (since a word might have more than
# one matching emoji). Then dumps the object into a JSON file, to be consumed by
# the Emo extension.
def process_file(in_file, out_file):
  print 'Processing input file:', in_file
  data = {}
  with open(in_file, 'r') as f:
    reader = csv.reader(f)
    for row in reader:
      synonyms = row[4].split(',')
      codepoints = toCodepoints(row[2])
      for word in synonyms:
        word = word.strip()
        if word not in data:
          data[word] = []
        data[word].append(codepoints)

  with open(out_file, 'w') as f:
    json.dump(data, f)

  print 'Data written to', out_file

# Converts a string like '[127485, 127472]' into an array of integers.
CODEPOINT_RE = re.compile(r'(\d+)')
def toCodepoints(input_str):
  points = []
  for codepoint in re.findall(CODEPOINT_RE, input_str):
    points.append(int(codepoint))
  return points


if __name__ == '__main__':
  parser = argparse.ArgumentParser()
  parser.add_argument('--input_file', help='Input filename.',
      default='emoji-data-curated.csv')
  parser.add_argument('--output_file', help='Output filename.',
      default='emoji_data.json')
  args = parser.parse_args()
  process_file(args.input_file, args.output_file)
