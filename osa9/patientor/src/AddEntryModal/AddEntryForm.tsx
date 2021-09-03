import { Formik, Field, Form } from "formik";
import React, { useState } from "react";
import { Button } from "semantic-ui-react";
import { TextField, DiagnosisSelection, EntryTypeOption, EntryTypeField } from "../AddPatientModal/FormField";
import { useStateValue } from "../state";
import { baseAddEntryFormValues } from "../types";
import EntryTypeContent from './EntryTypeContent';
import { isDate } from '../utils';

interface Props {
  onSubmit: (values: baseAddEntryFormValues) => void;
  onCancel: () => void;
}

const entryTypeOptions: EntryTypeOption[] = [
  {value: 'Hospital', text: 'Hospital'},
  {value: 'OccupationalHealthcare', text: 'Occupational healthcare'},
  {value: 'HealthCheck', text: 'Healthcheck'}
];

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [{ diagnosis }] = useStateValue();
  const [type, setType] = useState<EntryTypeOption['value']>('Hospital');

  const handleTypeChange = (
    event: React.SyntheticEvent<HTMLElement, Event>, 
    value: string)
    : void => {
    setType(value);
  };

  return (
    <Formik
      initialValues={{
        date: '',
        description: '',
        specialist: '',
        diagnosisCodes: [],
        type: 'Hospital',
        dischargeDate: '',
        dischargeCriteria: '',
        employerName: '',
        sickLeaveStartDate: '',
        sickLeaveEndDate: '',
        healthCheckRating: 0
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const validationError = 'Invalid form on input';
        const errors: { [field: string]: string } = {};
        if (!values.date) {
          errors.date = requiredError;
        }
        if (!isDate(values.date)) {
          errors.date = validationError;
        }

        if (!values.description) {
          errors.description = requiredError;
        }
        if (!values.specialist) {
          errors.specialist = requiredError;
        }

        if (type === 'Hospital' && !values.dischargeDate) {
          errors.dischargeDate = requiredError;
        }
        if (type === 'Hospital' && !isDate(values.dischargeDate)) {
          errors.dischargeDate = validationError;
        }

        if (type === 'Hospital' && !values.dischargeCriteria) {
          errors.dischargeCriteria = requiredError;
        }
        if (type === 'OccupationalHealthcare' && !values.employerName) {
          errors.employerName = requiredError;
        }
        if (type === 'OccupationalHealthcare' && !values.sickLeaveStartDate) {
          errors.sickLeaveStartDate = requiredError;
        }
        if (type === 'OccupationalHealthcare' && !isDate(values.sickLeaveStartDate)) {
          errors.sickLeaveStartDate = validationError;
        }
        if (type === 'OccupationalHealthcare' && !values.sickLeaveEndDate) {
          errors.sickLeaveEndDate = requiredError;
        }
        if (type === 'OccupationalHealthcare' && !isDate(values.sickLeaveEndDate)) {
          errors.sickLeaveEndDate = validationError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
        return(
          <Form>
            <Field 
              label='Date'
              placeholder='YYYY-MM-DD'
              name='date'
              component={TextField}
            />
            <Field 
              label='Specialist'
              placeholder='Specialist'
              name='specialist'
              component={TextField}
            />
            <Field 
              label='Description'
              placeholder='Description'
              name='description'
              component={TextField}
            />
            <DiagnosisSelection 
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
              diagnoses={Object.values(diagnosis)}
            />
            <EntryTypeField 
              options={entryTypeOptions}
              handleTypeChange={ handleTypeChange }
              setFieldValue={setFieldValue}
              setFieldTouched={setFieldTouched}
            />

            <EntryTypeContent type={type} />
            <Button type="submit" disabled={!dirty || !isValid}>Submit</Button>
            <Button onClick={onCancel}>Cancel</Button>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddEntryForm;