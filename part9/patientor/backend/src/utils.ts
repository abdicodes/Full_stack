// export const idGenerator = (id:string): string => {

// }
import { Gender, NewPatientEntry } from './types';

const isString = (text: unknown): text is string => {
    return typeof text === 'string' || text instanceof String;
};

const parseName = (name: unknown): string => {
    if (!name || !isString(name)) {
        throw new Error('incorrect or missing name');
    }
    return name;
};
const parseSsn = (ssn: unknown): string => {
    if (!ssn || !isString(ssn)) {
        throw new Error('incorrect or missing ssn');
    }
    return ssn;
};

const parseOccupation = (occupation: unknown): string => {
    if (!occupation || !isString(occupation)) {
        throw new Error('incorrect or missing occupation');
    }
    return occupation;
};

const isDate = (date: string): boolean => {
    return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param: any): param is Gender => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(Gender).includes(param);
};

const parseGender = (gender: unknown): Gender => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};

// const isEntryType = (entries: unknown[]): Entry[] => {

// }
type Fields = {
    name: unknown;
    dateOfBirth: unknown;
    occupation: unknown;
    ssn: unknown;
    gender: unknown;
};

const toNewPatientEntry = ({
    name,
    dateOfBirth,
    occupation,
    ssn,
    gender,
}: Fields): NewPatientEntry => {
    const newEntry = {
        name: parseName(name),
        dateOfBirth: parseDate(dateOfBirth),
        occupation: parseOccupation(occupation),
        ssn: parseSsn(ssn),
        gender: parseGender(gender),
        entries: [],
    };
    return newEntry;
};
export default toNewPatientEntry;
