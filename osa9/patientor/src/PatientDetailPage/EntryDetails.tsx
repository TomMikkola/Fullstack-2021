import React from "react";
import { Entry } from "../types";
import HealthCheckEntryComp from "./HealthCheckEntry";
import HospitalEntryComp from "./HospitalEntry";
import OccupationalHealthcareEntryComp from "./OccupationalHealthcareEntry";

const assertNever = (entry: never): never => {
  throw new Error(
    `Unhandled union member: ${JSON.stringify(entry)}`
  );
};

const EntryDetails: React.FC<{entry: Entry}> = ({entry}) => {
  switch(entry.type){

  case 'Hospital':
    return <HospitalEntryComp entry={entry}/>;

  case 'OccupationalHealthcare':
    return <OccupationalHealthcareEntryComp entry={entry}/>;

  case 'HealthCheck':
    return <HealthCheckEntryComp entry={entry}/>;

  default:
    return assertNever(entry);
  }
};

export default EntryDetails;