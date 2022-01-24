// Include dependencies
const fs = require('fs');

/** Get all data as JSON */
function get(path) {
  const json = fs.readFileSync(path, 'utf8');
  let data = JSON.parse(json);

  return data;
}

/** Format certain data to render values in a manner suitable to render */
function format(entries) {
  entries.forEach( entry => {
    entry.date = formatDate(entry.date);
    entry.authors = formatAuthors(entry.authors);
  });

  return entries;
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

/** Filter out entries for other pages (entries for given webapge are kept) */
function filterByPage(entries, webpage) {
  const newEntries = entries.filter(entry => {
    const shouldKeep = (entry['webpage'] === webpage);
    return shouldKeep;
  });

  return newEntries;
}

/** Wrap all data in a manner that mustache templates expect */
function wrap(data) {
  const newData = { entries: data };

  return newData;
}

module.exports = {
  get, format, filterByPage, wrap
};
