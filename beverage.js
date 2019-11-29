console.log("Anna Juice Ltd");

const beverage = require("./src/lib.js").beverage;
const loadTransaction = require("./src/utility.js").loadTransaction;

const main = function() {
  const commandArg = process.argv.slice(2);
  const now = new Date().toJSON();
  let previousDetails = loadTransaction("./statitics.json");
  console.log(
    beverage(commandArg, previousDetails, now, "./statitics.json").join("\n")
  );
};

main();
