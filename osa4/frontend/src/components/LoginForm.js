import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { loginUser } from '../reducers/loginReducer'
import Notification from './Notification'

import { FormControl, InputLabel, Input, Button } from '@material-ui/core'

const LoginForm = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const handleLogin = async event => {
    event.preventDefault()
    dispatch( loginUser(username, password) )
  }

  const loginButton = {
    margin: '1em 1em 1em 0'
  }

  return <>
    <h2>Log in to application</h2>
    <Notification />
    <form onSubmit={handleLogin}>
      <div>
        <FormControl>
          <InputLabel>Username</InputLabel>
          <Input
            id="username"
            type="text"
            name="username"
            value={username}
            onChange={ ({ target }) => setUsername(target.value) }
          />
        </FormControl>
      </div>
      <div>
        <FormControl>
          <InputLabel>Password</InputLabel>
          <Input
            id="password"
            type="password"
            name="password"
            value={password}
            onChange={ ({ target }) => setPassword(target.value) }
          />
        </FormControl>
      </div>
      <Button
        variant="contained"
        color="primary"
        type="submit"
        style={loginButton}>
          Login
      </Button>
    </form>
  </>
}

export default LoginForm