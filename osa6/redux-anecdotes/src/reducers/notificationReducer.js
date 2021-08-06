let prevTimeoutId = null

export const setNotification = (content, time) => {
  return async dispatch => {
    await dispatch({
      type: 'SET_NOTIF',
      data: content
    })

    const timeout = setTimeout( () => {
      dispatch({
        type: 'HIDE'
      })
    }, time*1000)

    if( timeout > prevTimeoutId ) {
      clearTimeout(prevTimeoutId)
    }

    prevTimeoutId = timeout
  }
}

export const hideNotification = () => {
  return{
    type: 'HIDE'
  }
}

const reducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_NOTIF':
    return action.data

  case 'HIDE':
    return null

  default:
    return state
  }
}

export default reducer