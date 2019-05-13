'use strict';

const readline = require('readline');

function tokenize(line) {

  const tokens = [];
  const currentToken = [];

  tokens.push = function(str) {
    return Array.prototype.push.call(this, str.replace(/^\s*"(.*)"\s*$/, '$1').replace(/\0/g, "\"").trim());
  };

  line.replace(/""/g, '\0').split(/,/).forEach((t) => {

    if (currentToken.length > 0) {
      currentToken.push(t);
      if (/"\s*$/.test(t)) {
        tokens.push(currentToken.join(',').trim());
        currentToken.length = 0;
      }
      return;
    }

    if (/^\s*"/.test(t)) {
      currentToken.push(t);
      return;
    }

    tokens.push(t);
  });

  return tokens;
}

const readCSVasJson = (inputStream) => new Promise((resolve, reject) => {

  const rl = readline.createInterface({
    input: inputStream,
    crlfDelay: Infinity,
  });

  const results = [];

  let readLine;
  const parsers = [];
  const readSchema = (line) => {

    tokenize(line).map((k, i) => parsers.push((json, tokens) => json[k] = tokens[i]));

    readLine = (data) => {
      let res = {};
      tokenize(data).map((k, i, arr) => {
        (parsers[i] || (() => {}))(res, arr);
      });

      results.push(res);
    };
  };

  readLine = readSchema;

  rl.on('line', (line) => {

    if (line.trim() === '' || /^\s*#/.test(line)) {
      return;
    }
    readLine(line);
  });

  rl.on('close', () => resolve(results));
});

module.exports = {
  /**
   * Read CSV file as JSON, whose keys come from the first line of the CSV file
   */
  readCSVasJson,
};