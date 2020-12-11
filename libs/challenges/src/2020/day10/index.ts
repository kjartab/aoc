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

export const getDistributions2 = (input: string[]) : number => {
    
    const distribution : DiffDistribution = {}
    const numbers = getArray(input);   
    const max = numbers[numbers.length-1];
    let combinations = {} 
    computeCombinations(numbers, combinations, max);
    return combinations[0]; 
}  

export const computeCombinations = (numbers:number[], combinations: any, max:number) : any => {
    
    let current = numbers[0];  
    if (current === max || combinations[current]) {  
        combinations[current] = 1;  
        return combinations[current];

    }
    
    combinations[current] = 0;

    const options = getValidOptions(numbers, current);      
    options.forEach((opt, i) => {      
        if (combinations[opt]) {  
            combinations[current] += combinations[opt];   
        } else { 
            let startIndex = numbers.indexOf(opt);   
            combinations[current] = combinations[current] + computeCombinations(numbers.slice(startIndex), combinations, max);
        }
    });  
    return combinations[current];
     
}

export const task1 = async (inputFile: string) : Promise<number> =>  { 
 
    let lines = await readFile(inputFile);
    
    const dist = getDistributions(lines);
    
    return dist[1] * dist[3];

} 

export const task2 = async (inputFile: string) : Promise<number> =>  { 
 
    let lines = await readFile(inputFile); 

    return getDistributions2(lines); 

} 

