const fs = require("fs");

const uploadTransaction = function(path, content) {
  fs.writeFileSync(path, content, "utf8");
};

const loadTransaction = function(path) {
  if (!fs.existsSync(path)) {
    fs.writeFileSync(path, "[]", "utf8");
  }
  return JSON.parse(fs.readFileSync(path, "utf8"));
};

const invalidMessage = function() {
  return [
    ["the entered arguments are not valid, use the following format"],
    [
      "for ordering\t" +
        "--save --beverage <juice name> --empId <employee ID> --qty <number of juices>"
    ],
    ["for query\t" + "--query --empId <employee ID>"]
  ];
};

const availableJuices = function() {
  return [
    "orange",
    "grapes",
    "mango",
    "watermelon",
    "papaya",
    "pomegranate",
    "muskmelon",
    "butterfruit",
    "apple",
    "lemon",
    "pineapple",
    "strawberry",
    "banana",
    "carrot",
    "tomato"
  ];
};

const getObjectList = function(timeStampedArg) {
  const purchaseDetails = {};
  for (let index = 0; index < timeStampedArg.length; index += 2) {
    purchaseDetails[timeStampedArg[index]] = timeStampedArg[index + 1];
  }
  return purchaseDetails;
};

const formatter = function(element) {
  return [
    element["--empId"],
    element["--beverage"],
    element["--qty"],
    element["date"]
  ];
};

exports.formatter = formatter;
exports.loadTransaction = loadTransaction;
exports.uploadTransaction = uploadTransaction;
exports.invalidMessage = invalidMessage;
exports.availableJuices = availableJuices;
exports.getObjectList = getObjectList;
