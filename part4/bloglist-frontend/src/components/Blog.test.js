import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

const blog = {
  title: 'the best blog',
  author: 'Future blogger',
  likes: 5,
  id: '625780e6bc56c91c48f2c7f5',
  user: '625780e6bc56c91c48f2c7f4',
}
const user = {
  name: 'Abdi',
  username: 'test',
  id: '625780e6bc56c91c48f2c7f4',
}
beforeEach(() => {})
test('expect author and likes to not be rendered', () => {
  render(<Blog blog={blog} />)
  const title = screen.queryByText('Future blogger')
  const likes = screen.queryByText('5')
  expect(title).toBeNull()
  expect(likes).toBeNull()
})
test('check if author and likes are rendered after view button click', async () => {
  const element = render(<Blog blog={blog} user={user} />)
  element.debug()
  const button = screen.getByText('view')
  userEvent.click(button)
  const title = screen.queryByText('Future blogger')
  const likes = screen.queryByText('5')
  expect(title).toBeDefined()
  expect(likes).toBeDefined()
})
