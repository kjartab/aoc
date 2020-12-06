import assert from 'assert'; 
import { calculateAnswerPart1, calculateAnswerPart2, validPasswordPositionPolicyLine, parsePolicy, validPasswordForPolicy, validPasswordLine } from './index'

const relativePath = 'libs/challenges/src/2020/day2/input/'

 
describe('parsePolicy', () =>{ 
  it('returns policy for b with max 3 and min 1', async () => {
    const result = await parsePolicy("1-3 b"); 
    assert.strictEqual(result.max, 3) 
    assert.strictEqual(result.min, 1) 
    assert.strictEqual(result.letter, 'b') 
  });
});


describe('validPasswordPolicyTestLineOk', () =>{ 
  it('policy should not be met for password cdefg', async () => { 
    assert.strictEqual(validPasswordLine('1-3 b: bbefg'), true);
  });
});


describe('validPasswordPolicyTestLineFail', () =>{ 
  it('should fail for bbbbfg', async () => { 
    assert.strictEqual(validPasswordLine('1-3 b: bbbbfg'), false);
    assert.strictEqual(validPasswordLine('1-3 b: cdefg'), false);
  });
});

describe('EnsureCorrectPart1ExampleInput', () =>{ 
  it('returns 2 (passwords that are ok according to policy)', async () => {
    const result = await calculateAnswerPart1(`${relativePath}/test.txt`); 
    assert.strictEqual(result, 2) 
    
  });
});

describe('EnsureCorrectPart1', () =>{ 
  it('returns ..?', async () => {
    const result = await calculateAnswerPart1(`${relativePath}/challenge.txt`);  
    assert.strictEqual(result, 517) 
  });
});


describe('EnsureCorrectPart2ExampleInput', () =>{ 
  it('returns ..?', async () => {
    const result = await calculateAnswerPart2(`${relativePath}/test.txt`);  
    assert.strictEqual(result, 1) 
  });
});

describe('EnsureCorrectPart2', () =>{ 
  it('returns ..?', async () => {
    const result = await calculateAnswerPart2(`${relativePath}/challenge.txt`);  
    assert.strictEqual(result, 284) 
  });
});
