import React, { useState } from "react"
import Select from 'react-select'
import { useMutation, useApolloClient } from "@apollo/client"
import { EDIT_AUTHOR, GET_AUTHORS } from '../queries'

const useInput = (name) => {

  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue( event.target.value )
  }

  const reset = () => {
    setValue('')
  }

  return{
    name,
    value,
    onChange,
    reset
  }
}

const SetBirthYearForm = () => {

  const client = useApolloClient()
  let authors = client.readQuery({ query: GET_AUTHORS })

  if(authors){
    authors = authors.allAuthors.map(a => {
      return{
        value: a.name, 
        label: a.name
      }
    })
  }

  const [selectedOption, setSelectedOption] = useState(null)
  const bornInput = useInput('born')
  const {reset, ...bornNoReset} = bornInput

  const [updateBirthyear] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [{ query: GET_AUTHORS }]
  })

  const handleSubmit = (event) => {
    event.preventDefault()
    const {name, born} = event.target
    
    updateBirthyear({ variables: {name: name.value, setBornTo: Number(born.value)} })
    setSelectedOption(null)
    bornInput.reset()
  }

  const handleChange = (event) => {
    setSelectedOption(event)
  }

  return(
    <>
      <h2>Set birthyear</h2>
      
      <form onSubmit={handleSubmit}>
        <Select 
          name='name'
          value={selectedOption}
          onChange={handleChange}
          options={authors}
        />
        <div>
          born<input {...bornNoReset}/>
        </div>
        <button type='submit'>update author</button>
      </form>
    </>
  )
}

export default SetBirthYearForm