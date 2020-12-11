import {strictEqual } from 'assert'; 

const relativePath = 'libs/challenges/src/2020/day10/input/'
import { task1, getValidOptions, task2 } from './index'
 
describe('basics', () => {


  it('validOptions',  () => {    
    const res = getValidOptions([2,3,4,5,6], 1);
    strictEqual(res[0], 2);
    strictEqual(res[1], 3);
    strictEqual(res[2], 4);
    strictEqual(res.length, 3);
  }); 
  
})

describe('Tasks', () =>{ 
  
  it('is correct for task1 - test.txt', async () => {    
    const res = await task1(`${relativePath}/test.txt`);
    strictEqual(res, 220);
  }); 

  it('is correct for task1 - test2.txt', async () => {    
    const res = await task1(`${relativePath}/test2.txt`);
    strictEqual(res, 35);
  }); 
   
  it('is correct for task1 - challenge.txt', async () => {    
    const res = await task1(`${relativePath}/challenge.txt`);
    strictEqual(res, 2263);
  }); 


  it('is correct for task2 - test2.txt', async () => {    
    const res = await task2(`${relativePath}/test2.txt`);
    strictEqual(res, 8);
  }); 

  // it('is correct for task2 - test.txt', async () => {    
  //   const res = await task2(`${relativePath}/test.txt`);
  //   strictEqual(res, 19208);
  // }); 

  // it('is correct for task2 - challenge.txt', async () => {    
  //   const res = await task2(`${relativePath}/challenge.txt`);
  //   strictEqual(res, 8);
  // }); 

}); 
 