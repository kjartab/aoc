// import fs from 'fs'; 
// import es from 'event-stream';

// const findResult = async (inputFile, matchSum) => {
//     return await findResultMatch(inputFile, matchSum, findResultSimpleV1);
// }

// const findResult2 = async (inputFile, matchSum) => {
//     return await findResultMatch(inputFile, matchSum, findResultSimpleV2);
// }

// const findResultMatch = async (inputFile, matchSum, findResultFunction) =>  {
    
//     const lines = [];
//     return  new Promise((resolve, reject) => {

//         var s = fs.createReadStream(inputFile)
//         .pipe(es.split())
//         .pipe(es.mapSync(function(line){  
//             const newNum = Number(line)
//             const res = findResultFunction(lines, newNum, matchSum) 
//             if (res) {
//                 return resolve(res)
//             }
//             lines.push(newNum)
            
//         })
//         .on('error', function(err){
//             console.log('Error while reading file.', err);
//             return reject(err);
//         })
//         .on('end', function(){ 
//             return reject("no match");
//         }));
//     })
// }


// const findResultSimpleV2 = (lines, newValue, matchSum) => {

//     for (var val of lines) {
//         for (var valInner of lines) {
//             if (val + valInner + newValue == matchSum) { 
//                 return val * valInner * newValue; 
//             } 
//         }
//     }
//     return;
// }


// const findResultSimpleV1 = (lines, newValue, matchSum) => {

//     for (var val of lines) {
//         if (val + newValue == matchSum) {
//             return val * newValue; 
//         } 
//     }
//     return;
// }

 
// exports.findResult = findResult;  
// exports.findResult2 = findResult2;  