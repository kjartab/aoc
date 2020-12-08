import {strictEqual } from 'assert'; 

const relativePath = 'libs/challenges/src/2020/day8/input/'
import { getFirstSecondRunPreValue, getFixedResult, parseOperation  } from './index'
describe('unittests', () =>{  
  
    it('should return valid nop', async () => {  
      const operation= parseOperation('nop +0');
      strictEqual(operation.delta, 1);
      strictEqual(operation.argument, 0);
      strictEqual(operation.type, 'nop');
    });
    
    it('should return valid nop', async () => {  
      const operation= parseOperation('acc -99');
      strictEqual(operation.delta, 1);
      strictEqual(operation.argument, -99);
      strictEqual(operation.type, 'acc');
    });
    
    it('should return valid nop', async () => {  
      const operation= parseOperation('jmp -4');
      strictEqual(operation.delta, -4);
      strictEqual(operation.argument, -4);
      strictEqual(operation.type, 'jmp');
    });
   
}); 



describe('EnsureCorrect', () =>{ 
  
  it('is correct part 1 test ', async () => {   
    const valueBeforeSecondRun = await getFirstSecondRunPreValue(`${relativePath}/test.txt`)
    strictEqual(valueBeforeSecondRun, 5);
  }); 

  it('is correct part 1 ', async () => {   
    const valueBeforeSecondRun = await getFirstSecondRunPreValue(`${relativePath}/challenge.txt`)
    strictEqual(valueBeforeSecondRun, 1654);
  }); 

  it('is correct part 2 test', async () => {   
    const valueBeforeSecondRun = await getFixedResult(`${relativePath}/test.txt`)
    strictEqual(valueBeforeSecondRun, 8);
    
  }); 

  it('is correct part 2', async () => {   
    const valueBeforeSecondRun = await getFixedResult(`${relativePath}/challenge.txt`)
    strictEqual(valueBeforeSecondRun, 833);
  }); 
}); 

