import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import { Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

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
          <Button
            variant="contained"
            endIcon={ <AddIcon /> }
            onClick={ toggleVisibility }
          >{props.buttonLabel}</Button>
        </div>
      </div>
      <div style={show}>
        {props.children}
        <Button
          variant='contained'
          size='small'
          onClick={ toggleVisibility }
        >
            Cancel
        </Button>
      </div>
    </>
  )
})

Toggleable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Toggleable