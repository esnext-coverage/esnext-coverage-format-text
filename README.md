# esnext-coverage-format-text

[![NPM version](http://img.shields.io/npm/v/esnext-coverage-format-text.svg)](https://www.npmjs.org/package/esnext-coverage-format-text)
[![Build Status](https://travis-ci.org/olegskl/esnext-coverage-format-text.svg?branch=master)](https://travis-ci.org/olegskl/esnext-coverage-format-text)

Code coverage reporter for [esnext-coverage](https://github.com/esnext-coverage/esnext-coverage).

Similar to other coverage formatters, esnext-coverage-format-text accepts a coverage results object and produces a report as an utf8-encoded string.

## Installation

```bash
npm install esnext-coverage-format-text --save-dev
```

## Usage

### Usage with test frameworks

Add esnext-coverage-format-text to the list of reporters in [esnext-coverage configuration object](https://github.com/esnext-coverage/karma-esnext-coverage-reporter#usage) or to your karma configuration file.

```js
reporters: [
  {
    formatter: 'text', // require esnext-coverage-format-text
    outFile: 'reports/text-report.txt', // write output to file
    console: true // output to console
  }
]
```

### Usage with esnext-coverage cli

```bash
esnext-coverage format coverage.json -f text -o report.txt
```

### Usage in Node

```js
import fs from 'fs';
import formatter from 'esnext-coverage-format-text';

fs.readFile('coverage.json', 'utf8', (err, data) => {
  const coverage = JSON.parse(data);
  const report = formatter(coverage);
  fs.writeFile('text-report.txt', report);
});
```

## License

[MIT License](http://opensource.org/licenses/MIT)
