const services = ["hire", "purchase", "timed-service"];
const costTypes = ["fixed", "percentage", "hourly", "daily"]
const balanceTypes = ["withdraw", "credit"];
const balanceStatus = ["pending-unverified", "pending-verified", "complete"]
const feeTypes = ["fixed", "percentage"];
const messageTypes = ["tag", "note"];
const dayTypes = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"];
const repeatTypes = ["weekly", "monthly"];
const gemetryTypes = ["Polygon"];

const productOptionIdTypes = [
    "product",
    "location", 
    "product_variation",
    "product_additional"
]

module.exports = {
    services,
    costTypes,
    productOptionIdTypes,
    balanceTypes,
    balanceStatus,
    feeTypes,
    messageTypes,
    dayTypes,
    repeatTypes,
    gemetryTypes
};
