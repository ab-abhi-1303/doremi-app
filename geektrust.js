const fs = require("fs");
const fileName = process.argv[2];

const handleDate = require('./services/dateHandler');
const handleSubscription = require('./services/subscriptionHandler');
const handleTopUp = require('./services/topUpHandler');
const printOutput = require("./services/displayResult");

let subscriptions = {};
let totalAmount = 0;
let plans = [];
let topUps = [];

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
                    printOutput(plans, totalAmount);
                    break;
            }
        }
    }
}

let data = fs.readFileSync(fileName).toString();

//clean file
fs.writeFile('sample_output/output.txt', '', function () {});

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