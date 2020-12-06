import { readFileLength, readFileWithLineAction } from './fileReader';
import assert from 'assert';

describe('ensureLinesAreRead', () =>{ 
  it('reads a file with 6 lines, counting them.', async () => {
    let counter = 0;
    await readFileWithLineAction("libs/challenges/src/lib/test.txt", (line)  => { counter++; return 'Continue'} );   
    assert.strictEqual(counter, 6); 
  });
});


describe('ensureLinesAreRead', () =>{ 
  it('reads a file with 6 lines, counting them.', async () => { 
    const counter = await readFileLength("libs/challenges/src/lib/test.txt");   
    assert.strictEqual(counter, 6); 
  });
});
