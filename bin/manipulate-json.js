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
    entry.authors = formatAuthors(entry.authors);
  });

  // Some entries mus tnot be used
  data['entries'] = data['entries'].filter( entry => {
    return shouldKeepEntry(entry);
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

/** Split authors by comma, then return desired markup */
function formatAuthors(authors) {
  const authorsList = authors.split(',');
  const authorsString = authorsList.map( author => '<span>' + author + '</span>').join(', ');

  return authorsString;
}

/** Whether to retain an entry in the formatted data */
function shouldKeepEntry(entry) {
  const negativeValues = [
    "DON'T POST YET",
    'DONT POST YET'
  ];

  // WARNING: The column name may change
  // WARNING: The possibly conditions may icnrease
  shouldNotKeep = negativeValues.some( value => {
    return (entry.ticket_or_date === value);
  });

  return ! shouldNotKeep;
}

// Manipulate data
data = wrap(data);
data = format(data);

module.exports = data;
