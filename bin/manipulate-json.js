// Include dependencies
const fs = require('fs');

// Get data
const json = fs.readFileSync('./assets/_data.json', 'utf8');
let data = JSON.parse(json);

/** Wrap all data in a manner that mustache templates expect */
function wrap(data) {
  const newData = { entries: data };

  return newData;
}

/** Format certain data to render values in a manner suitable to render */
function format(data) {
  data['entries'].forEach( entry => {
    entry.date = formatDate(entry.date);
  });

  return data;
}

/** Format escaped date date to render values in a manner suitable to render */
function formatDate(date) {
  dateObj = new Date(date);
  // SEE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#Syntax
  options = {
    month: 'long',
    year: 'numeric'
  };

  return dateObj.toLocaleString('en-US', options);
}

// Manipulate data
data = wrap(data);
data = format(data);

module.exports = data;
