const assert = require('assert');
const isArgNotValid = require('../src/validation.js').isArgNotValid;

describe('test of isArgumentNotValid function',function(){
  it('should return false for valid arguments',function(){
    assert.deepStrictEqual(isArgNotValid(['--save','--beverage','orange','--empId','111','--qty','2','date','22-11-19']),false);
    assert.deepStrictEqual(isArgNotValid(['--query','--empId','111','date','22-11-19']),false);
    assert.deepStrictEqual(isArgNotValid(['--query','--empId','111','--date','2000/12/24','date','22-11-19']),false);
    assert.deepStrictEqual(isArgNotValid(['--query','--date','2000/12/24','--empId','111','date','22-11-19']),false);
  })
  it('should return true for invalid arguments',function(){
    assert.deepStrictEqual(isArgNotValid(['--save','--beverage','orange','--empId','111','--qty','2d','date','22-11-19']),true);
    assert.deepStrictEqual(isArgNotValid(['--save','--beverage','orange','--empId','11d1','--qty','2','date','22-11-19']),true);
    assert.deepStrictEqual(isArgNotValid(['--save','--beverage','orange','-empId','111','--qty','2','date','22-11-19']),true);
    assert.deepStrictEqual(isArgNotValid(['--query','--empId','111','erq','date','22-11-19']),true);
    assert.deepStrictEqual(isArgNotValid(['--query','--empId','111','--date','2000/13/3','date','22-11-19']),true);
    assert.deepStrictEqual(isArgNotValid(['--query','--empId','111','--date','0/1/3','date','22-11-19']),true);
    assert.deepStrictEqual(isArgNotValid(['--query','--empId','111','--date','2000/0/3','date','22-11-19']),true);
    assert.deepStrictEqual(isArgNotValid(['--query','--empId','111','--date','2000/1/0','date','22-11-19']),true);
    assert.deepStrictEqual(isArgNotValid(['--query','--empId','111','--date','2000/2/30','date','22-11-19']),true);
    assert.deepStrictEqual(isArgNotValid(['--query','--empId','111','--date','2001/2/29','date','22-11-19']),true);
    assert.deepStrictEqual(isArgNotValid(['--query','--empId','111','--date','2000/4/31','date','22-11-19']),true);
    assert.deepStrictEqual(isArgNotValid([]),true);
  })
});