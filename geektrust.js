const fs = require("fs");
const fileName = process.argv[2];

const handleDate = require('./services/dateHandler');
const handleSubscription = require('./services/subscriptionHandler');
const handleTopUp = require('./services/topUpHandler');

let subscriptions = {};
let totalAmount = 0;
let plans = [];
let topUps = [];

function printOutput() {
    if (plans.length === 0) {
        logStream.write('SUBSCRIPTIONS_NOT_FOUND\n');
        return;
    }
    for (let i = 0; i < plans.length; i++) {
        logStream.write('RENEWAL_REMINDER ' + plans[i].service + ' ' + plans[i].endDate + '\n');
    }
    logStream.write('RENEWAL_AMOUNT ' + totalAmount);
}

function main(data) {
    let inputLines = data.toString().split("\n");
    for (let i = 0; i < inputLines.length; i++) {
        if (inputLines) {
            let input = inputLines[i].split(" ");
            switch (input[0]) {
                case "START_SUBSCRIPTION":
                    handleDate(input[1].trim(), subscriptions);
                    break;
                case "ADD_SUBSCRIPTION":
                    const subscriptionAmount = handleSubscription(input[1], input[2], subscriptions, plans);
                    totalAmount += subscriptionAmount;
                    break;
                case "ADD_TOPUP":
                    const topUpAmount = handleTopUp(input[1], input[2], subscriptions, plans, topUps);
                    totalAmount += topUpAmount;
                    break;
                case "PRINT_RENEWAL_DETAILS":
                    printOutput();
                    break;
            }
        }
    }
}

let data = fs.readFileSync(fileName).toString();

//clean file
fs.writeFile('sample_output/output.txt', '', function () {});

var logStream = fs.createWriteStream('sample_output/output.txt', { flags: 'a' });

main(data);

//print final result on console
fs.readFile('sample_output/output.txt', 'utf8', (err, res) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log(res);
});

module.exports = main;