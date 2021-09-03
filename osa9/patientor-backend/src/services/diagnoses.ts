import { Diagnosis } from '../types';
import diagnoseData from '../data/diagnoses.json';

const allDiagnoses: Diagnosis[] = diagnoseData as Diagnosis[];

const getAll = (): Diagnosis[] => {
  return allDiagnoses;
};

export default { getAll };