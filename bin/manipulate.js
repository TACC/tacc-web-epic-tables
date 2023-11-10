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
    entry.date_stamp = getTimestamp(entry.date);
    // entry.should_link = Boolean(entry.link);
    entry.should_link = false;
  });

  return entries;
}

/** Format interpreted date in a manner suitable to render */
function formatDate(date) {
  dateObj = new Date(date);
  // SEE: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/DateTimeFormat/DateTimeFormat#Syntax
  options = {
    month: 'short',
    year: 'numeric'
  };

  return dateObj.toLocaleString('en-US', options);
}

/** Get date as a timestamp to be used in numeric operations */
function getTimestamp(date) {
  const timestamp = Date.parse(date);

  return timestamp;
}

/** Filter out entries for other pages (entries for given webapge are kept) */
function filterByPage(entries, webpage) {
  const newEntries = entries.filter(entry => {
    const shouldKeep = (entry['webpage'] === webpage);
    return shouldKeep;
  });

  return newEntries;
}

/** Sort data by date */
function sort(data) {
  data.sort(function (a, b) {
    return b.date_stamp - a.date_stamp;
  });

  return data;
}

/** Wrap all data in a manner that mustache templates expect */
function wrap(data) {
  const newData = { entries: data };

  return newData;
}

module.exports = {
  get, format, filterByPage, sort, wrap
};
