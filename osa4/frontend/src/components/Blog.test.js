import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Blog from './Blog'

const blog = {
  title: 'Otsikko',
  author: 'Kirjoittaja',
  url: 'blog.com',
  likes: '100',
  user: {
    name: 'Pena'
  }
}

const user = {
  name: 'Pena'
}

test('blog title & author are shown, but not url & likes', () => {

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  const blogDiv = component.container.querySelector('.blogDiv')
  expect(blogDiv).toHaveTextContent('Otsikko')
  expect(blogDiv).toHaveTextContent('Kirjoittaja')

  const additionalInfo = component.container.querySelector('.additionalInfo')
  expect(additionalInfo).toHaveStyle('display: none')
})

test('url and likes are shown after clicking show-button', () => {

  const component = render(
    <Blog blog={blog} user={user}/>
  )

  let additionalInfo = component.container.querySelector('.additionalInfo')
  expect(additionalInfo).toHaveStyle('display: none')

  const showButton = component.getByText('view')
  fireEvent.click(showButton)

  expect(additionalInfo).toHaveStyle('display: block')
})

test('if like is clicked twice the eventhandler is also called twice', () => {
  const mockLikeABlog = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} likeABlog={mockLikeABlog} />
  )

  const showButton = component.getByText('view')
  fireEvent.click(showButton)

  const likeButton = component.getByText('like')
  fireEvent.click(likeButton)
  fireEvent.click(likeButton)

  expect(mockLikeABlog.mock.calls).toHaveLength(2)
})