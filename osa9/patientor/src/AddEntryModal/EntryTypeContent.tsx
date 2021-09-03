import React from "react";
import { Field } from "formik";
import { NumberField, TextField } from "../AddPatientModal/FormField";

const EntryTypeContent = ({ type }: { type:string }): JSX.Element => {
  switch (type){
  case 'Hospital':
    return (
      <>
        <Field 
          label='Discharge date'
          placeholder='YYYY-MM-DD'
          name='dischargeDate'
          component={TextField}
        />
        <Field 
          label='Discharge criteria'
          placeholder='Criteria'
          name='dischargeCriteria'
          component={TextField}
        />
      </>
    );

  case 'OccupationalHealthcare':
    return(
      <>
        <Field 
          label='Employer name'
          placeholder='Name'
          name='employerName'
          component={TextField}
        />
        <Field 
          label='Sickleave start date'
          placeholder='YYYY-MM-DD'
          name='sickLeaveStartDate'
          component={TextField}
        />
        <Field 
          label='Sickleave end date'
          placeholder='YYYY-MM-DD'
          name='sickLeaveEndDate'
          component={TextField}
        />
      </>
    );

  case 'HealthCheck':
    return <Field 
      label='Healthcheck rating'
      name='healthCheckRating'
      min='0'
      max='3'
      component={NumberField}
    />;

  default:
    return <></>;
  }
};

export default EntryTypeContent;