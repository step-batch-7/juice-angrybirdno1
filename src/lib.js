const save = require("./branches.js").save;
const query = require("./branches.js").query;
const isArgNotValid = require("./validation.js").isArgNotValid;
const uploadTransaction = require("./utility").uploadTransaction;
const saveMessage = require("./utility").saveMessage;
const invalidMessage = require("./utility").invalidMessage;
const availableJuices = require("./utility").availableJuices;
const getObjectList = require("./utility").getObjectList;

const beverage = function(timeStampedArg, transaction, path) {
  if (isArgNotValid(timeStampedArg)) {
    return invalidMessage();
  }
  const purchaseDetails = getObjectList(timeStampedArg.slice(1));
  if (timeStampedArg[0] == "--query") {
    return query(purchaseDetails, transaction).join("\n");
  }
  const availableBeverage = availableJuices();
  if (!availableBeverage.includes(purchaseDetails["--beverage"])) {
    return (
      "sorry... " + purchaseDetails["--beverage"] + " juice is not available"
    );
  }
  let content = save(purchaseDetails, transaction);
  uploadTransaction(path, JSON.stringify(content));
  return saveMessage(purchaseDetails);
};

exports.beverage = beverage;
