const chai = require("chai");
const expect = chai.expect;
const handleDate = require("../services/dateHandler");

describe("Date Handler", () => {
    it("should handle a valid date", () => {
        const subscriptions = {};
        const date = "05-02-2022";
        handleDate(date, subscriptions);
        expect(subscriptions.date).to.equal(date);
    });

    it("should handle an invalid date", () => {
        const subscriptions = {};
        let invalidDate = "2022-02-05"; 
        handleDate(invalidDate, subscriptions);
        expect(subscriptions.date).to.equal("NULL");
        invalidDate = "11-19-2022"; 
        handleDate(invalidDate, {});
        expect(subscriptions.date).to.equal("NULL");
    });

});
