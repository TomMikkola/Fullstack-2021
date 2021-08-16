import userService from '../services/users'

export const initialUsers = () => {
  return async dispatch => {
    const users = await userService.getUsers()

    dispatch({
      type: 'INITIAL_USERS',
      data: users
    })
  }
}

const usersReducer = (state=[], action) => {

  switch (action.type){
  case 'INITIAL_USERS':
    return action.data
  default:
    return state
  }
}

export default usersReducer