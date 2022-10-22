// export const idGenerator = (id:string): string => {

// }
import {
    Gender,
    NewPatientEntry,
    Entry,
    HealthCheckEntry,
    OccupationalHealthcareEntry,
    HealthCheckRating,
    HospitalEntry,
} from './types';
import { v4 as uuidv4 } from 'uuid';
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

const parseRating = (rating: number): HealthCheckRating => {
    if (rating == 0) return rating;
    if (rating == 1) return rating;
    if (rating == 2) return rating;
    if (rating == 3) return rating;
    else throw new Error('invalid rating');
};

// const parseDiagnosisCodes = (codes: []): string[] => {

// const result: string[] = codes.map(code => {
//    return code;
// });
// return result;
// };
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
type EntryFields = {
    description: unknown;
    date: unknown;
    specialist: unknown;
    type: unknown;
    diagnosisCodes?: unknown;
    healthCheckRating?: unknown;
    employerName: unknown;
    sickLeave?: {
        startDate: unknown;
        endDate: unknown;
    };
    discharge?: {
        date: unknown;
        criteria: unknown;
    };
};
export const toNewMedicalEntry = (entry: EntryFields): Entry => {
    if (isString(entry.type)) {
        if (entry.type === 'HealthCheck') {
            const newEntry: HealthCheckEntry = {
                id: parseName(uuidv4()),
                description: parseName(entry.description),
                date: parseDate(entry.date),
                specialist: parseName(entry.specialist),
                type: 'HealthCheck',
                healthCheckRating: parseRating(Number(entry.healthCheckRating)),
            };
            if (Array.isArray(entry.diagnosisCodes)) {
                newEntry.diagnosisCodes = entry.diagnosisCodes;
            }
            return newEntry;
        }

        if (entry.type == 'OccupationalHealthcare') {
            const newEntry: OccupationalHealthcareEntry = {
                id: parseName(uuidv4()),
                description: parseName(entry.description),
                date: parseDate(entry.date),
                specialist: parseName(entry.specialist),
                type: 'OccupationalHealthcare',
                employerName: parseName(entry.employerName),
            };

            if (
                entry.sickLeave &&
                entry.sickLeave.endDate &&
                entry.sickLeave.startDate
            ) {
                newEntry.sickLeave = {
                    startDate: parseDate(entry.sickLeave.startDate),
                    endDate: parseDate(entry.sickLeave.endDate),
                };
            }
            return newEntry;
        }
        if (entry.type === 'Hospital') {
            const newEntry: HospitalEntry = {
                id: parseName(uuidv4()),
                description: parseName(entry.description),
                date: parseDate(entry.date),
                specialist: parseName(entry.specialist),
                type: 'Hospital',
                discharge: {
                    date: parseDate(entry.discharge?.date),
                    criteria: parseName(entry.discharge?.criteria),
                },
            };
            return newEntry;
        } else throw new Error('Incorrent tyoe entry');
    } else throw new Error('Incorrent or missing data for a medical entry');
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
