export const setNotification = (content, timeout) => {
  return async dispatch => {
    setTimeout(() => {
      dispatch({
        type: 'SET',
        data: ''
      })
    }, timeout*1000)

    dispatch({
      type: 'SET',
      data: content
    })
  }
}

const notificationReducer = (state = '', action) => {

  switch(action.type){
  case 'SET':
    return action.data

  default:
    return state
  }
}

export default notificationReducer