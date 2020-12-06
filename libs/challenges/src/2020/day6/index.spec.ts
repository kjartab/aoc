var assert = require('assert');
 
import { alphabet, fileHasDoubleEmpty, getUniqueYesGroupCount, groupCountYes }  from './index';

const relativePath = 'libs/challenges/src/2020/day6/input/'

describe('groupCountAnyYes', () =>{  

  it('returns 6 for test.txt data', async () => { 

    let lines = ['abcx', 'abcy', 'abcz'];
    const uniqueAnswers = groupCountYes(lines, alphabet());
    assert.strictEqual(uniqueAnswers, 6);
  }); 
  
  it('returns 6 for test.txt', async () => { 
 
    const uniqueAnswers = await getUniqueYesGroupCount(`${relativePath}/test.txt`, 'Anyone'); 
    assert.strictEqual(uniqueAnswers, 6);
  }); 
  
  it('returns 6 for test.txt everyone', async () => { 
 
    const uniqueAnswers = await getUniqueYesGroupCount(`${relativePath}/test.txt`, 'Everyone'); 
    assert.strictEqual(uniqueAnswers, 3);
  }); 
  
  it('returns 6 for test2.txt everyone', async () => { 
 
    const uniqueAnswers = await getUniqueYesGroupCount(`${relativePath}/test2.txt`, 'Everyone'); 
    assert.strictEqual(uniqueAnswers, 6);
  }); 
  
  it('returns 11 for test2.txt', async () => { 
 
    const uniqueAnswers = await getUniqueYesGroupCount(`${relativePath}/test2.txt`, 'Anyone'); 
    assert.strictEqual(uniqueAnswers, 11);
  }); 
  

}); 

describe('alphabet', () =>{ 

  it('should return a-z, 26 letters', async () => { 
    var letters = alphabet()
    assert.strictEqual(letters.length, 26);
    assert.strictEqual(letters[0], 'a');
    assert.strictEqual(letters[25], 'z');
  });

}); 

describe('EnsureCorrectPart2', () =>{ 
  it('assert input is ok', async () => { 
    const anyDouble = await fileHasDoubleEmpty(`${relativePath}/challenge.txt`)
    assert.strictEqual(anyDouble, false);
  });
  
  it('is correct part 1', async () => { 
    const uniqueAnswers = await getUniqueYesGroupCount(`${relativePath}/challenge.txt`, 'Anyone'); 
    assert.strictEqual(uniqueAnswers, 6506);
  }); 

  it('is correct part 2', async () => { 
    const uniqueAnswers = await getUniqueYesGroupCount(`${relativePath}/challenge.txt`, 'Everyone'); 
    assert.strictEqual(uniqueAnswers, 3243);
  }); 

}); 

