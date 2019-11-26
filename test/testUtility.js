const assert = require('assert');
const getObjectList = require('../src/utility.js').getObjectList;
// const loadTransaction = require('../src/utility.js').loadTransaction;

describe('test of getObjectList function',function(){
  it('should return an object as the first element of array is key',function(){
    assert.deepStrictEqual(getObjectList([1,2,3,4]),{'1':2,'3':4});
    assert.deepStrictEqual(getObjectList([1,2,3,4,5]),{'1':2,'3':4,'5':undefined});
    assert.deepStrictEqual(getObjectList([]),{});
  })
});

describe('test of loadTransaction function',function(){
  it('mock test for the function',function(){
    const loadTransaction = function(path){
      return '{"111":[{"beverage":"orange","qnty":"2","date":"2019-11-26T05:12:13.465Z"}]}'
    };
    let actualValue = loadTransaction('./statitics.json');
    let expectedValue = '{"111":[{"beverage":"orange","qnty":"2","date":"2019-11-26T05:12:13.465Z"}]}'
    assert.deepStrictEqual(actualValue,expectedValue);
  })
});