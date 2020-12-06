import fs from 'fs';
import es from 'event-stream';

import { LineActionResult, readFileWithLineAction } from '../../lib/fileReader';

export const calculateAnswerPart1 = async (inputFile) =>  { 
    return await countValidPasswords(inputFile, validPasswordLine)
} 

export const calculateAnswerPart2 = async (inputFile) =>  { 
    return await countValidPasswords(inputFile, validPasswordPositionPolicyLine)
} 

export const countValidPasswords = async (inputFile: string, policyChecker: (line:string) => boolean) : Promise<number> =>  {
    let counter = 0; 

    const lineAction = (line: string) : LineActionResult => { 
        if (policyChecker(line)) {
            counter++; 
        } 
        return 'Continue'
    } 

    await readFileWithLineAction(inputFile, lineAction);

    return counter;
} 

export const findValidPasswords = async (inputFile, policyChecker) =>  {
    let counter = 0; 
    return  new Promise((resolve, reject) => {

        var s = fs.createReadStream(inputFile)
        .pipe(es.split())
        .pipe(es.mapSync(function(line){    
            if (policyChecker(line)) {
                counter ++
            }
        })
        .on('error', function(err){
            console.log('Error while reading file.', err);
            reject(err);
        })
        .on('end', function(){  
            return resolve(counter) 
        }));
    })
    return counter;
} 

const parseLineToChallenge = (line) => {
    let parts = line.split(': '); 
    return {
        policy: parsePolicy(parts[0]),
        password: parts[1]
    }
} 

export const parsePolicy = (policy) => {
    let parts = policy.split(/-| /)  
    return { 
        min: Number(parts[0]),
        max: Number(parts[1]),
        letter: parts[2]
      }
}

const parseLineToPositionChallenge = (line) => {
    let parts = line.split(': '); 
    return {
        policy: parsePositionPolicy(parts[0]),
        password: parts[1]
    }
} 

export type PositionPasswordChallenge = {
    policy: PositionPolicy,
    password: string
}


export type PositionPolicy = {
    first: number,
    second: number,
    letter: string
}

const parsePositionPolicy = (policy) : PositionPolicy => {
    let parts = policy.split(/-| /)  
    return { 
        first: Number(parts[0]),
        second: Number(parts[1]),
        letter: parts[2]
      }
}

export const validPasswordLine = (line:string) : boolean => {
    let challenge = parseLineToChallenge(line)
    return validPasswordForPolicy(challenge.policy, challenge.password) 
}

export const validPasswordPositionPolicyLine = (line: string) : boolean  => {
    let challenge = parseLineToPositionChallenge(line) 
    return validPasswordForPositionPolicy(challenge.policy, challenge.password) 
}

export const validPasswordForPositionPolicy = (policy, password) : boolean => {   
    if (password[policy.first-1] != password[policy.second-1]) {
        if (policy.letter == password[policy.second-1] || policy.letter == password[policy.first-1]) {
            return true
        }
    }
    return false
} 

export const validPasswordForPolicy = (policy, password) => {
    let count = 0
    let i = 0
    while (i < password.length) {
        if (password[i] == policy.letter) {
            count++
        }
        if (count > policy.max) {
            return false
        }
        i++
    } 
    if (count >= policy.min) {
        return true;
    }
    return false;
} 

