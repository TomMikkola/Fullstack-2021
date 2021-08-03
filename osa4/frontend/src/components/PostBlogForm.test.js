import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import PostBlogForm from './PostBlogForm'

test('form calls the eventhandler with correct information', () => {

  const mockCreateBlog = jest.fn()

  const component = render(
    <PostBlogForm createBlog={mockCreateBlog} />
  )

  const titleInput = component.container.querySelector('#title')
  expect(titleInput).toBeDefined()
  fireEvent.change(titleInput, {
    target: { value: 'Test title' }
  })

  const authorInput = component.container.querySelector('#author')
  expect(authorInput).toBeDefined()
  fireEvent.change(authorInput, {
    target: { value: 'Test author' }
  })

  const urlInput = component.container.querySelector('#url')
  expect(urlInput).toBeDefined()
  fireEvent.change(urlInput, {
    target: { value: 'Test url' }
  })

  const form = component.container.querySelector('form')
  fireEvent.submit(form)

  expect(mockCreateBlog.mock.calls).toHaveLength(1)
  expect(mockCreateBlog.mock.calls[0][0].title).toBe('Test title')
  expect(mockCreateBlog.mock.calls[0][0].author).toBe('Test author')
  expect(mockCreateBlog.mock.calls[0][0].url).toBe('Test url')
})