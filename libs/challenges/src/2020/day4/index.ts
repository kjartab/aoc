import { LineActionResult, readFileLength, readFileWithLineAction } from '../../lib/fileReader';

export const calculateAnswerPart1 = async (inputFile) : Promise<number> =>  { 
    return -1;
} 

export const calculateAnswerPart2 = async (inputFile): Promise<number> =>  { 
    return -1;
}

export type HeightMetric = 'cm' | 'in' | undefined;

export type Height = {
    metric: HeightMetric,
    value: number
}

export class Passport {

    birthYear?:number
    issueYear?:number
    expirationYear?:number
    height?:string
    hairColor?:string
    eyeColor?:string
    passportId?:string
    countryId?:string
    
    static getHeight(passport: Passport) : Height | undefined {
        if (passport.height === undefined) {
            return undefined;
        }
        if (passport.height.endsWith('in')){
            return {
                metric: 'in',
                value: getNumber(passport.height.replace('in', ''))
            }
        } 
        if (passport.height.endsWith('cm')) {
            return {
                metric: 'cm',
                value: getNumber(passport.height.replace('cm', ''))
            }
        }
        return undefined;
    }

    static HeightBetween(passport: Passport, minCm: number, maxCm: number, minIn: number, maxIn: number): boolean {
        let height = Passport.getHeight(passport);
        if (height === undefined) {
            return false;
        }
        
        switch (height.metric) {
            case 'in':
                return height.value >= minIn && height.value <= maxIn;
            case 'cm':
                return height.value >= minCm && height.value <= maxCm;
            default:
                false;
        }
    }
    
    static getHeightInIn(passport: Passport) : number {
        return getNumber(passport.height.replace('in', ''))
    } 

    static getHeightInCm(passport: Passport) : number {
        return getNumber(passport.height.replace('cm', ''))
    }

    static hasAllFields(passport: Passport) : boolean {
        return (
            passport.birthYear !== undefined &&
            passport.issueYear !== undefined &&
            passport.expirationYear !== undefined &&
            passport.height !== undefined &&
            passport.hairColor !== undefined &&
            passport.eyeColor !== undefined &&
            passport.passportId !== undefined&&
            passport.countryId !== undefined
            )
    }

    static hasAllFieldsButCountryId(passport: Passport) : boolean {
        return (
            passport.birthYear !== undefined &&
            passport.issueYear !== undefined &&
            passport.expirationYear !== undefined &&
            passport.height !== undefined &&
            passport.hairColor !== undefined &&
            passport.eyeColor !== undefined &&
            passport.passportId !== undefined
            )
    }

    
    static CustomValid(p: Passport) : boolean {
        return (
            p.birthYear >= 1920 && p.birthYear <= 2002 &&
            p.issueYear >= 2010 && p.issueYear <= 2020 &&
            p.expirationYear >= 2020 && p.expirationYear <= 2030 &&
            Passport.HeightBetween(p, 150, 193, 59, 76) &&
            validEyeColor(p.eyeColor) &&
            validColor(p.hairColor) &&
            validPasswordId(p.passportId)
        ) 
    }
}
export const validEyeColor = (input:string): boolean => {
    const validValues = ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"]
    return validValues.indexOf(input) !== -1;
}

export const validPasswordId = (input: string): boolean => {  
    if (input === undefined ) {
        return false;
    }
    if (input.length == 9) {
        for (var i = 0; i < input.length; i++) {
            let valid = false;
            var num = getNumber(input[i]);
            if (num !== undefined) {
                valid = true;
            }
            if (!valid) {
                return false;
            }
        }
        return true;
    }
    return false;
}

export const validColor = (color: string) => {  
    if (color === undefined ) {
        return false;
    }
    const validChars = ['a','b','c','d','e','f']
    const minVal = 0;
    const maxVal = 9; 
    if (color.length == 7 && color[0] == '#') {
        for (var i = 1; i < color.length; i++) {
            let valid = false;
            var num = getNumber(color[i]);
            if (num !== undefined) {
                if (num >= minVal && num <= maxVal) {
                    valid = true;
                }
            } else {
                if (validChars.indexOf(color[i]) != -1) {
                    valid = true;
                }
            }
            if (!valid) {
                return false;
            }
        }
        return true;
    }
    return false;
}

export const linesToObject = (lines: string[]) : object => {

    let obj : object = {}
    lines.forEach(element => {
        let lineParts = element.split(' ')
        lineParts.forEach(parsst => {
            let wordParts = parsst.split(':')
            obj[wordParts[0]] = wordParts[1]
        }); 
    }); 
    return obj;
}

export const getNumber = (val:string) : number | undefined => {
    let num = Number(val)
    if (isNaN(num)) {
        return undefined;
    }
    return num;
}



export const parsePassport = (lines: string[]) : Passport => { 
    const obj = linesToObject(lines) 
    return {
        birthYear : getNumber(obj['byr']),
        issueYear: getNumber(obj['iyr']),
        expirationYear: getNumber(obj['eyr']),
        height: obj['hgt'],
        hairColor: obj['hcl'],
        eyeColor: obj['ecl'],
        countryId: obj['cid'],
        passportId: obj['pid'], 
    } 
}


export const countPassports = async (inputFile: string) : Promise<number> =>  {
    let counter = 0; 
    let passports = [];
    let tempLines = [];
    const lineAction = (line: string) : LineActionResult => { 
        if (line.length == 0) {
            if (tempLines.length > 0) {
                let passport = parsePassport(tempLines)  
                passports.push(passport)
                tempLines = [];
            }
             
        } 
        tempLines.push(line);
        return 'Continue' 
    } 
    
    await readFileWithLineAction(inputFile, lineAction); 
    
    if (tempLines.length > 0) {
        let passport = parsePassport(tempLines)  
        passports.push(passport)
        tempLines = [];
    }

    return passports.length;
} 

export const countCustomValidPassports = async (inputFile:string) : Promise<number> => { 
    let passports = [];
    let tempLines = [];
    const lineAction = (line: string) : LineActionResult => { 
        if (line.length == 0) {
            if (tempLines.length > 0) {
                let passport = parsePassport(tempLines)  
                if (Passport.CustomValid(passport)) {
                    passports.push(passport)
                }
                tempLines = [];
            }
             
        } 
        else {
            tempLines.push(line);
        }
        return 'Continue' 
    } 

    await readFileWithLineAction(inputFile, lineAction);
    
    if (tempLines.length > 0) {
        let passport = parsePassport(tempLines)  
        if (Passport.CustomValid(passport)) {
            passports.push(passport)
        }
        tempLines = [];
    }
    return passports.length;
}


export const validatedPasswordLines = async (inputFile: string, validateLine: (line:string) => any) : Promise<number> =>  {
    let counter = 0; 
    let passports = [];
    let tempLines = [];
    const lineAction = (line: string) : LineActionResult => { 
        if (line.length == 0) {
            if (tempLines.length > 0) {
                let passport = parsePassport(tempLines) 
                let valid = Passport.hasAllFieldsButCountryId(passport) 
                if (Passport.hasAllFieldsButCountryId(passport)) {
                    passports.push(passport)
                }
                tempLines = [];
            }
             
        } 
        else {
            tempLines.push(line);
        }
        return 'Continue' 
    } 

    await readFileWithLineAction(inputFile, lineAction);
    
    if (tempLines.length > 0) {
        let passport = parsePassport(tempLines) 
        let valid = Passport.hasAllFieldsButCountryId(passport) 
        if (Passport.hasAllFieldsButCountryId(passport)) {
            passports.push(passport)
        } 
    }
    return passports.length;
} 

export const countValidPassports = async (inputFile: string) : Promise<number> =>  {
    let counter = 0; 
    let passports = [];
    let tempLines = [];
    const lineAction = (line: string) : LineActionResult => { 
        if (line.length == 0) {
            if (tempLines.length > 0) {
                let passport = parsePassport(tempLines) 
                let valid = Passport.hasAllFieldsButCountryId(passport) 
                if (Passport.hasAllFieldsButCountryId(passport)) {
                    passports.push(passport)
                }
                tempLines = [];
            }
             
        } 
        else {
            tempLines.push(line);
        }
        return 'Continue' 
    } 

    await readFileWithLineAction(inputFile, lineAction);
    
    if (tempLines.length > 0) {
        let passport = parsePassport(tempLines) 
        let valid = Passport.hasAllFieldsButCountryId(passport) 
        if (Passport.hasAllFieldsButCountryId(passport)) {
            passports.push(passport)
        } 
    }
    return passports.length;
} 