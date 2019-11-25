const fs = require('fs');
const uploadTransaction = require('./utility').uploadTransaction;
const loadTransaction = require('./utility').loadTransaction;
const save = require('./branches.js').save;
const query = require('./branches.js').query;
const isArgNotValid = require('./branches.js').isArgNotValid;

const beverage = function(commandArgu,transaction,path){
  if(isArgNotValid(commandArgu)){
    return 'the enterd arguments are not valid';
  }
  const timeStampedArg = commandArgu
  timeStampedArg.push('--date',new Date().toJSON()); 
  const purchaseDetails = {}
  for(let index = 1; index < timeStampedArg.length; index += 2){
    purchaseDetails[timeStampedArg[index]] = timeStampedArg[index+1];
  }
  if(timeStampedArg[0] == '--query'){
    return query(purchaseDetails['--empId'],transaction);
  }
  if(timeStampedArg[0] == '--save'){
    let content = save(purchaseDetails,transaction);
    uploadTransaction(path,JSON.stringify(content));
    return 'Transaction Recorded:\nEmployee ID,Beverage,Quantity,date'+'\n'+
    purchaseDetails['--empId']+','+purchaseDetails['--beverage']+','+purchaseDetails['--date'];
  }
};

exports.beverage = beverage;
