import React from 'react';
import { HospitalEntry } from '../types';
import { Container, Header, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';

const HospitalEntryComp = ({entry}: {entry: HospitalEntry}) => {
  const [{diagnosis},] = useStateValue();
  const descStyle = {
    fontStyle: "italic",
    color: "grey"
  };
  
  return (
    <>
      <Header as="h3"> {entry.date}<Icon name="hospital"/> </Header>
      <Container style={descStyle}>
        <ul>
          {entry.diagnosisCodes?.map( (code, i) => 
            <li key={i}>{code} {diagnosis[code].name}</li>    
          )}
        </ul>
      </Container>
    </>
  );
};

export default HospitalEntryComp;