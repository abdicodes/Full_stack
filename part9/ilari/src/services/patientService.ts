import { v4 as uuidv4 } from 'uuid';
import patientsData from '../../data/patients';

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn'>;
import { Gender, PatientEntry } from '../types';

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
const addPatient = (
    name: string,
    dateOfBirth: string,
    gender: Gender,
    occupation: string,
    ssn: string
): PatientEntry => {
    const newPatient = {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-call
        id: uuidv4(),
        name: name,
        dateOfBirth: dateOfBirth,
        gender: gender,
        occupation: occupation,
        ssn: ssn,
    };
    patientsData.push(newPatient);
    return newPatient;
};

export default { getEntries, getNonSensitiveEntries, addPatient };
