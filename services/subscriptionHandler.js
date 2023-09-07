const { streamingPlans } = require("../models");
const moment = require("moment");
const fs = require("fs");
const path = require('path');

var logStream = fs.createWriteStream(path.resolve(__dirname, '../sample_output/output.txt'), {flags: 'a'});

function handleSubscription(service, plan, subscriptions, plans) {
    let totalAmount = 0;
    if (subscriptions.date === "NULL") {
        logStream.write('ADD_SUBSCRIPTION_FAILED INVALID_DATE\n');
        return 0;
    }
    const planDetails = streamingPlans[service];
    const month = planDetails[plan.trim()].months;

    const reminderDate = moment(subscriptions.date, "DD-MM-YYYY").add(month, "M").format("DD-MM-YYYY");
    const object = {
        service,
        plan,
        startDate: subscriptions.date,
        endDate: moment(reminderDate, "DD-MM-YYYY").subtract(10, 'days').format('DD-MM-YYYY')
    }

    const checkSubscription = plans.find(i => i.service.trim() == service.trim());
    if (checkSubscription) {
        logStream.write('ADD_SUBSCRIPTION_FAILED DUPLICATE_CATEGORY\n');
        return 0;
    }

    if (!checkSubscription) {
        plans.push(object);
        totalAmount = totalAmount + planDetails[plan.trim()].amount;
        return totalAmount;
    }
}

module.exports = handleSubscription;