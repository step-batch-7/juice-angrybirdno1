const isPosInteger = function(num) {
  return Number.isInteger(+num) && +num > 0;
};
const returnTrue = function(argv) {
  return true;
};
/////////////////////////////////////////////////

function isValidDate(date) {
  var bits = date.split("-");
  if (bits[0] == 0) {
    return false;
  }
  var d = new Date(bits[0], bits[1] - 1, bits[2]);
  return d && d.getMonth() + 1 == bits[1];
}

/////////////////////////////////////////////////

const slicing = function(array) {
  const returnArray = [];
  for (index = 0; index < array.length; index += 2) {
    returnArray.push([array[index], array[index + 1]]);
  }
  return returnArray;
};

/////////////////////////////////////////////////

const isQueryPairVaild = function(pair) {
  if (!["--date", "--empId", "--beverage"].includes(pair[0])) {
    return false;
  }
  const funcReferences = {
    "--date": isValidDate,
    "--empId": isPosInteger,
    "--beverage": returnTrue
  };
  return funcReferences[pair[0]](pair[1]);
};

/////////////////////////////////////////////////

const queryValidation = function(arg) {
  const pairedArg = slicing(arg);
  if (pairedArg.length > 3) {
    return false;
  }
  return pairedArg.every(isQueryPairVaild);
};

/////////////////////////////////////////////////

const isSavePairVaild = function(pair) {
  if (!["--beverage", "--empId", "--qty"].includes(pair[0])) {
    return false;
  }
  const funcReferences = {
    "--beverage": returnTrue,
    "--empId": isPosInteger,
    "--qty": isPosInteger
  };
  return funcReferences[pair[0]](pair[1]);
};

/////////////////////////////////////////////////

const saveValidation = function(arg) {
  const pairedArg = slicing(arg);
  if (pairedArg.length != 3) {
    return false;
  }
  return pairedArg.every(isSavePairVaild);
};

/////////////////////////////////////////////////

const getUserOptions = function(argv, index) {
  if (index % 2 == 1) {
    return argv;
  }
  return 0;
};

/////////////////////////////////////////////////

const isIncludes = function(options) {
  const existingOptions = [0, "--empId", "--qty", "--beverage", "--date"];
  return existingOptions.includes(options);
};

/////////////////////////////////////////////////

const isArgNotValid = function(commandArg) {
  const property1 =
    ["--save", "--query"].includes(commandArg[0]) ||
    commandArg.length % 2 == 0 ||
    commandArg.length == 2;
  const options = commandArg.slice(0, -2).map(getUserOptions);
  const property2 = options.every(isIncludes);
  const pairedArg = slicing(commandArg.slice(1, -2));
  const property3 = commandArg[0] == "--save" && pairedArg.length != 3;
  const property4 = commandArg[0] == "--query" && pairedArg.length > 2;

  if (!(property1 || property2)) {
    return true;
  }
  requiredOption = commandArg.slice(1, -2);
  if (commandArg[0] == "--query") {
    return !queryValidation(commandArg.slice(1, -2));
  }
  return !saveValidation(commandArg.slice(1, -2));
};

exports.isArgNotValid = isArgNotValid;
