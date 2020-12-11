import { count } from 'console';
import { readFile} from '../../lib/fileReader';

export type DiffDistribution = {
    [key: number]: number
}

export const getArray = (input: string[]) : number[] => {
     
    const numbers = input.map(Number).slice();
    
    numbers.sort((a,b) => a-b);  
    numbers.unshift(0); 
    return numbers;
}

export const getDistributions = (input: string[]) : DiffDistribution => {
    
    const distribution : DiffDistribution = {}
    const numbers = getArray(input);
    
    for (var i=1; i<numbers.length; i++) {
        const diff = numbers[i] - numbers[i-1];  
        distribution[diff] = distribution[diff] ? distribution[diff] + 1 : 1;
    }  
    distribution[3] += 1;
    return distribution; 
}

export const getValidOptions = (list: number[], start:number) : number[] => { 
    return list.filter(n => n > start && n <= start + 3);
}

let t = {}
export const getDistributions2 = (input: string[]) : DiffDistribution => {
    
    const distribution : DiffDistribution = {}
    const numbers = getArray(input);   
    const max = numbers[numbers.length-1];
    const combinations = computeCombinations(numbers, t, max);  
    // console.log(JSON.stringify(combinations));
    console.log("counter", max, c);
    return distribution; 
} 

let c = 0;

export const computeCombinations = (numbers:number[], obj: any, max:number) : any => {
     
    let current = numbers[0]; 
    if (numbers.length == 0) { 
        return obj;
    }
    if (current === max) { 
        c++;
    }

    numbers = numbers.slice(1)  

    obj[current] = {}

    const options = getValidOptions(numbers, current);   
    options.forEach((opt, i) => {   
        computeCombinations(numbers.slice(i), obj[current], max); 
    });  
    return obj;
     
}

export const task1 = async (inputFile: string) : Promise<number> =>  { 
 
    let lines = await readFile(inputFile);
    
    const dist = getDistributions(lines);
    
    return dist[1] * dist[3];

} 

export const task2 = async (inputFile: string) : Promise<number> =>  { 
 
    let lines = await readFile(inputFile);
    c = 0;
    const dist = getDistributions2(lines);
    
    return c;

} 

