import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'me',
    likes: 5,
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText(
    'Component testing is done with react-testing-library'
  )

  expect(element).toBeDefined()
})

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'me',
    likes: 5,
  }

  const { container } = render(<Blog blog={blog} />)

  const div = container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
})
test('expect author and likes to not be rendered', () => {
  const blog = {
    title: 'the best blog',
    author: 'Future blogger',
    likes: 5,
  }
  render(<Blog blog={blog} />)
  const title = screen.queryByText('Future blogger')
  const likes = screen.queryByText(5)
  expect(title).toBeNull()
  expect(likes).toBeNull()
  screen.debug()
})
