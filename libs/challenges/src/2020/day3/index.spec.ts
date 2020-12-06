var assert = require('assert');

import { calculateAnswerPart1, calculateAnswerPart2, parseLine }  from './index';

const relativePath = 'libs/challenges/src/2020/day3/input/'

describe('parseLine', () =>{ 
  it('ensure first andsecond false, third true', async () => {
    const result = await parseLine("..##.........##.........##.........##.........##.........##.......", 1);  
    assert.strictEqual(result[0], false);
    assert.strictEqual(result[1], false);    
    assert.strictEqual(result[2], true);
    
  });
});


describe('EnsureCorrectPart1ExampleInput', () =>{ 
  it('returns ..?', async () => {
    const result = await calculateAnswerPart1(`${relativePath}/test.txt`);  
    assert.strictEqual(result, 7) 
  });
});

describe('EnsureCorrectPart1', () =>{ 
  it('returns ..?', async () => {
    const result = await calculateAnswerPart1(`${relativePath}/challenge.txt`);  
    assert.strictEqual(result, 164) 
  });
}); 


describe('EnsureCorrectPart2ExampleInput', () =>{ 
  it('returns ..?', async () => {
    const result1 = await calculateAnswerPart2(`${relativePath}/test.txt`, 1, 1);  
    const result2 = await calculateAnswerPart2(`${relativePath}/test.txt`, 3, 1); 
    const result3 = await calculateAnswerPart2(`${relativePath}/test.txt`, 5, 1); 
    const result4 = await calculateAnswerPart2(`${relativePath}/test.txt`, 7, 1); 
    const result5 = await calculateAnswerPart2(`${relativePath}/test.txt`, 1, 2);   
    const result = result1 * result2 * result3 * result4 * result5; 
    assert.strictEqual(result, 336) 
  });
}); 

describe('EnsureCorrectPart2', () =>{ 
  it('returns ..?', async () => {
    const result1 = await calculateAnswerPart2(`${relativePath}/challenge.txt`, 1, 1);  
    const result2 = await calculateAnswerPart2(`${relativePath}/challenge.txt`, 3, 1); 
    const result3 = await calculateAnswerPart2(`${relativePath}/challenge.txt`, 5, 1); 
    const result4 = await calculateAnswerPart2(`${relativePath}/challenge.txt`, 7, 1); 
    const result5 = await calculateAnswerPart2(`${relativePath}/challenge.txt`, 1, 2);  
    const result = result1 * result2 * result3 * result4 * result5; 
    assert.strictEqual(result, 5007658656) 
  });
}); 
