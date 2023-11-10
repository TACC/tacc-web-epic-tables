const manipulate = require('./manipulate.js');

let data = manipulate.get('./assets/_presentations.json');
    data = manipulate.format(data);
    data = manipulate.filterByPage(data, 'Research');
    data = manipulate.sort(data);
    data = manipulate.wrap(data);

module.exports = data;
