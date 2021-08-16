import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from '@material-ui/core'

const userList = () => {

  const users = useSelector( state => state.users )

  const sortedTableOfUsers = () => {
    users.sort( (elem1, elem2) => (elem1.blogs.length > elem2.blogs.length ? -1 : 1) )

    return(
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users.map( user => {
              return(
                <TableRow key={user.id}>
                  <TableCell><Link to={`/users/${user.id}`}>{user.name}</Link></TableCell>
                  <TableCell>{user.blogs.length}</TableCell>
                </TableRow>
              )
            })
            }
          </TableBody>
        </Table>
      </TableContainer>
    )
  }

  return(
    <>
      <h2>Users</h2>
      {sortedTableOfUsers()}
    </>
  )
}

export default userList