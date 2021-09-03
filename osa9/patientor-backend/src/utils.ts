import {
  NewPatientData, 
  Gender,
  Entry, 
  HospitalEntry, 
  HealthCheckEntry, 
  OccupationalHealthcareEntry 
} from "./types";

type newPatientFields = {
  name: unknown,
  ssn: unknown,
  dateOfBirth: unknown,
  occupation: unknown,
  gender: unknown
};

export const validateNewPatientData = ({ name, ssn, dateOfBirth, occupation, gender }: newPatientFields): NewPatientData => {
  const validatedPatient = {
    name: parseName(name),
    ssn: parseSsn(ssn),
    dateOfBirth: parseDoB(dateOfBirth),
    occupation: parseOccupation(occupation),
    gender: parseGender(gender)
  };

  return validatedPatient;
};

const parseName = (name: unknown): string => {
  if( !name || !isString(name) ) {
    throw new Error('Incorrect or missing name');
  }

  return name;
};

const isString = (name: unknown): name is string => {
  return typeof name === 'string' || name instanceof String;
};

const parseSsn = (ssn: unknown): string => {
  if( !ssn || !isString(ssn) || !isValidSsn(ssn) ) {
    throw new Error('Incorrect or missing ssn');
  }

  return ssn;
};

const isValidSsn = (ssn: string): boolean => {
  if ( /\d{6}-[A-Z\d]{3,4}/.test(ssn) ){
    return true;
  } else {
    return false;
  }
};

const parseDoB = (date: unknown): string => {
  if( !date || !isString(date) || !isDate(date)) {
    throw new Error('Incorret or missing date of birth');
  }

  return date;
};

const isDate = (date: string): boolean => {
  return Boolean( Date.parse(date) );
};

const parseOccupation = (occupation: unknown): string => {
  if( !occupation || !isString(occupation) ) {
    throw new Error('Incorret or missing occupation');
  }

  return occupation;
};

const parseGender = (gender: unknown): Gender => {
  if( !gender || !isGender(gender) ) {
    throw new Error('Incorret or missing gender');
  }

  return gender;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

/* export const validatePatientData = (patient: Patient): Patient => {
  const validatedPatient = {
    id: parseId(patient.id),
    name: parseName(patient.name),
    ssn: parseSsn(patient.ssn),
    dateOfBirth: parseDoB(patient.dateOfBirth),
    occupation: parseOccupation(patient.occupation),
    gender: parseGender(patient.gender),
    entries: parseEntries(patient.entries)
  };

  return validatedPatient;
};

const parseId = (id: unknown): string => {
  if(!id || !isString(id)){
    throw new Error('Corrupted id');
  }

  return id;
};

const parseEntries = (entries: Entry[]): Entry[] => {
  const validatedEntries = entries.map( entry => {
    switch (entry.type){

    case 'Hospital':
      if( !isHospital( entry.type ) ){
        throw new Error('Malformed entry data');
      }
      return entry;

    case 'OccupationalHealthcare':
      if( !isOccuHealthcare( entry.type ) ){
        throw new Error('Malformed entry data');
      }
      return entry;

    case 'HealthCheck':
      if( !isHealthCheck( entry.type ) ){
        throw new Error('Malformed entry data');
      }
      return entry;
    }

  });

  return validatedEntries;
};
*/

export const validateEntry = (entry: unknown): boolean => {

  if( isEntry(entry) ) {
    switch (entry.type) {
    case 'Hospital':
      if(isHospital(entry) ){
        return true;
      }
      return false;
    
    case 'HealthCheck':
      if(isHealthCheck(entry)) {
        return true;
      }
      return false;
    
    case 'OccupationalHealthcare':
      if(isOccupationalHealth(entry)) {
        return true;
      }
      return false;
    
    default:
      return false;
    }
  } else {
    return false;
  }
};

const isEntry = (entry: any): entry is Entry => {
  if(
    'description' in entry &&
    'date' in entry &&
    'specialist' in entry
  ){
    if( 'diagnosisCodes' in entry ){
      return isDiagnosisCode(entry.diagnosisCodes);
    }
    return true;
  }

  return false;
};

const isHospital = (entry: any): entry is HospitalEntry => {
  if(
    'date' in entry &&
    'description' in entry &&
    'discharge' in entry &&
    'specialist' in entry
  ){
    return true;
  }

  return false;
};

const isHealthCheck = (entry: any): entry is HealthCheckEntry => {
  return 'healthCheckRating' in entry;
};

const isOccupationalHealth = (entry: any): entry is OccupationalHealthcareEntry => {
  if( 'employerName' in entry ){
    return true;
  }
  return false;
};

const isDiagnosisCode = (codes: any[]): boolean => {
  if( codes.find( c => typeof c !== 'string')) {
    return false;
  } else {
    return true;
  }
};