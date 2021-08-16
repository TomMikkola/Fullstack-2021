import { useState } from 'react'

export const useInput = (name) => {
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