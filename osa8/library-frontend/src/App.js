import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import Login from './components/Login'
import NewBook from './components/NewBook'
import Recommend from './components/Recommend'

import { useApolloClient, useQuery, useSubscription } from '@apollo/client'
import { GET_AUTHORS, GET_BOOKS, ME, BOOK_ADDED, PROBLEM } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [user, setUser] = useState(null)

  const problem = useQuery(PROBLEM)
  console.log(problem)

  const client = useApolloClient()
  const authors = useQuery(GET_AUTHORS)
  const books = useQuery(GET_BOOKS)
  const userFavoriteGenre = useQuery(ME)

  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      window.alert(`new book with title "${subscriptionData.data.bookAdded.title}" added`)
    }
  })

  useEffect( () => {
    const loggedUser = JSON.parse( window.localStorage.getItem('user') )
 
    if(loggedUser !== null){
      setUser( loggedUser )
    }
  }, [])

  const handleLogout = () => {
    setPage('authors')
    setUser(null)
    window.localStorage.clear()
    client.clearStore()
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {user
          ? <>
              <button onClick={() => setPage('add')}>add book</button>
              <button onClick={() => setPage('recommend')}>recommend</button>
            </>
          : <></>
        }
        {user
          ? <button onClick={handleLogout}>logout</button>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
        authors={authors}
        user={user}
      />

      <Books
        show={page === 'books'}
        books={books}
      />

      <NewBook
        show={page === 'add'}
      />

      <Login 
        show={page === 'login'}
        setPage={setPage}
        setUser={setUser}
      />

      <Recommend 
        show={page === 'recommend'}
        favoriteGenre={userFavoriteGenre}
        books={books}
      />

    </div>
  )
}

export default App