var assert = require('assert');

import { calculateAnswerPart1, calculateAnswerPart2 }  from './index';

const relativePath = 'libs/challenges/src/2020/day1/input/'

describe('EnsureCorrectPart1ExampleInput', () =>{ 
    it('returns 514579', async () => {
    const result = await calculateAnswerPart1(`${relativePath}/test.txt`, 2020); 
    assert.strictEqual(result, 514579) 
  });
});

describe('EnsureCorrectPart1', () =>{ 
  it('returns 864864', async () => {
    const result = await calculateAnswerPart1(`${relativePath}/challenge.txt`, 2020); 
    assert.strictEqual(result, 864864) 
  });
});
 
describe('EnsureCorrectPart2ExampleInput', () =>{ 
  it('returns 241861950', async () => {
    const result = await calculateAnswerPart2(`${relativePath}/test.txt`, 2020);  
    assert.strictEqual(result, 241861950) 
  });
});

describe('EnsureCorrectPart2', () =>{ 
  it('returns 864864', async () => {
    const result = await calculateAnswerPart2(`${relativePath}/challenge.txt`, 2020); 
    assert.strictEqual(result, 281473080) 
  });
});
