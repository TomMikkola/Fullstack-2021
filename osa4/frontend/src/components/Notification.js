import React from 'react'
import { useSelector } from 'react-redux'

import { Alert } from '@material-ui/lab'

const Notification = () => {

  const notification = useSelector( state => state.notifications )

  if( notification === ''){
    return <div></div>
  } else {
    return <Alert severity='success'>{notification}</Alert>
  }


}

export default Notification