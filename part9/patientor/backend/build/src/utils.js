"use strict";
// export const idGenerator = (id:string): string => {
Object.defineProperty(exports, "__esModule", { value: true });
exports.toNewMedicalEntry = void 0;
// }
const types_1 = require("./types");
const uuid_1 = require("uuid");
const isString = (text) => {
    return typeof text === 'string' || text instanceof String;
};
const parseName = (name) => {
    if (!name || !isString(name)) {
        throw new Error('incorrect or missing name');
    }
    return name;
};
const parseSsn = (ssn) => {
    if (!ssn || !isString(ssn)) {
        throw new Error('incorrect or missing ssn');
    }
    return ssn;
};
const parseOccupation = (occupation) => {
    if (!occupation || !isString(occupation)) {
        throw new Error('incorrect or missing occupation');
    }
    return occupation;
};
const isDate = (date) => {
    return Boolean(Date.parse(date));
};
const parseDate = (date) => {
    if (!date || !isString(date) || !isDate(date)) {
        throw new Error('Incorrect or missing date: ' + date);
    }
    return date;
};
const parseRating = (rating) => {
    if (rating == 0)
        return rating;
    if (rating == 1)
        return rating;
    if (rating == 2)
        return rating;
    if (rating == 3)
        return rating;
    else
        throw new Error('invalid rating');
};
// const parseDiagnosisCodes = (codes: []): string[] => {
// const result: string[] = codes.map(code => {
//    return code;
// });
// return result;
// };
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isGender = (param) => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return Object.values(types_1.Gender).includes(param);
};
const parseGender = (gender) => {
    if (!gender || !isGender(gender)) {
        throw new Error('Incorrect or missing gender: ' + gender);
    }
    return gender;
};
const toNewMedicalEntry = (entry) => {
    var _a, _b;
    if (isString(entry.type)) {
        if (entry.type === 'HealthCheck') {
            const newEntry = {
                id: parseName((0, uuid_1.v4)()),
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
            const newEntry = {
                id: parseName((0, uuid_1.v4)()),
                description: parseName(entry.description),
                date: parseDate(entry.date),
                specialist: parseName(entry.specialist),
                type: 'OccupationalHealthcare',
                employerName: parseName(entry.employerName),
            };
            if (entry.sickLeave &&
                entry.sickLeave.endDate &&
                entry.sickLeave.startDate) {
                newEntry.sickLeave = {
                    startDate: parseDate(entry.sickLeave.startDate),
                    endDate: parseDate(entry.sickLeave.endDate),
                };
            }
            return newEntry;
        }
        if (entry.type === 'Hospital') {
            const newEntry = {
                id: parseName((0, uuid_1.v4)()),
                description: parseName(entry.description),
                date: parseDate(entry.date),
                specialist: parseName(entry.specialist),
                type: 'Hospital',
                discharge: {
                    date: parseDate((_a = entry.discharge) === null || _a === void 0 ? void 0 : _a.date),
                    criteria: parseName((_b = entry.discharge) === null || _b === void 0 ? void 0 : _b.criteria),
                },
            };
            return newEntry;
        }
        else
            throw new Error('Incorrent tyoe entry');
    }
    else
        throw new Error('Incorrent or missing data for a medical entry');
};
exports.toNewMedicalEntry = toNewMedicalEntry;
const toNewPatientEntry = ({ name, dateOfBirth, occupation, ssn, gender, }) => {
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
exports.default = toNewPatientEntry;
