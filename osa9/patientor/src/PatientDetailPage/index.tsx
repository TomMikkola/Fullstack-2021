import React, { useState } from "react";
import { updatePatient, useStateValue } from "../state";
import { Container, Header, Icon, Segment, Button } from "semantic-ui-react";
import EntryDetails from "./EntryDetails";
import AddEntryModal from "../AddEntryModal";
import axios from "axios";
import { apiBaseUrl } from "../constants";
import { useParams } from "react-router";
import { 
  Patient, 
  OccupationalHealthcareEntryValues, 
  HospitalEntryValues, 
  HealthCheckEntryValues,
  EntryFormValueTypes,
  baseAddEntryFormValues
} from "../types";

const PatientDetailPage = () => {
  const [{patient}, dispatch] = useStateValue();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string|undefined>('');
  const {id}: {id?: string} = useParams();

  const gender = () => {
    switch (patient.gender){
    case 'male':
      return <Icon name="mars" />;
    case 'female':
      return <Icon name="venus" />;
    case 'other':
      return <Icon name="venus mars" />;
    default:
      return null;
    }
  };

  const openEntryModal = (): void => {
    setModalOpen(true);
  };

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const checkType = (values: baseAddEntryFormValues): EntryFormValueTypes | undefined => {
    
    if( 'type' in values && values.type === 'Hospital'){
      const newEntry = {
        date: values.date,
        type: values.type,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes,
        description: values.description,
        discharge: {
          date: values.dischargeDate,
          criteria: values.dischargeCriteria
        }
      };

      if(isHospital(newEntry)){
        return newEntry;
      }
    } else if ('type' in values && values.type === 'OccupationalHealthcare') {
      const newEntry = {
        date: values.date,
        type: values.type,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes,
        description: values.description,
        employerName: values.employerName,
        sickLeave: {
          startDate: values.sickLeaveStartDate,
          endDate: values.sickLeaveEndDate
        }
      };

      if(isOccupational(newEntry)){
        return newEntry;
      }
    } else if ('type' in values && values.type === 'HealthCheck') {
      const newEntry = {
        date: values.date,
        type: values.type,
        specialist: values.specialist,
        diagnosisCodes: values.diagnosisCodes,
        description: values.description,
        healthCheckRating: values.healthCheckRating
      };

      if(isHealthCheck(newEntry)){
        return newEntry;
      }
    }

    return undefined;
  };

  const isHospital = (values: baseAddEntryFormValues): values is HospitalEntryValues => {
    return values.type === 'Hospital';
  };

  const isOccupational = (values: baseAddEntryFormValues): values is OccupationalHealthcareEntryValues => {
    return values.type === 'OccupationalHealthcare';
  };

  const isHealthCheck = (values: baseAddEntryFormValues): values is HealthCheckEntryValues => {
    return values.type === 'HealthCheck';
  };

  const submitNewEntry = async (values: baseAddEntryFormValues) => {
    if(id){
      console.log(`lähetetään ${apiBaseUrl}/${id}/entries`);
      const url= `${apiBaseUrl}/patients/${id}/entries`;

      const formattedValues = checkType(values);

      try{
        const { data: updatedPatient } = await axios.post<Patient>(url, formattedValues);
        dispatch( updatePatient(updatedPatient) );
        closeModal();
      } catch(error) {
        console.log(error);
      }
    }
  };

  return(
    <>
      <Header as='h2'>{patient.name} {gender()}</Header>
      <Container>
        <div>ssn: {patient.ssn}</div>
        <div>occupation: {patient.occupation}</div>
      </Container>
      <Header as='h3'>entries <Button onClick={openEntryModal}>Add entry</Button></Header>
      <Container>
        {patient.entries.map( entry => {
          return <Segment key={entry.id}>
            <EntryDetails entry={entry}/>
          </Segment>;
        })}
      </Container>
      <AddEntryModal
        modalOpen={modalOpen}
        error={error}
        onSubmit={submitNewEntry} 
        onClose={closeModal}
      />
    </>
  );
};

export default PatientDetailPage;