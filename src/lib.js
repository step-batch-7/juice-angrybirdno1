const save = require("./branches.js").save;
const query = require("./branches.js").query;
const getCount = require("./branches.js").getCount;
const sum = require("./branches.js").sum;
const isArgNotValid = require("./validation.js").isArgNotValid;
const uploadTransaction = require("./utility").uploadTransaction;
const invalidMessage = require("./utility").invalidMessage;
const availableJuices = require("./utility").availableJuices;
const getObjectList = require("./utility").getObjectList;
const formatter = require("./utility").formatter;

const beverage = function(commandArg, transaction, now, path) {
  if (isArgNotValid(commandArg)) {
    return invalidMessage();
  }
  let purchaseDetails = getObjectList(commandArg.slice(1));
  if (commandArg[0] == "--query") {
    const queriedDetails = query(purchaseDetails, transaction).map(formatter);
    const counts = queriedDetails.map(getCount);
    queriedDetails.unshift(["Employee ID,Beverage,Quantity,Date"]);
    queriedDetails.push(["Total: " + counts.reduce(sum) + " Juices"]);
    return queriedDetails;
  }
  const timeStampedArg = commandArg;
  purchaseDetails = getObjectList(timeStampedArg.slice(1));
  let content = save(purchaseDetails, transaction);
  const savedDetails = [purchaseDetails].map(formatter);
  uploadTransaction(path, JSON.stringify(content));
  savedDetails.unshift(["Employee ID,Beverage,Quantity,Date"]);
  savedDetails.unshift(["transaction recorded :"]);

  return savedDetails;
};

exports.beverage = beverage;
