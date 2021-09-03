import React from 'react';
import { OccupationalHealthcareEntry } from '../types';
import { Container, Header, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';

const descStyle = {
  fontStyle: "italic",
  color: "grey"
};

const OccupationalHealthcareEntryComp = ({entry}: {entry: OccupationalHealthcareEntry}) => {
  const [{diagnosis},] = useStateValue();
  
  return (
    <>
      <Header as="h3"> {entry.date}<Icon name="stethoscope"/>{entry.employerName} </Header>
      <Container style={descStyle}>
        {entry.description}
        <ul>
          {entry.diagnosisCodes?.map( (code, i) => 
            <li key={i}>{code} {diagnosis[code].name}</li>    
          )}
        </ul>
      </Container>
    </>
  );
};

export default OccupationalHealthcareEntryComp;