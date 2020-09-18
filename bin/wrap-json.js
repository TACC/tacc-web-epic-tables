// Include dependencies
const fs = require('fs');

// Get data
const json = fs.readFileSync('./assets/_data.json', 'utf8');
const data = JSON.parse(json);

/** Wrap all data in a manner that mustache templates expect */
function wrap(data) {
  return { entries: data };
}

// Manipulate data
const newData = wrap(data);

module.exports = newData;
