import patientsData from '../../data/patients';

import { PatientEntry } from '../types';

const getEntries = (): PatientEntry[] => {
    return patientsData;
};

export default { getEntries };
