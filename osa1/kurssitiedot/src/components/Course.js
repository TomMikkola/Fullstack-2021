import React from 'react'

const Header = ({text}) => ( <h2>{text}</h2> )
  
const Content = ({course}) => {
    return(
      <>
        { course.parts.map( part =>
          <Part key={part.id} part={part} />
        ) }
      </>
    )
}
  
const Part = ({part}) =>  ( <p>{part.name} {part.exercises}</p> )
  
const Total = ({courses}) => {
    const total = courses.parts.reduce( (s,part) => s + part.exercises, 0 )
  
    return(
      <p style={{ fontWeight: 600 }}>total of {total} exercises</p>
    )
}

const Course = ({courses}) => {
    return (
      <>
        {courses.map( (course) => {
          return(
            <div key={course.id}>
              <Header text={course.name} />
              <Content course={course} />
              <Total courses={course} />
            </div>
          )
        })
        }
      </>
    )
}

export default Course;