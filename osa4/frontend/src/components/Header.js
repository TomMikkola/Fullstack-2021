import React from 'react'
import { useSelector } from 'react-redux'

const Header = () => {

  const notification = useSelector( state => state.notifications )

  return(
    <>
      <h2>blogs</h2>
      <div>{notification}</div>
    </>
  )
}

export default Header