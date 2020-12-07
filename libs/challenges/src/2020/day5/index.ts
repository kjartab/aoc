import { LineActionResult, readFileLength, readFileWithLineAction } from '../../lib/fileReader'; 
export const getBitArray = (size:number, bit:number) : number[] => {
    
    let arr = [];
    let i = 1;
    while (size >= i) { 
        size = size - i;
        arr.push(i); 
        i*=2;
    }
    return arr;
} 

export const getSeatId = (line: string, seatRows: number, seatColumns: number) : number => {
    
    const rows = getBitArray(seatRows,1); 
    const letters = getBitArray(seatColumns,1);
    
    for(var i = 0; i<7; i++) {
        if (line[i] === 'F') {
            rows[6-i] = 0;
        }
    }

    for(var i = 7; i<line.length; i++) {
        if (line[i] === 'L') {
            letters[line.length-1-i] = 0; 
        }
    }
    
    return rows.reduce((prev, cur) => prev + cur) * 8 + letters.reduce((prev, cur) => prev + cur) 
}


export const getMaxSeatId = async (inputFile: string) : Promise<number> =>  {
    let maxSeatId = 0;
    const lineAction = (line: string) : LineActionResult => { 
        let seatId = getSeatId(line, 128, 8);
        if (seatId > maxSeatId) {
            maxSeatId = seatId;
        }
        return 'Continue' 
    } 
    
    await readFileWithLineAction(inputFile, lineAction); 
    
    return maxSeatId;
} 

export const getMySeatId = async (inputFile: string) : Promise<number> =>  {
    
    const seatIds = new Array(1024).fill(false);
    const lineAction = (line: string) : LineActionResult => { 
        let seatId = getSeatId(line, 128, 8);
        seatIds[seatId] = true;
        return 'Continue' 
    } 
    
    await readFileWithLineAction(inputFile, lineAction);  
    for (var i=0; i<seatIds.length; i++) 
    {
        if (seatIds[i] == false && seatIds[i-1] && seatIds[i+1]) {
            return i;
        }
    } 
    return -1;
} 