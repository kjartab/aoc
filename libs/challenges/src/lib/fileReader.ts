import fs from 'fs'; 
import es from 'event-stream';

export type LineActionResult = 'Continue' | 'Resolve';

export const readFileWithLineAction = async (inputFile:string, lineAction: (line:string) => LineActionResult) : Promise<number> =>  {
 
    return new Promise((resolve, reject) => {

        var s = fs.createReadStream(inputFile)
        .pipe(es.split())
        .pipe(es.mapSync((line:string) => {     
            const actionRes = lineAction(line);  
            switch (actionRes) {
                case 'Resolve':
                    resolve();  
            }
        })
        .on('error', function(err){
            console.log('Error while reading file.', err);
            reject(err);
        })
        .on('end', function(){  
            return resolve() 
        }));
    })
} 


export const readFileLength = async (inputFile:string) : Promise<number> =>  {
    
    let counter = 0;
    await readFileWithLineAction(inputFile, (line) => { counter++; return 'Continue' });
    return counter;
} 

