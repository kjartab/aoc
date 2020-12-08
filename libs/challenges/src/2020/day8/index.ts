import { start } from 'repl';
import { LineActionResult, readFileWithLineAction } from '../../lib/fileReader';

export type Operation = {
    type: string,
    argument: number,
    delta: number
}

export type Accumulator = {
    accumulatedValue: number
}

export type FilePositions = {
    [key: number]: OperationAccumulator
}

export type OperationAccumulator = Operation & Accumulator

export type OperationAccumulatorPosition = OperationAccumulator & { position: number}

export type ExecutionAggregate = {
 
    position: number
    filePositions: FilePositions
    
} & Accumulator

export const parseOperation = (line:string) : Operation => { 
        const parts = line.split(' '); 
        return { 
            type: parts[0], 
            argument: Number(parts[1]), 
            delta: parts[0] == 'jmp' ? Number(parts[1]) : 1 
        } 
    }

export const swapOperation = (startIndex: number, agg: ExecutionAggregate) : number => {

    var keys = Object.keys(agg.filePositions); 
    for (var i=startIndex; i <keys.length; i++) { 
        let type = agg.filePositions[i].type;
            if (type === 'nop') {
                agg.filePositions[i].type = 'jmp';
                return i+1;
            } else {
                agg.filePositions[i].type = 'nop';
                agg.filePositions[i].delta = 1; 
                return i+1;
            }
        
    } 
}

export const getFixedResult = async (inputFile: string) : Promise<number> => { 
    
    let agg = await getStartExecutionAggregate(inputFile);
    let runs = await getSecondRuns(agg);
    let positionStart = 0;
    let count = 0;
    while(runs.length > 0 && count < Object.keys(agg.filePositions).length) {
        count++;
        agg = await getStartExecutionAggregate(inputFile); 
        positionStart = swapOperation(positionStart, agg);
        runs = await getSecondRuns(agg);
    } 
    
    return agg.accumulatedValue;
}

export const getFirstSecondRunPreValue = async (inputFile: string) : Promise<number> =>  { 

    const agg = await getStartExecutionAggregate(inputFile);
    const runs = await getSecondRuns(agg)
    return runs[0].accumulatedValue;
} 

export const getSecondRuns = async (agg: ExecutionAggregate) : Promise<OperationAccumulatorPosition[]> =>  { 
    
    const runs : OperationAccumulatorPosition[] = [] 
    const keys = Object.keys(agg.filePositions).map(Number);
    keys.reduce((previousPosition: number) => {
        let op = agg.filePositions[previousPosition];  
        if (!op) {
            return agg.position;
        }
        op.accumulatedValue += 1; 
        if (op.accumulatedValue > 1) {
            runs.push({ ...op, accumulatedValue: agg.accumulatedValue, position: previousPosition }) 
        }  
        if (op.type == 'acc') {
            agg.accumulatedValue += op.argument;
        } 
        agg.position += op.delta
        return agg.position;
    }, 0) 
    
    return runs;
} 

export const getStartExecutionAggregate = async (inputFile: string) : Promise<ExecutionAggregate> =>  { 
 
    let agg : ExecutionAggregate = {
        position: 0,
        filePositions : {},
        accumulatedValue: 0
    } 

    let counter = 0;

    const lineAction = (line: string) : LineActionResult => {  

        const operation = parseOperation(line);
        agg.filePositions[counter] =  { ...operation, accumulatedValue: 0};
        counter++;
        return 'Continue';
    }

    await readFileWithLineAction(inputFile, lineAction);   
    
    return agg;
} 