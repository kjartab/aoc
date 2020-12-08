import {strictEqual } from 'assert'; 

const relativePath = 'libs/challenges/src/2020/day7/input/'
import { BagCollection, collectCapacityForBag, getbagCapacity, getNumberOfBagsForBagType, getNumberThatCanContainAtLeastOne, parseBagLine, splitLine } from './index'
describe('groupCountAnyYes', () =>{  
  
    it('should return three parts', async () => {  
      const lines = splitLine('light red bags contain 1 bright white bag, 2 muted yellow bags.')
      strictEqual(lines[0], 'light red bags')
      strictEqual(lines[1], '1 bright white bag')
      strictEqual(lines[2], '2 muted yellow bags')
    });
  
    it('should return three parts', async () => {  
      const bag = parseBagLine('dotted black bags contain no other bags.');
      strictEqual(bag.bagType, 'dotted black');
    });
  
    it('should return ', () => {
      const capacity = getbagCapacity(['1 dark olive bag', '2 vibrant plum bags', 'no other bags']);
      strictEqual(capacity['dark olive'].count, 1);
      strictEqual(capacity['vibrant plum'].count, 2);
      strictEqual(Object.keys(capacity).length, 2);
    })
    
    it('should return collectCapacityForBag', () => {
      var bagCollection  : BagCollection = 
      { 
        "test" : { 
          bagType: "test", 
          bags : { 
            "test2" : { count: 1 },
            "test3" : { count: 2 },
            "test4" : { count: 3 }
          }
        },
        "test2": { 
          bagType: "test2", 
          bags : { 
            "test3" : { count: 1 }
          }
        },
        "test3": { 
          bagType: "test3", 
          bags : {  
          }
        },
        "test4": { 
          bagType: "test4", 
          bags : {  
          }
        }
      }

      const totalCapacity = collectCapacityForBag("test", bagCollection); 
      strictEqual(totalCapacity["test3"].count, 3);
      strictEqual(totalCapacity["test2"].count, 1);
      strictEqual(totalCapacity["test4"].count, 3);
    })

}); 



describe('EnsureCorrect', () =>{ 
  
  it('is correct part 1 test ', async () => {  
    const numberOfBags = await getNumberThatCanContainAtLeastOne(`${relativePath}/test.txt`, 'shiny gold');
    strictEqual(numberOfBags, 4);
  }); 

  it('is correct part 1 ', async () => {  
    const numberOfBags = await getNumberThatCanContainAtLeastOne(`${relativePath}/challenge.txt`, 'shiny gold');
    strictEqual(numberOfBags, 372);
  }); 

  it('is correct part 2 test', async () => {  
    const numberOfBags = await getNumberOfBagsForBagType(`${relativePath}/test2.txt`, 'shiny gold');
    strictEqual(numberOfBags, 126);
  }); 

  it('is correct part 2', async () => {  
    const numberOfBags = await getNumberOfBagsForBagType(`${relativePath}/challenge.txt`, 'shiny gold');
    strictEqual(numberOfBags, 8015);
  }); 
}); 

