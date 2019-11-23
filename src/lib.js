const fs = require('fs');
const uploadTransaction = require('./utility').uploadTransaction;

const save = function(purchaseDetails,content){
  const transaction = {
    beverage:purchaseDetails["--beverage"],
    qnty:purchaseDetails["--qty"],
    date:purchaseDetails["--date"]
  };
  const employeeId = purchaseDetails['--empId'];
  const keys = Object.keys(content);
  if(!keys.includes(employeeId)){
    content[employeeId] = [];
  }
  content[employeeId].push(transaction);
  return content;
};

const beverage = function(commandArgu,transaction){
  const purchaseDetails = {}
  for(let index = 1; index < commandArgu.length; index += 2){
    purchaseDetails[commandArgu[index]] = commandArgu[index+1];
  }
  content = save(purchaseDetails,transaction);
  uploadTransaction('./statitics.json',JSON.stringify(content));
};

exports.beverage = beverage;
exports.save = save;