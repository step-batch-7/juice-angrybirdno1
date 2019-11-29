/////////////////////////////////////////////////

const getCount = function(element) {
  return +element[2];
};

const sum = function(a, b) {
  return a + b;
};

/////////////////////////////////////////////////

const extract = function(values, element) {
  let elementCopy = element;
  const systemDate = elementCopy.date;
  elementCopy.date = systemDate.slice(0, 10);
  let flag = true;
  for (let i = 0; i < values.length; i++) {
    flag = flag && Object.values(elementCopy).includes(values[i]);
  }
  elementCopy.date = systemDate;
  return flag;
};

/////////////////////////////////////////////////

const query = function(purchase, transactionRecords) {
  const values = Object.values(purchase);
  const matchedList = transactionRecords.filter(extract.bind(null, values));
  return matchedList;
};

/////////////////////////////////////////////////

const save = function(purchaseDetails, content) {
  const newContent = content;
  newContent.push(purchaseDetails);
  return newContent;
};

/////////////////////////////////////////////////

exports.getCount = getCount;
exports.sum = sum;
exports.save = save;
exports.query = query;
