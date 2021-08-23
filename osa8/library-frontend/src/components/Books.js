import React, { useEffect, useState } from 'react'
import GenreFilter from './GenreFilter'
import { useLazyQuery } from '@apollo/client'
import { GET_FILTERED_BOOKS } from '../queries'

const Books = ({show, books, recommendations = false, favoriteGenre = ''}) => {
  const [genreFilter, setGenreFilter] = useState('')
  const [getFilteredBooks, filteredBooks] = useLazyQuery(GET_FILTERED_BOOKS, {
    variables: {genre: genreFilter},
    fetchPolicy: 'no-cache'
  })

  useEffect( () => {
    getFilteredBooks()
  }, [genreFilter])

  if (!show) {
    return null
  }

  if( books.loading ){
    books = []
  } else{
    books = books.data.allBooks
  }

  return(
    recommendations === true
      ? <div>
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>
                  author
                </th>
                <th>
                  published
                </th>
              </tr>
              {books.map(a => {
                return(
                  a.genres.includes(favoriteGenre)
                    ? <tr key={a.title}>
                        <td>{a.title}</td>
                        <td>{a.author.name}</td>
                        <td>{a.published}</td>
                      </tr>
                    : null
                )
              })}
            </tbody>
          </table>
        </div>
      : <div>
          <h2>books</h2>
          {genreFilter === ''
            ? <div>in <strong>all genres</strong></div>
            : <div>in genre <strong>{genreFilter}</strong></div>
          }
          <table>
            <tbody>
              <tr>
                <th></th>
                <th>
                  author
                </th>
                <th>
                  published
                </th>
              </tr>
              {
              filteredBooks.loading
                ? <tr></tr>
                : filteredBooks.data.allBooks.map(a => 

                  <tr key={a.title}>
                      <td>{a.title}</td>
                      <td>{a.author.name}</td>
                      <td>{a.published}</td>
                    </tr>
              )
              
              }
            </tbody>
          </table>
          <GenreFilter setGenreFilter={setGenreFilter}/>
        </div>
  )
}

export default Books