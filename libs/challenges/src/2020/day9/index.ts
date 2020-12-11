import { LineActionResult, readFileWithLineAction, readFile} from '../../lib/fileReader';

export type Challenge = {
    preamble: number,
    numberQueue: number[]
} 

export const getIndexPairs = (queue: number[]) => {
    
    const pairs = []
    for (let i = 0; i < queue.length - 1; i++)
    {
        for (let j = i + 1; j < queue.length; j++)
        { 
            pairs.push([ i, j]);
        }
    }
    return pairs;
}

export type Match = { 
    ival: number
    jval: number
    matches: boolean
}

export type MatchNumbers = {
    numbers: number[]
    matches: boolean
}

export const findContiguous = (queue: number[], num: number, take: number = 1) : MatchNumbers[]  => {

    const matchNumbers : MatchNumbers[] = [];
    for (var i=0; i<queue.length-1; i++) { 
        let q = queue.slice(i,i+take);
        let ma = q.reduce((p,c) => p+c, 0) === num;
        if (ma) {
            matchNumbers.push({ numbers: q, matches: ma})
        }
    } 
    return matchNumbers; 
}

export const findAnyTwo = (queue: number[], num: number, startPosition: number = 0, matchCondition: boolean = false) : Match[] => {  

    return getIndexPairs(queue)
        .map((ij) => {
        const i = ij[0];
        const j = ij[1]; 
        return {  
            ival: queue[i], 
            jval: queue[j], 
            matches: queue[i] + queue[j] === num 
        }})
        .filter(m => m.matches === matchCondition) 
} 

export const process = (queue: number[], incoming: number, preamble:number, startPosition: number) : boolean  => {
    if (queue.length < preamble) {
        queue.push(incoming);
        return true;
    } else {
        const matches = findAnyTwo(queue, incoming, startPosition, true); 
        queue.shift();
        queue.push(incoming);  
        if (matches.length > 0) {
            return true;
        }
        return false;
    } 
}

export const taskA = async (inputFile: string, preambleLength: number) : Promise<number[]> =>  { 
 
    const queue = [];    
    let ok: boolean = true;
    let counter = 0;
    const noMatches = [];
    const lineAction = (line: string) : LineActionResult => {   
        let currentNumber = Number(line);
        ok = process(queue, currentNumber, preambleLength, counter); 
        
        if (!ok) {  
            noMatches.push(currentNumber);
            return 'Resolve';
        } 
        counter++;
        return 'Continue';
    }

    await readFileWithLineAction(inputFile, lineAction);   
    
    return noMatches;
} 

export const taskB = async (inputFile: string, preambleLength: number) : Promise<MatchNumbers[]> =>  { 
 
    const queue = [];    
    let ok: boolean = true; 
    const all = [];
    let matchNumbers : MatchNumbers[] = [];
    const lines = await readFile(inputFile); 
    lines.forEach(line => {
        let currentNumber = Number(line);
        all.push(currentNumber);
        let ok = process(queue, currentNumber, preambleLength, 0); 
        if (!ok) {
            let i=2; 
            while ( i<queue.length) {
                let m = findContiguous(all, currentNumber, i);
                if (m.length > 0) {
                    matchNumbers= m;
                }
                i++; 
            }  
        } 
        }); 
    return matchNumbers;
} 