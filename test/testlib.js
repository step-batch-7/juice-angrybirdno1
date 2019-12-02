const assert = require("assert");
const beverage = require("../src/lib.js").beverage;

describe("beverage", function() {
  it("should return report of data record,if the option is a valid save option", function() {
    let actualDate = new Date();
    let expectedDate = new Date().toJSON();
    let arg = [
      "--save",
      "--beverage",
      "orange",
      "--empId",
      "111",
      "--qty",
      "2"
    ];
    let actualValue = beverage(arg, [], actualDate, "./statitics.json");
    let expectedValue = [
      ["Transaction Recorded:"],
      ["Employee ID,Beverage,Quantity,Date"],
      ["111", "orange", "2", expectedDate]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return an acknowledgement message if the arguments are invalid", function() {
    let actualDate = new Date().toJSON();
    let expectedDate = new Date().toJSON();
    let arg = [
      "--save",
      "--beverage",
      "tendercoconut",
      "--empId",
      "111",
      "--qty",
      "2g",
      "--date",
      actualDate
    ];
    let actualValue = beverage(arg, {}, "./statitics.json");
    let expectedValue = [
      ["the entered arguments are not valid, use the following format"],
      [
        "for ordering	--save --beverage <juice name> --empId <employee ID> --qty <number of juices>"
      ],
      ["for query	--query --empId <employee ID>"]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return all the records of the given id for query with empId", function() {
    let actualDate = new Date().toJSON();
    let expectedDate = new Date().toJSON();
    let Transaction = [
      {
        "--beverage": "orange",
        "--empId": "111",
        "--qty": "2",
        date: "2019-11-29T08:03:29.646Z"
      },
      {
        "--beverage": "orange",
        "--empId": "222",
        "--qty": "2",
        date: "2019-11-29T08:03:29.646Z"
      }
    ];
    let arg = ["--query", "--empId", "111"];
    let actualValue = beverage(arg, Transaction, "./statitics.json");
    let expectedValue = [
      ["Employee ID,Beverage,Quantity,Date"],
      ["111", "orange", "2", "2019-11-29T08:03:29.646Z"],
      ["Total: 2 Juices"]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return all the records of the given date for query with date", function() {
    let actualDate = new Date().toJSON();
    let expectedDate = new Date().toJSON();
    let Transaction = [
      {
        "--beverage": "orange",
        "--empId": "111",
        "--qty": "2",
        date: "2019-11-29T08:03:29.646Z"
      },
      {
        "--beverage": "orange",
        "--empId": "111",
        "--qty": "2",
        date: "2019-10-29T08:03:29.646Z"
      }
    ];
    let arg = ["--query", "--date", "2019-11-29"];
    let actualValue = beverage(arg, Transaction, "./statitics.json");
    let expectedValue = [
      ["Employee ID,Beverage,Quantity,Date"],
      ["111", "orange", "2", "2019-11-29T08:03:29.646Z"],
      ["Total: 2 Juices"]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return all the records of the given beverage for query with beverage", function() {
    let actualDate = new Date().toJSON();
    let expectedDate = new Date().toJSON();
    let Transaction = [
      {
        "--beverage": "apple",
        "--empId": "111",
        "--qty": "2",
        date: "2019-11-29T08:03:29.646Z"
      },
      {
        "--beverage": "orange",
        "--empId": "111",
        "--qty": "2",
        date: "2019-11-29T08:03:29.646Z"
      }
    ];
    let arg = ["--query", "--beverage", "orange"];
    let actualValue = beverage(arg, Transaction, "./statitics.json");
    let expectedValue = [
      ["Employee ID,Beverage,Quantity,Date"],
      ["111", "orange", "2", "2019-11-29T08:03:29.646Z"],
      ["Total: 2 Juices"]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return all the records of the given beverage and Id for query with beverage and Id", function() {
    let actualDate = new Date().toJSON();
    let expectedDate = new Date().toJSON();
    let Transaction = [
      {
        "--beverage": "apple",
        "--empId": "222",
        "--qty": "2",
        date: "2019-11-29T08:03:29.646Z"
      },
      {
        "--beverage": "orange",
        "--empId": "111",
        "--qty": "2",
        date: "2019-11-29T08:03:29.646Z"
      }
    ];
    let arg = ["--query", "--beverage", "orange", "--empId", "111"];
    let actualValue = beverage(arg, Transaction, "./statitics.json");
    let expectedValue = [
      ["Employee ID,Beverage,Quantity,Date"],
      ["111", "orange", "2", "2019-11-29T08:03:29.646Z"],
      ["Total: 2 Juices"]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return all the records of the given beverage and date for query with beverage and date", function() {
    let actualDate = new Date().toJSON();
    let expectedDate = new Date().toJSON();
    let Transaction = [
      {
        "--beverage": "apple",
        "--empId": "111",
        "--qty": "2",
        date: "2019-10-29T08:03:29.646Z"
      },
      {
        "--beverage": "orange",
        "--empId": "111",
        "--qty": "2",
        date: "2019-11-29T08:03:29.646Z"
      }
    ];
    let arg = ["--query", "--beverage", "orange", "--date", "2019-11-29"];
    let actualValue = beverage(arg, Transaction, "./statitics.json");
    let expectedValue = [
      ["Employee ID,Beverage,Quantity,Date"],
      ["111", "orange", "2", "2019-11-29T08:03:29.646Z"],
      ["Total: 2 Juices"]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return all the records of the given empId and date for query with empId and date", function() {
    let actualDate = new Date().toJSON();
    let expectedDate = new Date().toJSON();
    let Transaction = [
      {
        "--beverage": "orange",
        "--empId": "222",
        "--qty": "2",
        date: "2019-10-29T08:03:29.646Z"
      },
      {
        "--beverage": "orange",
        "--empId": "111",
        "--qty": "2",
        date: "2019-11-29T08:03:29.646Z"
      }
    ];
    let arg = ["--query", "--empId", "111", "--date", "2019-11-29"];
    let actualValue = beverage(arg, Transaction, "./statitics.json");
    let expectedValue = [
      ["Employee ID,Beverage,Quantity,Date"],
      ["111", "orange", "2", "2019-11-29T08:03:29.646Z"],
      ["Total: 2 Juices"]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return all the records of the given beverage,empId and date for query with beverage,empId and date", function() {
    let actualDate = new Date().toJSON();
    let expectedDate = new Date().toJSON();
    let Transaction = [
      {
        "--beverage": "apple",
        "--empId": "222",
        "--qty": "2",
        date: "2019-10-29T08:03:29.646Z"
      },
      {
        "--beverage": "orange",
        "--empId": "111",
        "--qty": "2",
        date: "2019-11-29T08:03:29.646Z"
      }
    ];
    let arg = ["--query", "--empId", "111", "--date", "2019-11-29"];
    let actualValue = beverage(arg, Transaction, "./statitics.json");
    let expectedValue = [
      ["Employee ID,Beverage,Quantity,Date"],
      ["111", "orange", "2", "2019-11-29T08:03:29.646Z"],
      ["Total: 2 Juices"]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
  it("should return an empty array if the entered combination doesn'exist ", function() {
    let actualDate = new Date().toJSON();
    let expectedDate = new Date().toJSON();
    let Transaction = [
      {
        "--beverage": "apple",
        "--empId": "222",
        "--qty": "2",
        date: "2019-10-29T08:03:29.646Z"
      }
    ];
    let arg = ["--query", "--empId", "111"];
    let actualValue = beverage(arg, Transaction, "./statitics.json");
    let expectedValue = [
      ["Employee ID,Beverage,Quantity,Date"],
      ["Total: 0 Juices"]
    ];
    assert.deepStrictEqual(actualValue, expectedValue);
  });
});
