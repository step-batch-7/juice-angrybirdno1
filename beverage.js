console.log("Anna Juice Ltd");

const beverage = require("./src/lib.js").beverage;
const loadTransaction = require("./src/utility.js").loadTransaction;
const getDataStorePath = require("./src/configeration.js").getDataStorePath;
const timeStamp = require("./src/configeration.js").timeStamp;
const main = function() {
  const commandArg = process.argv.slice(2);
  const now = timeStamp(process.env);

  const path = getDataStorePath(process.env);
  let previousDetails = loadTransaction(path);
  console.log(beverage(commandArg, previousDetails, now, path).join("\n"));
};

main();
