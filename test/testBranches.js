const assert = require('assert');
const save = require('../src/branches.js').save;
const query = require('../src/branches.js').query;
const isArgNotValid = require('../src/branches.js').isArgNotValid;
const isPairValid = require('../src/branches.js').isPairValid;

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

describe('test of query function',function(){
  it('should return all the transactions of that empId if ti exisist',function(){
    let preDetails = {"11111":[{"beverage":"thannimathan","qnty":"1","date":'22-3-19'}]};
    let empId = '11111';
    let actualValue = query(empId,preDetails);
    let expectedValue = 'Employee ID,Beverage,Quantity,date\n11111,thannimathan,1,22-3-19'
    assert.deepStrictEqual(actualValue,expectedValue);
  })
  it('if the employee does\'nt exists,it should return a message',function(){
    let preDetails = {"11111":[{"beverage":"thannimathan","qnty":"1","date":'22-3-19'}]};
    let empId = '1111';
    let actualValue = query(empId,preDetails);
    let expectedValue = "the employee does not existing";
    assert.deepStrictEqual(actualValue,expectedValue);
  })
  it('if the preDetails are an empty object it should return a message',function(){
    let preDetails = {};
    let empId = '1111';
    let actualValue = query(empId,preDetails);
    let expectedValue = "the employee does not existing";
    assert.deepStrictEqual(actualValue,expectedValue);
  })
});

describe('test of isArgNotValid function',function(){
  it('should return false for valid arguments',function(){
    let arg = ['--save','--beverage','orange','--empId','111','--qty','1','--date','25-11-19'];
    assert.deepStrictEqual(isArgNotValid(arg),false);
    arg = ['--query','--empId','1','--date','25-11-19'];
    assert.deepStrictEqual(isArgNotValid(arg),false);
  })
  it('should return true for invalid arguments',function(){
    let arg = ['--save','--beverage','orange','--empId','111','--qty','1d','--date','25-11-19'];
    assert.deepStrictEqual(isArgNotValid(arg),true);
    arg = ['--save','--beverage','orange','--empId','111','--qty','1','asd','--date','25-11-19'];
    assert.deepStrictEqual(isArgNotValid(arg),true);
    arg = ['--save','--beverage','orange','--empId','111','--qty','--date','25-11-19'];
    assert.deepStrictEqual(isArgNotValid(arg),true);
    arg = ['-save','--beverage','orange','--empId','111','--qty','1','--date','25-11-19'];
    assert.deepStrictEqual(isArgNotValid(arg),true);
    arg = ['--query','--beverage','orange','--empId','111','--qty','1'];
    assert.deepStrictEqual(isArgNotValid(arg),true);
    arg = ['-query','--empId','111'];
    assert.deepStrictEqual(isArgNotValid(arg),true);
  })
});

describe('test of isPairVaild',function(){
  it('should return true for valid pairs',function(){
    assert.deepStrictEqual(isPairValid(['--beverage','orange']),true);
    assert.deepStrictEqual(isPairValid(['--empId','1111']),true);
    assert.deepStrictEqual(isPairValid(['--qty','234']),true);
    assert.deepStrictEqual(isPairValid(['--date','22-3-19']),true);
    assert.deepStrictEqual(isPairValid(['--beverage','veena']),true);
  })
  it('should return false for invalid pair',function(){
    assert.deepStrictEqual(isPairValid(['--empId','11d11']),false);
    assert.deepStrictEqual(isPairValid(['--qty','234s']),false);
    assert.deepStrictEqual(isPairValid(['orange','--bevage']),false);
    assert.deepStrictEqual(isPairValid(['22-3-19','--date']),false);
    assert.deepStrictEqual(isPairValid(['1111','--empId']),false);
    assert.deepStrictEqual(isPairValid(['234','--qty']),false);
  })
});