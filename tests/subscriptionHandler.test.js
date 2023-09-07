const chai = require("chai");
const expect = chai.expect;
const handleSubscription = require("./subscriptionHandler");

describe("Subscription Handler", () => {
    let subscriptions = {};
    let plans = [];

    it("should handle valid subscription", () => {
        const result = handleSubscription("MUSIC", "PERSONAL", subscriptions, plans);
        expect(result).to.equal(100);
    });

    it("should handle duplicate subscription", () => {
        const result = handleSubscription("MUSIC", "PERSONAL", subscriptions, plans);
        expect(result).to.equal(0);
    });

    it('should handle invalid date in a subscription', () => {
        subscriptions.date = "NULL";
        const result = handleSubscription("MUSIC", "PERSONAL", subscriptions, plans);
        expect(result).to.equal(0);
    });
});
