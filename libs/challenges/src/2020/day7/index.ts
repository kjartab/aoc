import { LineActionResult, readFileWithLineAction } from '../../lib/fileReader';

export interface BagCapacity { 
    [key: string]: { 
        count: number
    }
} 
 
export interface BagCollection {
    [key: string]: Bag
}

export interface Bag { 
    bagType: string
    bags: BagCapacity
}

export const splitLine = (line:string) => line.replace('.','').split(/, | contain /);

export const parseBagLine = (line:string) : Bag => { 
    let lines = splitLine(line)
    const topBagLine = lines[0];
    const containedBagLines = lines.splice(1,lines.length);
    return {
        bags : getbagCapacity(containedBagLines),
        bagType : topBagLine.split(' ').slice(0,2).join(' ')
    }
} 

export function collectCapacityForBag(bagType: string, bagCollection: BagCollection, bagCapacity: BagCapacity = {}, multiply = 1, root: boolean = true): BagCapacity {
     
    const targetBag = bagCollection[bagType];  
    if (!root) {
        if (bagCapacity[bagType]) {
            bagCapacity[bagType].count = bagCapacity[bagType].count + multiply
        }
        else {
            bagCapacity[bagType] = {
                count : multiply
            }
        }
    } 
     
    for (var containedBagKey in targetBag.bags) {  
        const containedMultiply = targetBag.bags[containedBagKey].count; 
        if (bagCollection[containedBagKey]) {
            bagCapacity = collectCapacityForBag(containedBagKey, bagCollection, bagCapacity, containedMultiply*multiply, false); 
        }
    } 
    return bagCapacity;

} 
 

export const getbagCapacity = (lines:string[]) : BagCapacity => { 
    const noOtherIndex = lines.indexOf('no other bags'); 
    if (noOtherIndex !== -1) {
       lines.splice(noOtherIndex, 1);
    } 
    return lines.reduce((bagCapacity, line) => {
        const parts = line.split(' ')
        const bagType = `${parts[1]} ${parts[2]}` 
        return {
            ...bagCapacity,
            [bagType]: {
                count: Number(parts[0]),
            } 
        };
    }, {});
};

export const getTotalBagCapacities = (bagCollection: BagCollection) : BagCollection => { 
    let bagCapacityCollection : BagCollection = {} 
    for (var bagKey in bagCollection) { 
        bagCapacityCollection[bagKey] = { bagType : bagKey, bags: collectCapacityForBag(bagKey, bagCollection, {}) }
    }
    return bagCapacityCollection;
} 

export const getNumberThatCanContainAtLeastOne = async (inputFile: string, bagType: string) : Promise<number> => {
    let sum = 0; 
    const bagCollection = await getTotalBagCapacitiesForFile(inputFile);
    for(var bagKey of Object.keys(bagCollection)) {
        const bag = bagCollection[bagKey]; 
        if (Object.keys(bag.bags).indexOf(bagType) !== -1) {
            sum++;
        } 
    }
    return sum
}

export const getNumberOfBagsForBagType = async (inputFile: string, bagType: string) : Promise<number> => {
    let sum = 0; 
    const bagCollection = await getTotalBagCapacitiesForFile(inputFile);
    
    for (var key in bagCollection[bagType].bags) {
        sum += bagCollection[bagType].bags[key].count
    } 
    return sum
}



export const getTotalBagCapacitiesForFile = async (inputFile: string) : Promise<BagCollection> =>  { 

    let bags : BagCollection = {} 
    
    const lineAction = (line: string) : LineActionResult => { 
        
        let bag = parseBagLine(line);
        bags[bag.bagType] = bag;  

        return 'Continue';
    } 

    await readFileWithLineAction(inputFile, lineAction);  
    const totalBagCapacity = getTotalBagCapacities(bags);
    
    return totalBagCapacity;
} 