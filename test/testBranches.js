const assert = require("assert");
const save = require("../src/branches.js").save;
const query = require("../src/branches.js").query;
const queryWithEmp = require("../src/branches.js").queryWithEmp;
const queryWithDate = require("../src/branches.js").queryWithDate;
const queryWithBoth = require("../src/branches.js").queryWithBoth;

describe("test of save function", function() {
  it("if a person ordering for the first time, should add empId as a new key", function() {
    let preDetails = {};
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
    let expectedValue = {
      "111": [{ beverage: "thannimathan", qnty: "1", date: expectedDate }]
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("if same person order again a new object should push to the key of that id", function() {
    let preDetails = {
      "111": [{ beverage: "thannimathan", qnty: "1", date: "22-3-19" }]
    };
    let actualDate = new Date().toJSON();
    let expectedDate = new Date().toJSON();
    let actualValue = save(
      {
        "--beverage": "watermelon",
        "--empId": "111",
        "--qty": "1",
        date: actualDate
      },
      preDetails
    );
    let expectedValue = {
      "111": [
        { beverage: "thannimathan", qnty: "1", date: "22-3-19" },
        { beverage: "watermelon", qnty: "1", date: expectedDate }
      ]
    };
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("queryWithEmp ", function() {
  it("should return all the transaction of that perticular employee", function() {
    let preDetails = {
      "111": [{ beverage: "thannimathan", qnty: "1", date: "2019-12-19" }]
    };
    let purchase = { "--empId": "111", date: "2019-12-19" };
    let actualValue = queryWithEmp(purchase, preDetails);
    let expectedValue = [["111", "thannimathan", "1", "2019-12-19"]];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return as same as previous if there is more than one records", function() {
    let preDetails = {
      "111": [
        { beverage: "thannimathan", qnty: "1", date: "2019-12-19" },
        { beverage: "apple", qnty: "1", date: "2019-11-19" }
      ]
    };
    let purchase = { "--empId": "111", date: "2019-12-19" };
    let actualValue = queryWithEmp(purchase, preDetails);
    let expectedValue = [
      ["111", "thannimathan", "1", "2019-12-19"],
      ["111", "apple", "1", "2019-11-19"]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("queryWithDate", function() {
  it("should return all the transactions according to requested date", function() {
    let preDetails = {
      "111": [
        { beverage: "thannimathan", qnty: "1", date: "2019-12-19" },
        { beverage: "apple", qnty: "1", date: "2019-11-19" }
      ]
    };
    let purchase = {
      "--date": "2019-11-19",
      date: "2019-12-19"
    };
    let actualValue = queryWithDate(purchase, preDetails);
    let expectedValue = [["111", "apple", "1", "2019-11-19"]];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should work the previous case irrespective of employee id", function() {
    let preDetails = {
      "111": [
        { beverage: "thannimathan", qnty: "1", date: "2019-12-19" },
        { beverage: "apple", qnty: "1", date: "2019-11-19" }
      ],
      "222": [
        { beverage: "thannimathan", qnty: "1", date: "2019-11-19" },
        { beverage: "apple", qnty: "1", date: "2019-12-19" }
      ]
    };
    let purchase = {
      "--date": "2019-11-19",
      date: "2019-12-19"
    };
    let actualValue = queryWithDate(purchase, preDetails);
    let expectedValue = [
      ["111", "apple", "1", "2019-11-19"],
      ["222", "thannimathan", "1", "2019-11-19"]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should satisfy the previous condition if one person have more than one transactions", function() {
    let preDetails = {
      "111": [
        { beverage: "thannimathan", qnty: "1", date: "2019-12-19" },
        { beverage: "apple", qnty: "1", date: "2019-11-19" },
        { beverage: "orange", qnty: "2", date: "2019-11-19" }
      ],
      "222": [
        { beverage: "thannimathan", qnty: "1", date: "2019-11-19" },
        { beverage: "apple", qnty: "1", date: "2019-12-19" }
      ]
    };
    let purchase = {
      "--date": "2019-11-19",
      date: "2019-12-19"
    };
    let actualValue = queryWithDate(purchase, preDetails);
    let expectedValue = [
      ["111", "apple", "1", "2019-11-19"],
      ["111", "orange", "2", "2019-11-19"],
      ["222", "thannimathan", "1", "2019-11-19"]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("queryWithBoth", function() {
  it("should return all the transactions of the particular person made in that particular date", function() {
    let preDetails = {
      "111": [
        { beverage: "thannimathan", qnty: "1", date: "2019-12-19" },
        { beverage: "apple", qnty: "1", date: "2019-11-19" },
        { beverage: "orange", qnty: "2", date: "2019-11-19" }
      ],
      "222": [
        { beverage: "thannimathan", qnty: "1", date: "2019-11-19" },
        { beverage: "apple", qnty: "1", date: "2019-12-19" }
      ]
    };
    let purchase = {
      "--date": "2019-11-19",
      "--empId": "111",
      date: "2019-12-19"
    };
    let actualValue = queryWithBoth(purchase, preDetails);
    let expectedValue = [
      ["111", "apple", "1", "2019-11-19"],
      ["111", "orange", "2", "2019-11-19"]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should satisfy the previous condition irrespective of the arguments option", function() {
    let preDetails = {
      "111": [
        { beverage: "thannimathan", qnty: "1", date: "2019-12-19" },
        { beverage: "apple", qnty: "1", date: "2019-11-19" },
        { beverage: "orange", qnty: "2", date: "2019-11-19" }
      ],
      "222": [
        { beverage: "thannimathan", qnty: "1", date: "2019-11-19" },
        { beverage: "apple", qnty: "1", date: "2019-12-19" }
      ]
    };
    let purchase = {
      "--empId": "111",
      "--date": "2019-11-19",
      date: "2019-12-19"
    };
    let actualValue = queryWithBoth(purchase, preDetails);
    let expectedValue = [
      ["111", "apple", "1", "2019-11-19"],
      ["111", "orange", "2", "2019-11-19"]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});

describe("query", function() {
  it("should return all the transactions of the particular for --empid", function() {
    let preDetails = {
      "111": [
        { beverage: "thannimathan", qnty: "1", date: "2019-12-19" },
        { beverage: "apple", qnty: "1", date: "2019-11-19" },
        { beverage: "orange", qnty: "2", date: "2019-11-19" }
      ],
      "222": [
        { beverage: "thannimathan", qnty: "1", date: "2019-11-19" },
        { beverage: "apple", qnty: "1", date: "2019-12-19" }
      ]
    };
    let purchase = {
      "--empId": "111",
      date: "2019-12-19"
    };
    let actualValue = query(purchase, preDetails);
    let expectedValue = [
      ["111", "thannimathan", "1", "2019-12-19"],
      ["111", "apple", "1", "2019-11-19"],
      ["111", "orange", "2", "2019-11-19"],
      ["total juices ", 4]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return all the transactions of a particular date for --date", function() {
    let preDetails = {
      "111": [
        { beverage: "thannimathan", qnty: "1", date: "2019-12-19" },
        { beverage: "apple", qnty: "1", date: "2019-11-19" },
        { beverage: "orange", qnty: "2", date: "2019-11-19" }
      ],
      "222": [
        { beverage: "thannimathan", qnty: "1", date: "2019-11-19" },
        { beverage: "apple", qnty: "1", date: "2019-12-19" }
      ]
    };
    let purchase = {
      "--date": "2019-11-19",
      date: "2019-12-19"
    };
    let actualValue = query(purchase, preDetails);
    let expectedValue = [
      ["111", "apple", "1", "2019-11-19"],
      ["111", "orange", "2", "2019-11-19"],
      ["222", "thannimathan", "1", "2019-11-19"],
      ["total juices ", 4]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return all the transactions of a particular id made in a paraticular date", function() {
    let preDetails = {
      "111": [
        { beverage: "thannimathan", qnty: "1", date: "2019-12-19" },
        { beverage: "apple", qnty: "1", date: "2019-11-19" },
        { beverage: "orange", qnty: "2", date: "2019-11-19" }
      ],
      "222": [
        { beverage: "thannimathan", qnty: "1", date: "2019-11-19" },
        { beverage: "apple", qnty: "1", date: "2019-12-19" }
      ]
    };
    let purchase = {
      "--empId": "111",
      "--date": "2019-11-19",
      date: "2019-12-19"
    };
    let actualValue = query(purchase, preDetails);
    let expectedValue = [
      ["111", "apple", "1", "2019-11-19"],
      ["111", "orange", "2", "2019-11-19"],
      ["total juices ", 3]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("the previous condition should work irrespective of order of argument pair", function() {
    let preDetails = {
      "111": [
        { beverage: "thannimathan", qnty: "1", date: "2019-12-19" },
        { beverage: "apple", qnty: "1", date: "2019-11-19" },
        { beverage: "orange", qnty: "2", date: "2019-11-19" }
      ],
      "222": [
        { beverage: "thannimathan", qnty: "1", date: "2019-11-19" },
        { beverage: "apple", qnty: "1", date: "2019-12-19" }
      ]
    };
    let purchase = {
      "--date": "2019-11-19",
      "--empId": "111",
      date: "2019-12-19"
    };
    let actualValue = query(purchase, preDetails);
    let expectedValue = [
      ["111", "apple", "1", "2019-11-19"],
      ["111", "orange", "2", "2019-11-19"],
      ["total juices ", 3]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
