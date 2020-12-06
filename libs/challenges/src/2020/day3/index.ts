
const fs = require('fs')
const es = require('event-stream');
import { readFileLength } from '../../lib/fileReader';
export const calculateAnswerPart2 = async (inputFile, horizontalMove, verticalMove): Promise<number> =>  { 
    return await findTrees(inputFile, horizontalMove, verticalMove)
}

export const calculateAnswerPart1 = async (inputFile) : Promise<number> =>  { 
    return await findTrees(inputFile, 3, 1)
} 


const findTrees = async (inputFile, horizontalMove, verticalMove): Promise<number> =>  {
    let treeCount = 0;
    let stepCount = 0;
    const lineCount = await readFileLength(inputFile);
    
    return  new Promise((resolve, reject) => {
        var s = fs.createReadStream(inputFile)
        .pipe(es.split())
        .pipe(es.mapSync((line: string) => {    
                if (stepCount > 0 && stepCount % verticalMove == 0) { 
                    treeCount += hasTree(parseLine(line, Math.ceil(lineCount/3)), stepCount/verticalMove, horizontalMove);
                
                } 
            stepCount ++;
        })
        .on('error', function(err){
            console.log('Error while reading file.', err);
            reject(err);
        })
        .on('end', function(){   
            return resolve(treeCount) 
        }));
    })
}

export const parseLine = (line, multiply) => { 
    return line.repeat(multiply).split('').map(letter => letter == '#' ? true : false);
} 

const hasTree = (line: string, step: number, horizontalMove: number): number => {    
    return Number(line[step*horizontalMove])
}
 