import React from 'react'
import Books from './Books'

const Recommend = ({show, favoriteGenre, books}) => {
  if(!show){
    return null
  }

  if( favoriteGenre.loading || books.loading ){
    return <div>loading...</div>
  } else {
    return <>
      <h2>recommendations</h2>
      <div>books in your favorite genre <strong>{favoriteGenre.data.me.favoriteGenre}</strong></div>
      <Books 
        show={true}
        books={books}
        recommendations={true}
        favoriteGenre={favoriteGenre.data.me.favoriteGenre}
      />
    </>
  } 
}

export default Recommend