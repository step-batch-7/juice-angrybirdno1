const assert = require('assert');
const beverage = require('../src/lib.js').beverage;

/*describe('check date',function(){
  it.only('time should match',function(){
    let date = getDate();
    let expectedDate = new Date().toJSON();
    assert.deepStrictEqual(date,expectedDate);
  })
});


const getDate = function() {
  return new Date().toJSON();
}*/

describe('test beverage function ',function(){
  it('should return report of data record,if the option is a valid save option',function(){
    let actualDate = new Date().toJSON();
    let expectedDate = new Date().toJSON();
    let arg = ['--save','--beverage','orange','--empId','111','--qty','2','--date',actualDate];
    let actualValue = beverage(arg,{},'./statitics.json');
    let expectedValue = 'Transaction Recorded:\nEmployee ID,Beverage,Quantity,date\n' +
    '111,orange,'+ expectedDate;
    assert.deepStrictEqual(actualValue,expectedValue);
  })
  it('should return a message if we entered an unavailable juice',function(){
    let actualDate = new Date().toJSON();
    let expectedDate = new Date().toJSON();
    let arg = ['--save','--beverage','tendercoconut','--empId','111','--qty','2','--date',actualDate];
    let actualValue = beverage(arg,{},'./statitics.json');
    let expectedValue = 'sorry... tendercoconut juice is not available'
    assert.deepStrictEqual(actualValue,expectedValue);
  })
  it('should return an acknowledgement message if the arguments are invalid',function(){
    let actualDate = new Date().toJSON();
    let expectedDate = new Date().toJSON();
    let arg = ['--save','--beverage','tendercoconut','--empId','111','--qty','2g','--date',actualDate];
    let actualValue = beverage(arg,{},'./statitics.json');
    let expectedValue = 'the entered arguments are not valid, use the following format\n\n'+
    'for ordering	--save --beverage <juice name> --empId <employee ID> --qty <number of juices>\n'+
    'for query	--query --empId <employee ID>'
    assert.deepStrictEqual(actualValue,expectedValue);
  })
  it('should return all the records of the particular id if the option is query',function(){
    let actualDate = new Date().toJSON();
    let expectedDate = new Date().toJSON();
    let Transaction = {"111":[{"beverage":"orange","qnty":"2","date":"2019-11-25T09:56:08.715Z"}]};
    let arg = ['--query','--empId','111','--date',actualDate];
    let actualValue = beverage(arg,Transaction,'./statitics.json');
    let expectedValue = 'Employee ID,Beverage,Quantity,date\n'+
                        '111,orange,2,2019-11-25T09:56:08.715Z'
    assert.deepStrictEqual(actualValue,expectedValue);
  })
  it('should return a message if we queried a non existing employee ID',function(){
    let actualDate = new Date().toJSON();
    let expectedDate = new Date().toJSON();
    let arg = ['--query','--empId','1141','--date',actualDate];
    let actualValue = beverage(arg,{},'./statitics.json');
    let expectedValue = 'the employee does not existing'
    assert.deepStrictEqual(actualValue,expectedValue);
  })
});