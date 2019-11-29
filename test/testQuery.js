const assert = require("assert");
const query = require("../src/branches.js").query;

describe("query", function() {
  it("should return all the transactions according to requested date", function() {
    const preDetails = [
      {
        "--beverage": "apple",
        "--empId": "111",
        "--qty": "1",
        date: "2019-11-28T10:00:08.568Z"
      },
      {
        "--beverage": "orange",
        "--empId": "111",
        "--qty": "1",
        date: "2019-10-28T10:00:08.568Z"
      }
    ];
    let purchase = {
      "--date": "2019-10-28"
    };
    let actualValue = query(purchase, preDetails);
    let expectedValue = [
      {
        "--beverage": "orange",
        "--empId": "111",
        "--qty": "1",
        date: "2019-10-28T10:00:08.568Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return all the transactions according to empId", function() {
    const preDetails = [
      {
        "--beverage": "apple",
        "--empId": "111",
        "--qty": "1",
        date: "2019-11-28T10:00:08.568Z"
      },
      {
        "--beverage": "orange",
        "--empId": "222",
        "--qty": "1",
        date: "2019-10-28T10:00:08.568Z"
      }
    ];
    let purchase = {
      "--empId": "222"
    };
    let actualValue = query(purchase, preDetails);
    let expectedValue = [
      {
        "--beverage": "orange",
        "--empId": "222",
        "--qty": "1",
        date: "2019-10-28T10:00:08.568Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return all the transactions according to requested beverage", function() {
    const preDetails = [
      {
        "--beverage": "apple",
        "--empId": "111",
        "--qty": "1",
        date: "2019-11-28T10:00:08.568Z"
      },
      {
        "--beverage": "orange",
        "--empId": "111",
        "--qty": "1",
        date: "2019-11-28T10:00:08.568Z"
      }
    ];
    let purchase = {
      "--beverage": "apple"
    };
    let actualValue = query(purchase, preDetails);
    let expectedValue = [
      {
        "--beverage": "apple",
        "--empId": "111",
        "--qty": "1",
        date: "2019-11-28T10:00:08.568Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return all the transactions according to requested beverage and id", function() {
    const preDetails = [
      {
        "--beverage": "apple",
        "--empId": "111",
        "--qty": "1",
        date: "2019-11-28T10:00:08.568Z"
      },
      {
        "--beverage": "apple",
        "--empId": "222",
        "--qty": "1",
        date: "2019-11-28T10:00:08.568Z"
      }
    ];
    let purchase = {
      "--empId": "111",
      "--beverage": "apple"
    };
    let actualValue = query(purchase, preDetails);
    let expectedValue = [
      {
        "--beverage": "apple",
        "--empId": "111",
        "--qty": "1",
        date: "2019-11-28T10:00:08.568Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return all the transactions according to requested date and id", function() {
    const preDetails = [
      {
        "--beverage": "apple",
        "--empId": "111",
        "--qty": "1",
        date: "2019-10-28T10:00:08.568Z"
      },
      {
        "--beverage": "apple",
        "--empId": "111",
        "--qty": "1",
        date: "2019-11-28T10:00:08.568Z"
      }
    ];
    let purchase = {
      "--empId": "111",
      "--date": "2019-10-28"
    };
    let actualValue = query(purchase, preDetails);
    let expectedValue = [
      {
        "--beverage": "apple",
        "--empId": "111",
        "--qty": "1",
        date: "2019-10-28T10:00:08.568Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return all the transactions according to requested date and beverage", function() {
    const preDetails = [
      {
        "--beverage": "apple",
        "--empId": "111",
        "--qty": "1",
        date: "2019-10-28T10:00:08.568Z"
      },
      {
        "--beverage": "orange",
        "--empId": "111",
        "--qty": "1",
        date: "2019-11-28T10:00:08.568Z"
      }
    ];
    let purchase = {
      "--empId": "111",
      "--date": "2019-10-28"
    };
    let actualValue = query(purchase, preDetails);
    let expectedValue = [
      {
        "--beverage": "apple",
        "--empId": "111",
        "--qty": "1",
        date: "2019-10-28T10:00:08.568Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return all the transactions according to requested date,id and beverage", function() {
    const preDetails = [
      {
        "--beverage": "apple",
        "--empId": "111",
        "--qty": "1",
        date: "2019-10-28T10:00:08.568Z"
      },
      {
        "--beverage": "orange",
        "--empId": "222",
        "--qty": "1",
        date: "2019-11-28T10:00:08.568Z"
      }
    ];
    let purchase = {
      "--empId": "111",
      "--date": "2019-10-28"
    };
    let actualValue = query(purchase, preDetails);
    let expectedValue = [
      {
        "--beverage": "apple",
        "--empId": "111",
        "--qty": "1",
        date: "2019-10-28T10:00:08.568Z"
      }
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
