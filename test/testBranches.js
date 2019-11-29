const assert = require("assert");
const save = require("../src/branches.js").save;
const query = require("../src/branches.js").query;

describe("save", function() {
  it("every new order should be directly push to the previously existed array", function() {
    let preDetails = [];
    let actualDate = new Date().toJSON();
    let expectedDate = new Date().toJSON();
    let actualValue = save(
      {
        "--beverage": "thannimathan",
        "--empId": "111",
        "--qty": "1",
        date: actualDate
      },
      preDetails
    );
    let expectedValue = [
      {
        "--beverage": "thannimathan",
        "--empId": "111",
        "--qty": "1",
        date: expectedDate
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
