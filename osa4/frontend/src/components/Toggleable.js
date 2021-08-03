import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line react/display-name
const Toggleable = React.forwardRef( (props, ref) => {
  const [visible, setVisible] = useState(false)

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return{
      toggleVisibility
    }
  })

  const hidden = { display: visible ? 'none' : '' }
  const show = { display: visible ? '' : 'none' }

  return (
    <>
      <div>
        <div style={hidden}>
          <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
      </div>
      <div style={show}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </>
  )
})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggleable