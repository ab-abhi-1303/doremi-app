const streamingPlans = {
    MUSIC: {
        FREE: {
            amount: 0,
            months: 1
        },
        PERSONAL: {
            amount: 100,
            months: 1
        },
        PREMIUM: {
            amount: 250,
            months: 3
        }
    },
    VIDEO: {
        FREE: {
            amount: 0,
            months: 1
        },
        PERSONAL: {
            amount: 200,
            months: 0
        },
        PREMIUM: {
            amount: 500,
            months: 3
        }
    },
    PODCAST: {
        FREE: {
            amount: 0,
            months: 1
        },
        PERSONAL: {
            amount: 100,
            months: 1
        },
        PREMIUM: {
            amount: 300,
            months: 3
        }
    }
}

const topUpPlans = {
    FOUR_DEVICE: {
        amount: 50,
        devices: 4
    },
    TEN_DEVICE: {
        amount: 100,
        devices: 10
    }
}

module.exports = {streamingPlans, topUpPlans};