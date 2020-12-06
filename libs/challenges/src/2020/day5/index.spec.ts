var assert = require('assert');
 
import { getMaxSeatId, getMySeatId, getSeatId }  from './index';

const relativePath = 'libs/challenges/src/2020/day5/input/'

describe('TestSeatIds', () =>{ 
  it('returns 44', async () => { 
    const seatString = 'FBFBBFFRLR'
    const seatId = getSeatId(seatString, 128, 8);
    assert.strictEqual(seatId, 357);
  });

  it('returns 567', async () => { 
    const seatString = 'BFFFBBFRRR'
    const seatId = getSeatId(seatString, 128, 8);
    assert.strictEqual(seatId, 567);
  });
  
  it('returns 119', async () => { 
    const seatString  = 'FFFBBBFRRR'
    const seatId = getSeatId(seatString, 128, 8);
    assert.strictEqual(seatId, 119);
  }); 

  it('returns 1016', async () => { 
    const seatString  = 'BBBBBBBRRR'
    const seatId = getSeatId(seatString, 128, 8); 
    assert.strictEqual(seatId, 1023);
  }); 
  // 128 8 8 1032
  it('returns 0', async () => { 
    const seatString  = 'FFFFFFFLLL'
    const seatId = getSeatId(seatString, 128, 8);
    assert.strictEqual(seatId, 0);
  }); 


  it('returns 820', async () => { 
    const seatString = 'BBFFBBFRLL'
    const seatId = getSeatId(seatString, 128, 8);
    assert.strictEqual(seatId, 820);

  });

}); 

 
describe('EnsureCorrectPart1', () =>{ 
  it('returns 842', async () => {
    const result = await getMaxSeatId(`${relativePath}/challenge.txt`);  
    assert.strictEqual(result, 842) 
  });
}); 

describe('EnsureCorrectPart2', () =>{ 
  it('returns ..?', async () => {
    const result = await getMySeatId(`${relativePath}/challenge.txt`);  
    assert.strictEqual(result, 617) 
  });
}); 

