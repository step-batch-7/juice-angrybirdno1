const fs = require('fs');
const uploadTransaction = require('./utility').uploadTransaction;
const loadTransaction = require('./utility').loadTransaction;
const save = require('./branches.js').save;
const query = require('./branches.js').query;
const isArgNotValid = require('./branches.js').isArgNotValid;

const beverage = function(commandArg,transaction,path){
  if(isArgNotValid(commandArg)){
    return 'the entered arguments are not valid, use the following format\n\n' + 
    "for ordering\t" + '--save --beverage <juice name> --empId <employee ID> --qty <number of juices>\n'+
    'for query\t' + '--query --empId <employee ID>' ;
  }
  const timeStampedArg = commandArg
  const purchaseDetails = {};
  for(let index = 1; index < timeStampedArg.length; index += 2){
    purchaseDetails[timeStampedArg[index]] = timeStampedArg[index+1];
  }
  if(timeStampedArg[0] == '--query'){
    return query(purchaseDetails['--empId'],transaction);
  }
  const availableBeverage = [
    "orange","grapes","mango",
    "watermelon","papaya","pomegranate",
    "muskmelon","butterfruit","apple",
    "lemon","pineapple","strawberry",
    "banana","carrot","tomato"
  ];
  if(!availableBeverage.includes(purchaseDetails['--beverage'])){
    return "sorry... " + purchaseDetails['--beverage'] + ' juice is not available';
  }
  if(timeStampedArg[0] == '--save'){
    let content = save(purchaseDetails,transaction);
    uploadTransaction(path,JSON.stringify(content));
    return 'Transaction Recorded:\nEmployee ID,Beverage,Quantity,date'+'\n'+
    purchaseDetails['--empId']+','+purchaseDetails['--beverage']+','+purchaseDetails['--date'];
  }
};

exports.beverage = beverage;
