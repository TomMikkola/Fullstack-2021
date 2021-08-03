const _ = require('lodash')

const dummy = () => {
  return 1
}

const totalLikes = (blogs) => {
  const likes = blogs.map( blog => blog.likes)
  const reducer = (acc, curVal) => acc + curVal

  return likes.reduce(reducer, 0)
}

const favoriteBlog = (blogs) => {

  let favorite = blogs[0]

  blogs.filter( blog => {
    blog.likes > favorite.likes
      ? favorite = blog
      : favorite
  })

  return ({
    'title': favorite.title,
    'author': favorite.author,
    'likes': favorite.likes
  })
}

const mostBlogs = (blogs) => {
    
  let authors = blogs.map( blog => blog.author )
  authors = _.uniq(authors)
  let results = authors.map( author => ({'author': author, 'blogs': 0}))

  blogs.map( blog => {
    results.map( resultee => {
      blog.author === resultee.author
        ? resultee.blogs++
        : resultee.blogs
    })
  })

  results.sort( (res1,res2) => ( res1.blogs < res2.blogs ? 1 : -1 ) )
  return ( results[0] )
}

const mostLikes = (blogs) => {
    
  let authors = blogs.map( blog => blog.author )
  authors = _.uniq(authors)
  let results = authors.map( author => ({'author': author, 'likes': 0}))

  blogs.map( blog => {
    results.map( resultee => {
      blog.author === resultee.author
        ? resultee.likes = resultee.likes + blog.likes
        : resultee.likes
    })
  })

  results.sort( (res1,res2) => ( res1.likes < res2.likes ? 1 : -1 ) )
  return ( results[0] )
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}