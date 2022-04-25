import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('<NoteForm /> updates parent state and calls onSubmit', () => {
  const createNote = jest.fn()

  render(<BlogForm createBlog={createNote} />)

  const titleInput = screen.getByPlaceholderText('title')

  userEvent.type(titleInput, 'testing title...')

  const authorInput = screen.getByPlaceholderText('author')

  userEvent.type(authorInput, 'testing author...')

  const urlInput = screen.getByPlaceholderText('url')

  userEvent.type(urlInput, 'testing url...')

  const sendButton = screen.getByText('create')

  userEvent.click(sendButton)

  expect(createNote.mock.calls).toHaveLength(1)
  expect(createNote.mock.calls[0][0].title).toBe('testing title...')
  expect(createNote.mock.calls[0][0].author).toBe('testing author...')
  expect(createNote.mock.calls[0][0].url).toBe('testing url...')
})
