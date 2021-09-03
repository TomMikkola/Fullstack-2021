import React from 'react';
import { HealthCheckEntry } from '../types';
import { Container, Header, Icon } from 'semantic-ui-react';

const descStyle = {
  fontStyle: "italic",
  color: "grey"
};

const greenHeart = {
  color: "green"
};

const yellowHeart = {
  color: "yellow"
};

const redHeart = {
  color: "red"
};

const setHeartColor = (rating: number) => {
  switch (rating){
  case 0:
    return <Icon style={greenHeart} name="heart"/>;

  case 1:
    return <Icon style={yellowHeart} name="heart"/>;

  case 2:
    return <Icon style={redHeart} name="heart"/>;
  }
};

const HealthCheckEntryComp = ({entry}: {entry: HealthCheckEntry}) => (
  <>
    <Header as="h3"> {entry.date}<Icon name="doctor"/> </Header>
    <Container style={descStyle}>
      <div>{ entry.description }</div>
      <div>{ setHeartColor(entry.healthCheckRating) }</div>
    </Container>
  </>
);

export default HealthCheckEntryComp;