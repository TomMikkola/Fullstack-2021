import React from 'react'
import { CoursePart } from "../types";

const italicStyle = {
  fontStyle: 'italic'
};

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled union member ${JSON.stringify(value)}`
  )
}

const Part = ({part}: {part: CoursePart}) => {
  
  switch(part.type){
  case 'normal':
    return (
      <div>
        <h3>{part.name} {part.exerciseCount}</h3>
        <p style={italicStyle}>{part.description}</p>
      </div>
    )
    
  case 'groupProject':
    return(
      <div>
        <h3>{part.name} {part.exerciseCount}</h3>
        <p>project exercises: {part.groupProjectCount}</p>
      </div>
    )
        
  case 'submission':
    return(
      <div>
        <h3>{part.name} {part.exerciseCount}</h3>
        <p style={italicStyle}>{part.description}</p>
        <p>submit to {part.exerciseSubmissionLink}</p>
      </div>
    )

  case 'special':
    return(
      <div>
        <h3>{part.name} {part.exerciseCount}</h3>
        <p style={italicStyle}>{part.description}</p>
        <p>required skills {part.requirements}</p>
      </div>
    )

  default:
    return assertNever(part)
  }
}

export default Part;