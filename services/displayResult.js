const fs = require("fs");
var logStream = fs.createWriteStream('sample_output/output.txt', { flags: 'a' });

function printOutput(plans, totalAmount) {
    if (plans.length === 0) {
        logStream.write('SUBSCRIPTIONS_NOT_FOUND');
        return;
    }
    for (let i = 0; i < plans.length; i++) {
        logStream.write('RENEWAL_REMINDER ' + plans[i].service + ' ' + plans[i].endDate + '\n');
    }
    logStream.write('RENEWAL_AMOUNT ' + totalAmount);
}

module.exports = printOutput;