import React from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { logoutUser } from '../reducers/loginReducer'
import { useHistory } from 'react-router'

import { Button } from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import PersonIcon from '@material-ui/icons/Person'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

const Menu = () => {

  const dispatch = useDispatch()
  const user = useSelector( state => state.user )
  const history = useHistory()

  const handleLogout = () => {
    window.localStorage.clear()
    dispatch( logoutUser() )
    history.push('/')
  }

  const loggedStyle = {
    display: 'inline-block',
    padding: '0 0.5em'
  }

  const menuStyle = {
    padding: '0 0.5em',
    color: 'white',
    textDecoration: 'none'
  }

  const menuButton = {
    margin: '0 0.5em'
  }

  return(
    <div>
      <Button
        variant="contained"
        color="primary"
        startIcon={<HomeIcon />}
      >
        <Link to='/' style={menuStyle}>blogs</Link>
      </Button>

      <Button
        variant="contained"
        color="primary"
        style={menuButton}
        startIcon={<PersonIcon />}
      >
        <Link to='/users' style={menuStyle}>users</Link>
      </Button>

      { user !== null
        ? <div style={loggedStyle}> {user.name} is logged in <Button
          variant='contained'
          color='secondary'
          endIcon={ <ExitToAppIcon /> }
          size='small'
          onClick={handleLogout}
        >logout
        </Button>
        </div>
        : null
      }
    </div>
  )
}

export default Menu