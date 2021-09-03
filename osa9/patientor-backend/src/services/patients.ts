import patientData from '../data/patients';
import { Patient, NewPatientData, SensoredPatient, Entry } from '../types';
import { v1 as uuid } from 'uuid';

const getSensoredPatients = (): SensoredPatient[] => {
  return patientData.map( ({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getById = (id: string): Patient | undefined => {
  const patient = patientData.find( p => p.id === id);
  
  return patient
    ? patient
    : undefined;
};

const createPatient = (data: NewPatientData): Patient => {
  const newPatient = {
    ...data,
    id: createId(),
    entries: []
  };
  return newPatient;
};

const createId = (): string => {
  const id: string = uuid();
  return id;
};

const createEntry = (entry: Entry): Entry => {
  return {...entry, id: createId()};
};

export default { 
  getSensoredPatients,
  getById,
  createPatient,
  createEntry
};