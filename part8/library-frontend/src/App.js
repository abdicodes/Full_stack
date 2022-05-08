import { useState } from 'react'

import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useApolloClient } from '@apollo/client'
import BirthForm from './components/BirthForm'
import LoginForm from './components/LoginForm'

const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const logout = async () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }
  console.log(page)
  if (authors.loading) {
    return <div>loading...</div>
  }
  console.log(token)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && (
          <div>
            {' '}
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}> logout</button>{' '}
          </div>
        )}
      </div>

      <Authors show={page === 'authors'} authors={authors} />

      <Books show={page === 'books'} books={books} />

      <NewBook show={page === 'add'} />

      <BirthForm show={page === 'authors' && token} authors={authors} />
      <LoginForm show={page === 'login'} setToken={setToken} />
    </div>
  )
}

export default App
