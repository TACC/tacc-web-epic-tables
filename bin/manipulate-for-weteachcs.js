const manipulate = require('./manipulate.js');

let data = manipulate.get('./assets/_presentations.json');
    data = manipulate.format(data);
    data = manipulate.filterByPage(data, 'WeTeach_CS');
    data = manipulate.wrap(data);

data.should_link_to_more = true;

module.exports = data;
