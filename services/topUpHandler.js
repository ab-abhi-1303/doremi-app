const { topUpPlans } = require("../models");
const fs = require("fs");
const path = require('path');

var logStream = fs.createWriteStream(path.resolve(__dirname, '../sample_output/output.txt'), {flags: 'a'});


function handleTopUp(device, months, subscriptions, plans, topUps) {
    if (subscriptions.date == 'NULL') {
        logStream.write('ADD_TOPUP_FAILED INVALID_DATE\n');
        return 0;
    }
    if (plans.length === 0) {
        logStream.write('ADD_TOPUP_FAILED SUBSCRIPTIONS_NOT_FOUND\n');
        return 0;
    }

    const checkSubscription = topUps.find(i => i == device + "_" + months);
    if (checkSubscription) {
        logStream.write('ADD_TOPUP_FAILED DUPLICATE_TOPUP\n');
        return 0;
    }
    else {
        const topUpDetial = topUpPlans[device];
        const topUpPrice = topUpDetial.amount * months;
        topUps.push(device + '_' + months);
        return topUpPrice;
    }
}

module.exports = handleTopUp;