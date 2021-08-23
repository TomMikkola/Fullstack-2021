import { gql } from '@apollo/client'

export const PROBLEM = gql`
  query {
    allAuthors {
      name 
      bookCount
    }
  }
`

export const BOOK_ADDED = gql`
  subscription {
    bookAdded{
      title
    }
  }
`

export const GET_AUTHORS = gql`
  query GET_AUTHORS{
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const GET_BOOKS = gql`
  query GET_BOOKS($genre: String, $author: String){
    allBooks(
      genre: $genre,
      author: $author
    ){
      title
      author{
        name
      }
      published
      genres
    }
  }
`

export const GET_FILTERED_BOOKS = gql`
  query GET_BOOKS($genre: String, $author: String){
    allBooks(
      genre: $genre,
      author: $author
    ){
      title
      author{
        name
      }
      published
      genres
    }
  }
`

export const ME = gql`
  query ME{
    me{
      favoriteGenre
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBookToList($title: String!, $author: String!, $published: Int!, $genres: [String!]){
    addBook( 
      title: $title,
      author: $author, 
      published: $published, 
      genres: $genres
    ){
      title
      author{
        name
      }
      published
      genres
    }
  }
`

export const EDIT_AUTHOR = gql`
  mutation updateBirthyear( $name: String!, $setBornTo: Int! ){
    editAuthor(
      name: $name,
      setBornTo: $setBornTo
    ){
      name
      born
      bookCount
    }
  }
`

export const LOG_IN = gql`
  mutation LOG_IN($username: String!, $password: String!){
    login(
      username: $username,
      password: $password
    ){
      value
    }
  }
`