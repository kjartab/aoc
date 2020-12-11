import { LineActionResult, readFileWithLineAction } from '../../lib/fileReader';

export type Operation = {
    type: string,
    argument: number,
    delta: number
}

export type Accumulator = {
    accumulatedValue: number
} 

export type OperationAccumulator = Operation & Accumulator

export type OperationAccumulatorPosition = OperationAccumulator & { position: number}

export type ExecutionAggregate = {
 
    position: number
    filePositions: OperationAccumulator[] 
    
} & Accumulator

export const parseOperation = (line:string) : Operation => { 

    const parts = line.split(' '); 
    return { 
        type: parts[0], 
        argument: Number(parts[1]), 
        delta: parts[0] == 'jmp' ? Number(parts[1]) : 1 
    } 
} 

export const swap  = (startIndex: number, agg: ExecutionAggregate) : number => {

    var keys = Object.keys(agg.filePositions); 
    for (var i=startIndex; i <keys.length; i++) { 
        let pos = agg.filePositions[i];
        if (['nop', 'jmp'].includes(pos.type)) {
            pos.type = pos.type == 'jmp' ? 'nop' : 'jmp';
            pos.delta = pos.type == 'jmp' ? pos.delta : 1;
            return i+1;
        }
    } 
} 

export const getFixedResult = async (inputFile: string) : Promise<number> => { 
     
    let positionStart = 0;  
    while(true) { 
        let agg = await getStartExecutionAggregate(inputFile);
        positionStart = swap(positionStart, agg);
        let runs = await getSecondRuns(agg);
        if (runs.length < 1) {
            return agg.accumulatedValue;
        }
    }  
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
        filePositions : [],
        accumulatedValue: 0
    }  

    const lineAction = (line: string) : LineActionResult => {  

        const operation = parseOperation(line);
        agg.filePositions.push({ ...operation, accumulatedValue: 0}); 
        return 'Continue';
    }

    await readFileWithLineAction(inputFile, lineAction);   
    
    return agg;
} 