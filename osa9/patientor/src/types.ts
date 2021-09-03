export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
  entries: Entry[];
}

export interface HospitalEntry extends BaseEntry {
  type: 'Hospital',
  discharge: Discharge
}

export interface Discharge {
  date: string;
  criteria: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: 'OccupationalHealthcare',
  employerName: string,
  sickLeave?: SickLeave
}

export interface SickLeave {
  startDate: string;
  endDate: string;
}

export interface HealthCheckEntry extends BaseEntry {
  type: 'HealthCheck';
  healthCheckRating: HealthCheckRating;
}

export enum HealthCheckRating {
  'Healthy' = 0,
  'LowRistk' = 1,
  'HighRisk' = 2,
  'CriticalRisk' = 3
}

export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export type Entry = 
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export type HospitalEntryValues = Omit<HospitalEntry, 'id'>;
export type HealthCheckEntryValues = Omit<HealthCheckEntry, 'id'>;
export type OccupationalHealthcareEntryValues = Omit<OccupationalHealthcareEntry, 'id'>;
export type EntryFormValueTypes = HospitalEntryValues | HealthCheckEntryValues | OccupationalHealthcareEntryValues;
export interface baseAddEntryFormValues {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
  type?: 'Hospital' | 'HealthCheck' | 'OccupationalHealthcare';
  dischargeDate?: string;
  dischargeCriteria?: string;
  employerName?: string;
  sickLeaveStartDate?: string;
  sickLeaveEndDate?: string;
  healthCheckRating?: HealthCheckRating;
}