import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOG_IN } from '../queries'

const Login = ({ show, setPage, setUser }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [login] = useMutation(LOG_IN)

  if(!show){
    return null
  }

  const submit = (event) => {
    event.preventDefault()

    login({ variables: {
      username,
      password
    }})
    .then(response => {
      const token = response.data.login.value
      const loggedUser = {
        username,
        token
      }

      window.localStorage.setItem( 'user', JSON.stringify(loggedUser) )
      setUser(loggedUser)
      setPage('authors')
    })

    setUsername('')
    setPassword('')
  }

  return(
    <form onSubmit={submit}>
      <div>
          username:
          <input
            type='text'
            name='username'
            value={username}
            onChange={ (event) => setUsername(event.target.value) }
          />
      </div>
      
      <div>
          password:
          <input
            type='password'
            name='password'
            value={password}
            onChange={ (event) => setPassword(event.target.value) }
          />
        </div>

      <button>submit</button>
    </form>
  )
}

export default Login