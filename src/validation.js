const isPosInteger = function(num){
  return Number.isInteger(+num) && +num > 0;
};

/////////////////////////////////////////////////

function isValidDate(s) {
  var bits = s.split('/');
  if(bits[0] == 0){return false};
  var d = new Date(bits[0], bits[1] - 1, bits[2]);
  return d && (d.getMonth() + 1) == bits[1];
};

/////////////////////////////////////////////////

const slicing = function(array) {
  const returnArray = [];
  for (index = 0; index < array.length; index += 2) {
    returnArray.push([array[index], array[index + 1]]);
  }
  return returnArray;
};

/////////////////////////////////////////////////

const isQueryPairVaild = function(pair){
  if(pair[0] == '--date'){
    return isValidDate(pair[1]);
  }
  if(pair[0] == '--empId'){
    return isPosInteger(pair[1]);
  }
  return false;
}

/////////////////////////////////////////////////

const queryValidation = function(arg){
  const pairedArg = slicing(arg);
  if(pairedArg.length > 2){
    return false;
  }
  return pairedArg.every(isQueryPairVaild);
};

/////////////////////////////////////////////////

const isSavePairVaild = function(pair){
  if(pair[0] == '--beverage'){return true}
  if((pair[0] == '--empId') || (pair[0] == '--qty')){
    return isPosInteger(pair[1]);
  }
  return false;
}

/////////////////////////////////////////////////

const saveValidation = function(arg){
  const pairedArg = slicing(arg);
  if(pairedArg.length != 3){
    return false;
  }
  return pairedArg.every(isSavePairVaild);
};

/////////////////////////////////////////////////

const getUserOptions = function(argv,index){
  if(index % 2 ==1){
    return argv;
  }
  return 0;
};

/////////////////////////////////////////////////

const isIncludes = function(options){
  const existingOptions = [0,'--empId','--qty','--beverage','--date'];
  return existingOptions.includes(options);
};

/////////////////////////////////////////////////

const isArgNotValid = function(commandArg){
  if((!['--save','--query'].includes(commandArg[0])) || (commandArg.length % 2 == 0) || (commandArg.length == 2)){
    return true;
  }
  const options = (commandArg.slice(0,-2).map(getUserOptions));
  if(!(options.every(isIncludes))){return true};
  requiredOption = commandArg.slice(1,-2);
  if(commandArg[0] == '--query'){
    return !(queryValidation(commandArg.slice(1,-2)));
  }
  return !(saveValidation(commandArg.slice(1,-2)));
};

exports.isArgNotValid = isArgNotValid;