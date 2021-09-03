import express from 'express';
import patientsService from '../services/patients';
import { validateNewPatientData, validateEntry } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  const patients = patientsService.getSensoredPatients();
  res.send( patients );
});

router.get('/:id', (req, res) => {
  const patient = patientsService.getById(req.params.id);
  try{
    //const validatedData = validatePatientData(patient);
    res.send( patient );
  } catch(error) {
    res.status(400).send(error.message);
  }
  
});

router.post('/', (req,res) => {
  try{
    const validatedData = validateNewPatientData(req.body);
    const newPatient = patientsService.createPatient(validatedData);
    res.send(newPatient);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.post('/:id/entries', (req, res) => {

  const patientToUpdate = patientsService.getById(req.params.id);

  if( patientToUpdate && validateEntry(req.body) ) {
    const newEntry = patientsService.createEntry(req.body);
    const updatedPatient = {
      ...patientToUpdate, 
      entries: patientToUpdate.entries.concat(newEntry)
    };
    res.send(updatedPatient);
  } else {
    res.status(400).send('Something went wrong adding an entry: Can\'t find patient or entry not valid');
  }
  
});

export default router;