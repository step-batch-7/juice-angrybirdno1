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

exports.save = save;
exports.query = query;