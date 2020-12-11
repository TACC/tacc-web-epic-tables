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

  // TODO: Combine these tasks to reduce looping through array twice
  // Some entries must not be used
  data['entries'] = data['entries'].filter( entry => {
    return shouldKeepEntry(entry);
  });
  // Some entries have values meant for humans, but not output
  data['entries'] = data['entries'].map( entry => {
    return clearHumanOnlyValues(entry);
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

/** Clear undesirable values of specific properties in a given entry */
function clearHumanOnlyValues(entry) {
  // WARNING: Columns (keys) to check may change
  const keysToCheck = [
    'link'
  ];
  // WARNING: The negavtive values may increase
  const negativeValues = [
    'N/A'
  ];

  Object.keys(entry).map(function(key) {
    const shouldCheck = keysToCheck.includes(key);

    if (shouldCheck) {
      const value = entry[key];

      const shouldClear = negativeValues.some( negativeValue => {
        return (value === negativeValue);
      });

      if (shouldClear) {
        entry[key] = '';
      }
    }
  });

  return entry;
}

/** Whether to retain an entry in the formatted data */
function shouldKeepEntry(entry) {
  // WARNING: The negavtive values may increase
  const negativeValues = [
    "DON'T POST YET",
    'DONT POST YET'
  ];

  // WARNING: The column name may change
  const shouldNotKeep = negativeValues.some( negativeValue => {
    const value = entry.ticket_or_date;

    return (value === negativeValue);
  });

  return ! shouldNotKeep;
}

// Manipulate data
data = wrap(data);
data = format(data);

module.exports = data;
