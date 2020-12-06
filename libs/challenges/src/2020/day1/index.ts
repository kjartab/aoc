import { LineActionResult, readFileWithLineAction } from '../../lib/fileReader';

export const calculateAnswerPart1 = async (inputFile: string, matchSum: number) => {
    return await calculateAnswerMatch2(inputFile, matchSum, findMatchingSum2);
}

export const calculateAnswerPart2 = async (inputFile: string, matchSum: number) => {
    return await calculateAnswerMatch2(inputFile, matchSum, findMatchingSum3);
} 

const calculateAnswerMatch2 = async (inputFile: string, matchSum: number, calculateAnswerFunction: (lines: number[], num: number, matchSum: number) => any) =>  {
    
    const lines = [];
    let answer:number = undefined;

    const lineAction = (line) : LineActionResult => {
        const newNum = Number(line)
        const res = calculateAnswerFunction(lines, newNum, matchSum)  
        if (res) {
            answer = res;
            return 'Resolve';
        }
        lines.push(newNum) 
        return 'Continue'
    } 

   await readFileWithLineAction(inputFile, lineAction);
   return answer; 
}

const findMatchingSum3 = (lines:number[], newValue:number, matchSum:number) => {

    for (var val of lines) {
        for (var valInner of lines) {
            if (val + valInner + newValue == matchSum) { 
                return val * valInner * newValue; 
            } 
        }
    }
    return;
}

const findMatchingSum2 = (lines:number[], newValue:number, matchSum:number) => {

    for (var val of lines) { 
        if (val + newValue == matchSum) {
            return val * newValue; 
        } 
    }
    return;
}

