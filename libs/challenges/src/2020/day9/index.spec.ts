import {strictEqual } from 'assert'; 

const relativePath = 'libs/challenges/src/2020/day9/input/'
import { taskA, taskB, findAnyTwo,findContiguous, getIndexPairs } from './index'

describe('getIndexPairs', () =>{  
  
  it('returns 1 combination for 2 numbers', () => {  
    const res = getIndexPairs([1,2]); 
    strictEqual(res.length, 1);
  });
    it('returns 3 combinations for 3 numbers', () => {  
      const res = getIndexPairs([1,2,3]); 
      strictEqual(res.length, 3);
    }); 
   
    it('returns 6 combinations for 4 numbers', () => {  
      const res = getIndexPairs([1,2,3,4]); 
      strictEqual(res.length, 6);
    });
}); 

describe('find', () =>{  
  
  it('returns 1 combination for 2 numbers', () => {  
    const res = findAnyTwo([35, 20, 15, 25, 47], 40, 0, true);  
    strictEqual(res.length, 1); 
  });  

  it('returns 1721308972 combination for 2 numbers', () => {  
    const arr = [2,2,2];  
    const res = findContiguous(arr, 6,3);    
    strictEqual(res[0].matches, true);
  });  
  
});  

describe('EnsureCorrect', () =>{ 
  
  it('is correct part 1 test ', async () => {   
    const res = await taskA(`${relativePath}/test.txt`, 5);
    strictEqual(res[0], 127)
  }); 

  it('is correct part 1 ', async () => {     
    const res = await taskA(`${relativePath}/challenge.txt`, 25);
    strictEqual(res[0], 1721308972)
  }); 

  it('is correct part 2 test', async () => {   
    let res = await taskB(`${relativePath}/test.txt`, 5); 
    let nums = res[0].numbers.sort();
    nums.sort((a,b) => a-b);   
    let len = nums.length-1;
    strictEqual(nums[0] + nums[len], 62)  
  }); 

  it('is correct part 2', async () => {      
    let res = await taskB(`${relativePath}/challenge.txt`, 25); 
    let nums = res[0].numbers; 
    nums.sort((a,b) => a-b);   
    strictEqual(nums[0] + nums[nums.length-1], 209694133)  
  }); 
}); 
 