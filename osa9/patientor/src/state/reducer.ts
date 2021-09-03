import { State } from "./state";
import { Diagnosis, Patient } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SELECT_PATIENT";
      payload: Patient;
    }
  |  {
      type: "UPDATE_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_LIST";
      payload: Diagnosis[];
    };

export const setPatientList = (list: Patient[]): Action => {
  return{
    type: 'SET_PATIENT_LIST',
    payload: list
  };
};

export const addPatient = (patient: Patient): Action => {
  return{
    type: 'ADD_PATIENT',
    payload: patient
  };
};

export const patientInDetail = (patient: Patient): Action => {
  return{
    type: 'SELECT_PATIENT',
    payload: patient
  };
};

export const updatePatient = (patient: Patient): Action => {
  return{
    type: 'UPDATE_PATIENT',
    payload: patient
  };
};

export const setDiagnosisList = (list: Diagnosis[]): Action => {
  return {
    type: 'SET_DIAGNOSIS_LIST',
    payload: list
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
  case "SET_PATIENT_LIST":
    return {
      ...state,
      patients: {
        ...action.payload.reduce(
          (memo, patient) => ({ ...memo, [patient.id]: patient }),
          {}
        ),
        ...state.patients
      }
    };
  case "ADD_PATIENT":
    return {
      ...state,
      patients: {
        ...state.patients,
        [action.payload.id]: action.payload
      }
    };
  case 'SELECT_PATIENT':
    return {
      ...state,
      patient: {
        ...action.payload
      }
    };
  case 'UPDATE_PATIENT':
    return {
      ...state,
      patients: {
        ...state.patients, [action.payload.id]: action.payload
      },
      patient: {
        ...state.patient, entries: action.payload.entries
      }
    };
  case 'SET_DIAGNOSIS_LIST':
    return {
      ...state,
      diagnosis: {
        ...action.payload.reduce(
          (memo, diagnose) => ({...memo, [diagnose.code]: diagnose}),
          {}
        )
      }
    };
  default:
    return state;
  }
};
