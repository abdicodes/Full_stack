import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients';

import {
    PatientEntry,
    NewPatientEntry,
    NonSensitivePatientEntry,
    Entry,
} from '../types';

const getEntries = (): PatientEntry[] => {
    return patientsData;
};
const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
    return patientsData.map(
        ({ id, name, dateOfBirth, gender, occupation }) => ({
            id,
            name,
            dateOfBirth,
            gender,
            occupation,
        })
    );
};

const getPatientEntry = (id: string): PatientEntry | undefined => {
    return patientsData.find((patient) => patient.id === id);
};

const addPatient = (patientEntry: NewPatientEntry): PatientEntry => {
    const newPatient = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        id: uuidv4(),
        ...patientEntry,
    };
    patientsData.push(newPatient);
    return newPatient;
};
const addEntry = (entry: Entry, id: string): Entry => {
    patientsData.forEach((patient) =>
        patient.id == id ? patient.entries.push(entry) : null
    );
    const clone = (({ diagnosisCodes, ...rest }) => rest)(entry);
    return clone;
};

export default {
    getEntries,
    getNonSensitiveEntries,
    addPatient,
    getPatientEntry,
    addEntry,
};
