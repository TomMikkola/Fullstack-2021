import React from 'react'

const GenreFilter = ({setGenreFilter}) => {

  const handleClick = (event) => {
    const genre = event.target.innerText

    genre === 'all genres'
      ? setGenreFilter('')
      : setGenreFilter(genre)
  }

  return(
    <>
      <button onClick={handleClick}>refactoring</button>
      <button onClick={handleClick}>agile</button>
      <button onClick={handleClick}>patterns</button>
      <button onClick={handleClick}>design</button>
      <button onClick={handleClick}>crime</button>
      <button onClick={handleClick}>classic</button>
      <button onClick={handleClick}>all genres</button>
    </>
  )
}

export default GenreFilter