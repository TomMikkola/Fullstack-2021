import React from 'react'
import { connect } from 'react-redux'

const Notification = (props) => {
  const notification = props.notifications

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const hidden = {
    display: 'none'
  }

  return (
    <div style={ !notification ? hidden : style }>
      { notification }
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    notifications: state.notifications
  }
}

const connectedNotification = connect(
  mapStateToProps,
  null
)(Notification)

export default connectedNotification