const fs = require('fs');

const uploadTransaction = function(path,content){
  fs.writeFileSync(path,content,'utf8');
};

const loadTransaction = function(path){
  if(!fs.existsSync(path)){fs.writeFileSync(path,'{}','utf8')};
  return JSON.parse(fs.readFileSync(path,'utf8'));
};

exports.loadTransaction = loadTransaction;
exports.uploadTransaction = uploadTransaction;