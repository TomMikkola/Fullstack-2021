import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

export const loginUser = (username, password) => {

  return async dispatch => {
    try{
      const loggedUser = await loginService.login({ username, password })
      blogService.setToken(loggedUser.token)
      window.localStorage.setItem('loggedUser', JSON.stringify(loggedUser) )

      dispatch({
        type: 'LOGIN',
        data: loggedUser
      })

    } catch(exception){
      console.log(exception)
      dispatch( setNotification('wrong username or password', 5) )
    }
  }
}

export const logoutUser = () => {
  return {
    type: 'LOGOUT'
  }
}

export const setUser = (loggedUser) => {
  return{
    type: 'SET_USER',
    data: loggedUser
  }
}

const loginReducer = (state=null, action) => {

  switch(action.type){
  case 'LOGIN':
    return action.data

  case 'LOGOUT':
    return null

  case 'SET_USER':
    return action.data

  default:
    return state
  }
}

export default loginReducer