import { State } from './state';
import { Diagnosis, Patient } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'SET_SINGLE_PATIENT';
      payload: Patient;
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'SET_DIAGNOSIS_LIST';
      payload: Diagnosis[];
    };

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case 'SET_DIAGNOSIS_LIST':
      return {
        ...state,
        diagnosis: {
          ...action.payload.reduce(
            (memo, diagonse) => ({ ...memo, [diagonse.code]: diagonse }),
            {}
          ),
          ...state.diagnosis,
        },
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case 'SET_SINGLE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    default:
      return state;
  }
};
export const patientList = (payload: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: payload,
  };
};
export const addPatient = (payload: Patient): Action => {
  return {
    type: 'ADD_PATIENT',
    payload: payload,
  };
};

export const singlePatient = (payload: Patient): Action => {
  return {
    type: 'SET_SINGLE_PATIENT',
    payload: payload,
  };
};

export const diagnosisList = (payload: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: payload,
  };
};
