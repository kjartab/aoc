var assert = require('assert');
 
import { calculateAnswerPart1, calculateAnswerPart2, countCustomValidPassports, countPassports, countValidPassports }  from './index';

const relativePath = 'libs/challenges/src/2020/day4/input/'


describe('VerifyPassportsCount', () =>{ 
  it('Should read 4 passports', async () => {
    const result = await countPassports(`${relativePath}/test.txt`);  
    assert.strictEqual(result, 4) 
  });
}); 

describe('CountValidPassports', () =>{ 
  it('Should read 2 valid passports', async () => {
    const result = await countValidPassports(`${relativePath}/test.txt`);  
    assert.strictEqual(result, 2) 
  });
}); 

describe('EnsureCorrectPart1', () =>{ 
  it('returns ..?', async () => {
    const result = await countValidPassports(`${relativePath}/challenge.txt`);  
    assert.strictEqual(result, 213) 
  });
}); 

describe('EnsureCorrectPart2InvalidExamples', () =>{ 
  it('returns ..?', async () => {
    const result = await countCustomValidPassports(`${relativePath}/test2invalid.txt`);  
    assert.strictEqual(result, 0) 
  });
}); 

describe('EnsureCorrectPart2ValidExamples', () =>{ 
  it('returns ..?', async () => {
    const result = await countCustomValidPassports(`${relativePath}/test2valid.txt`);  
    assert.strictEqual(result, 4) 
  });
}); 

describe('EnsureCorrectPart2', () =>{ 
  it('returns ..?', async () => {
    const result = await countCustomValidPassports(`${relativePath}/challenge.txt`);  
    assert.strictEqual(result, 147) 
  });
}); 

