const assert = require('assert');
const save = require('../src/lib.js').save; 

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

describe('test of save function',function(){
  it('if a person ordering for the first time, should add empId as a new key',function(){
    let preDetails = {};
    let actualDate = new Date().toJSON();
    let expectedDate = new Date().toJSON();
    let actualValue = save({ '--beverage': 'thannimathan','--empId':'111','--qty':'1','--date':actualDate},preDetails) 
    let expectedValue = {"111":[{"beverage":"thannimathan","qnty":"1","date":expectedDate}]};
    assert.deepStrictEqual(actualValue,expectedValue);
  })
  it('if same person order again a new object should push to the key of that id',function(){
    let preDetails = {"111":[{"beverage":"thannimathan","qnty":"1","date":'22-3-19'}]};
    let actualDate = new Date().toJSON();
    let expectedDate = new Date().toJSON();
    let actualValue = save({ '--beverage': 'watermelon','--empId':'111','--qty':'1','--date':actualDate},preDetails) 
    let expectedValue = {"111":[{"beverage":"thannimathan","qnty":"1","date":'22-3-19'},{"beverage":"watermelon","qnty":"1","date":expectedDate}]};
    assert.deepStrictEqual(actualValue,expectedValue);
  })
});