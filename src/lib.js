const save = require("./branches.js").save;
const query = require("./branches.js").query;
const getCount = require("./branches.js").getCount;
const sum = require("./branches.js").sum;
const isArgNotValid = require("./validation.js").isArgNotValid;
const uploadTransaction = require("./utility").uploadTransaction;
const invalidMessage = require("./utility").invalidMessage;
const getObjectList = require("./utility").getObjectList;
const formatter = require("./utility").formatter;

const beverage = function(commandArg, transaction, now, path) {
  const argCopy = commandArg;
  if (isArgNotValid(argCopy)) {
    return invalidMessage();
  }
  let purchaseDetails = getObjectList(commandArg.slice(1));
  if (commandArg[0] == "--query") {
    const queriedDetails = query(purchaseDetails, transaction).map(formatter);
    const counts = queriedDetails.map(getCount);
    queriedDetails.unshift(["Employee ID,Beverage,Quantity,Date"]);
    const Total = counts.reduce(sum, 0);
    Total > 1
      ? queriedDetails.push(["Total: " + Total + " Juices"])
      : queriedDetails.push(["Total: " + Total + " Juice"]);
    return queriedDetails;
  }
  argCopy.push("date", now.toJSON());
  purchaseDetails = getObjectList(argCopy.slice(1));
  let content = save(purchaseDetails, transaction);
  const savedDetails = [purchaseDetails].map(formatter);
  uploadTransaction(path, JSON.stringify(content));
  savedDetails.unshift(
    ["Transaction Recorded:"],
    ["Employee ID,Beverage,Quantity,Date"]
  );
  return savedDetails;
};

exports.beverage = beverage;
