const concatMap = require("./utility.js").concatMap;

/////////////////////////////////////////////////

const getCount = function(element) {
  return +element[2];
};

const sum = function(a, b) {
  return a + b;
};

/////////////////////////////////////////////////

const giveDateMatched = function(date) {
  return function(element) {
    if (element[3].slice(0, 10) == date) {
      return element;
    }
  };
};

/////////////////////////////////////////////////

const getList = function(empId) {
  return function(order) {
    return [empId, order.beverage, order.qnty, order.date];
  };
};

/////////////////////////////////////////////////

const queryWithBoth = function(purchase, transactionRecords) {
  const keys = Object.keys(transactionRecords);
  const individualPurchase = transactionRecords[purchase["--empId"]].map(
    getList(purchase["--empId"])
  );
  return individualPurchase.filter(giveDateMatched(purchase["--date"]));
};

/////////////////////////////////////////////////

const queryWithDate = function(purchase, transactionRecords) {
  const keys = Object.keys(transactionRecords);
  const individualPurchase = [];
  for (let index = 0; index < keys.length; index++) {
    individualPurchase.push(
      transactionRecords[keys[index]].map(getList(keys[index]))
    );
  }
  return concatMap(individualPurchase).filter(
    giveDateMatched(purchase["--date"])
  );
};

/////////////////////////////////////////////////

const queryWithEmp = function(purchase, transactionRecords) {
  if (!Object.keys(transactionRecords).includes(purchase["--empId"])) {
    return "the employee does not existing";
  }
  const keys = Object.keys(transactionRecords);
  const individualPurchase = transactionRecords[purchase["--empId"]].map(
    getList(purchase["--empId"])
  );
  return individualPurchase;
};

/////////////////////////////////////////////////

const query = function(purchase, transactionRecords) {
  const keys = Object.keys(purchase).slice(0, -1);
  const funcReferences = {
    "--empId": queryWithEmp,
    "--date": queryWithDate,
    "--empId--date": queryWithBoth,
    "--date--empId": queryWithBoth
  };
  const matchedList = funcReferences[keys.join("")](
    purchase,
    transactionRecords
  );
  const counts = matchedList.map(getCount);
  matchedList.push(["total juices ", counts.reduce(sum)]);
  return matchedList;
};

/////////////////////////////////////////////////

const save = function(purchaseDetails, content) {
  const transaction = {
    beverage: purchaseDetails["--beverage"],
    qnty: purchaseDetails["--qty"],
    date: purchaseDetails["date"]
  };
  const employeeId = purchaseDetails["--empId"];
  const keys = Object.keys(content);
  if (!keys.includes(employeeId)) {
    content[employeeId] = [];
  }
  content[employeeId].push(transaction);
  return content;
};

/////////////////////////////////////////////////

exports.save = save;
exports.queryWithEmp = queryWithEmp;
exports.queryWithDate = queryWithDate;
exports.queryWithBoth = queryWithBoth;
exports.query = query;
