import React from 'react'
import SetBirthYearForm from './SetBirthYearForm'

const Authors = ({show, authors, user}) => {

  if (!show) {
    return null
  }

  if( authors.loading ){
    authors = []
  } else{
    authors = authors.data.allAuthors
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      {user
        ? <SetBirthYearForm />
        : <></>
      }
    </div>
  )
}

export default Authors