/////////////////////////////////////////////////

const getList = function(empId){
  return function(order){
    return [empId,order.beverage,order.qnty,order.date];
  }
};

const query = function(empId,transactionRecords){
  if(!Object.keys(transactionRecords).includes(empId)){
    return "the employee does not existing";
  }
  const individualPurchase =  transactionRecords[empId].map(getList(empId));
  individualPurchase.unshift(['Employee ID', 'Beverage', 'Quantity', 'date']);
  return individualPurchase.join('\n');
};

/////////////////////////////////////////////////

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

/////////////////////////////////////////////////

const slicing = function(array) {
  const returnArray = [];
  for (index = 1; index < array.length; index += 2) {
    returnArray.push([array[index], array[index + 1]]);
  }
  return returnArray;
};

/////////////////////////////////////////////////

const isArgumentIsAnInteger = function(argument) {
  return Number.isInteger(+argument) && +argument > 0;
};

const isPairValid = function(elementArray) {
  const options = ["--beverage","--date"];
  if((elementArray[0] == "--qty") || (elementArray[0] == '--empId')) {
    let quantity = elementArray[1];
    return isArgumentIsAnInteger(quantity);
  }
  return (options.includes(elementArray[0]));
};

/////////////////////////////////////////////////

const isArgNotValid = function(commandArg){
  if((!['--save','--query'].includes(commandArg[0])) || commandArg.length % 2 == 0){
    return true;
  }
  const pairedArg = slicing(commandArg);
  if((commandArg[0] == '--query') && (pairedArg.length != 2)){
    return true;
  }
  if((commandArg[0] == '--save') && (pairedArg.length != 4)){
    return true;
  }
  return !(pairedArg.every(isPairValid));
};

/////////////////////////////////////////////////

exports.save = save;
exports.query = query;
exports.isArgNotValid = isArgNotValid;
exports.isPairValid = isPairValid;