import diagnosesData from '../../data/diagnoses';
import { DiagnoseEntry } from '../types';

const getEntries = (): DiagnoseEntry[] => diagnosesData;

export default { getEntries };
