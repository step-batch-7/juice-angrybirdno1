/////////////////////////////////////////////////

const getCount = function(element) {
  return +element[2];
};

const sum = function(a, b) {
  return a + b;
};

const makeStandardDate = function(date, element) {
  const ourDate = new Date(date);
  const transDate = new Date(element.date);
  const isMonthEqual = ourDate.getMonth() == transDate.getMonth();
  const isDateEqual = ourDate.getDate() == transDate.getDate();
  const isYearEqual = ourDate.getYear() == transDate.getYear();
  return isMonthEqual && isDateEqual && isYearEqual;
};

/////////////////////////////////////////////////

const extract = function(purchase, element) {
  const keys = Object.keys(purchase);
  let elementCopy = element;
  const systemDate = elementCopy.date;
  elementCopy.date = systemDate.slice(0, 10);
  let flag = true;
  for (let i = 0; i < keys.length; i++) {
    const prevFlag = flag;
    flag = flag && Object.values(elementCopy).includes(purchase[keys[i]]);
    if (keys[i] == "--date") {
      flag = prevFlag && makeStandardDate(purchase[keys[i]], element);
    }
  }
  elementCopy.date = systemDate;
  return flag;
};

/////////////////////////////////////////////////

const query = function(purchase, transactionRecords) {
  const matchedList = transactionRecords.filter(extract.bind(null, purchase));
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
