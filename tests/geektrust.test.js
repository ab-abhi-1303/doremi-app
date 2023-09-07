const assert = require('assert').strict;
const fs = require("fs");
const main = require('../geektrust');

describe("integration test", function () {
    it("should be able to get correct output", function () {
        const expectedOutput =  'RENEWAL_REMINDER MUSIC 23-02-2022 \n' +
                                'RENEWAL_REMINDER VIDEO 25-04-2022 \n' +
                                'RENEWAL_REMINDER PODCAST 23-02-2022 \n' +
                                'RENEWAL_AMOUNT 700';
        const input = fs.readFileSync('sample_input/input1.txt').toString();
        main(input);
        const output = fs.readFileSync('sample_output/output.txt').toString();
        console.log(output)
    });
});

