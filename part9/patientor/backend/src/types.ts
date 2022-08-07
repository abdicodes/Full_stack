export interface DiagnoseEntry {
    code: string;
    name: string;
    latin?: string;
}
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {}
export interface PatientEntry {
    id: string;
    name: string;
    dateOfBirth: string;
    ssn: string;
    gender: Gender;
    occupation: string;
    entries: Entry[] | never[];
}
export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;
export type NewPatientEntry = Omit<PatientEntry, 'id'>;

export enum Gender {
    Male = 'male',
    Female = 'female',
    Other = 'other',
}

export interface BaseEntry {
    id: string;
    description: string;
    date: string;
    specialist: string;
    diagnosisCodes?: Array<DiagnoseEntry['code']>;
}
