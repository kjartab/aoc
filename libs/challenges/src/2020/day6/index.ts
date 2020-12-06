import { group } from 'console';
import { LineActionResult, readFileWithLineAction } from '../../lib/fileReader';


export const az = "abcdefghijklmnopqrstuvwxyz"


export const groupCountEveryoneYes = (forms: string[], letters: string[]): number=> {
    const letterBuckets = getLetterObject(letters); 
    forms.forEach(form => {
        form.split('').forEach(letter => {
            letterBuckets[letter] ++;
        })
    })
    return Object.keys(letterBuckets)
    .reduce((prev, cur) => { return prev + (letterBuckets[cur] ? 1 : 0)}, 0);
} 

export type CountMode = 'Anyone' | 'Everyone'

export const groupCountYes = (forms: string[], letters: string[], mode:CountMode = 'Anyone'): number=> {
    
    const everyoneReducer = (prev: number, cur: string) => {  
        return  prev + (letterBuckets[cur] >= forms.length ? 1 : 0)};

    const anyoneReducer = (prev: number, cur: string) => { return prev + (letterBuckets[cur] ? 1 : 0)};

    const letterBuckets = getLetterObject(letters); 
    forms.forEach(form => {
        form.split('').forEach(letter => {
            letterBuckets[letter] ++;
        })
    })

    switch(mode) {
        case 'Everyone':
            return Object.keys(letterBuckets).reduce(everyoneReducer, 0);
        case 'Anyone':
            return Object.keys(letterBuckets).reduce(anyoneReducer, 0);
        default:
            throw Error("count mode not supported");
    } 
} 

export const getLetterObject = (array:string[]) => { 
    return array.reduce((obj, item) => {
      return {
        ...obj,
        [item]: 0,
      };
    }, {});
};

export const alphabet = () => [...Array(26).keys()].map(i => String.fromCharCode(i + 97));

export const getUniqueYesGroupCount = async (inputFile: string, mode: CountMode) : Promise<number> =>  {
    const letters = alphabet();
    let groupLines = []
    let sum = 0;
    const lineAction = (line: string) : LineActionResult => {  
        if (line.length == 0) { 
            sum = sum + groupCountYes(groupLines, letters, mode);
            groupLines = [] 
        } else  {
            groupLines.push(line) 
        }
        return 'Continue';
    }  
    await readFileWithLineAction(inputFile, lineAction); 
    
    sum = sum + groupCountYes(groupLines, letters, mode);
    return sum;
} 

export const fileHasDoubleEmpty = async (inputFile: string) : Promise<boolean> =>  { 
    let lineEmpty = false
    const lineAction = (line: string) : LineActionResult => { 
        if (line.length == 0) {
            if (lineEmpty) {
                return 'Resolve';
            }
            lineEmpty = true
        }
        else {
            lineEmpty = false;
        }
        return 'Continue' 
    } 
    
    await readFileWithLineAction(inputFile, lineAction); 
    
    return lineEmpty;
} 