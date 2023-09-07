
const fs = require("fs");
const path = require('path');
var logStream = fs.createWriteStream(path.resolve(__dirname, '../sample_output/output.txt'), {flags: 'a'});

function handleDate(date, subscriptions) {
    const dateRegex = /^\d{2}-\d{2}-\d{4}$/;
    if (date.match(dateRegex) === null) {
        logStream.write('INVALID_DATE\n');
        subscriptions.date = "NULL";
        return;
    }
    const [day, month, year] = date.split("-"); //destructure
    const dateInISOFormat = `${year}-${month}-${day}`;
    const newDate = new Date(dateInISOFormat);
    const timestamp = newDate.getTime();
    if (typeof timestamp !== "number" || Number.isNaN(timestamp)) {
        logStream.write('INVALID_DATE\n');
        subscriptions.date = "NULL";
        return;
    }
    subscriptions.date = date;
}

module.exports = handleDate;