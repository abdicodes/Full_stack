import { useState, useEffect } from 'react'

import { ALL_AUTHORS, ALL_BOOKS, ME } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery, useApolloClient } from '@apollo/client'
import BirthForm from './components/BirthForm'
import LoginForm from './components/LoginForm'
import Recommended from './components/Recommended'

const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const me = useQuery(ME)
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  useEffect(() => {
    if (localStorage) setToken(localStorage['library-user-token'])
  }, [])
  const logout = async () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  if (authors.loading || books.loading || me.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {!token && <button onClick={() => setPage('login')}>login</button>}
        {token && (
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={logout}> logout</button>
            <button onClick={() => setPage('recommended')}> recommended</button>
          </>
        )}
      </div>

      <Authors show={page === 'authors'} authors={authors} />

      <Books show={page === 'books'} books={books} />

      <NewBook show={page === 'add'} />

      <BirthForm show={page === 'authors' && token} authors={authors} />
      <LoginForm show={page === 'login'} setToken={setToken} />
      <Recommended
        show={page === 'recommended'}
        genre={me.data.me.favoriteGenre}
        books={books}
      />
    </div>
  )
}

export default App
