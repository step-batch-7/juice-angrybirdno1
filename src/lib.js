const fs = require('fs');
const uploadTransaction = require('./utility').uploadTransaction;
const loadTransaction = require('./utility').loadTransaction;
const save = require('./branches.js').save;
const query = require('./branches.js').query;

const beverage = function(commandArgu,transaction){
  const purchaseDetails = {}
  for(let index = 1; index < commandArgu.length; index += 2){
    purchaseDetails[commandArgu[index]] = commandArgu[index+1];
  }
  // let content = save(purchaseDetails,transaction);
  content = loadTransaction('./statitics.json','utf8');
  // uploadTransaction('./statitics.json',JSON.stringify(content));
  // console.log(content);
  console.log(query('11111',content));
};

exports.beverage = beverage;