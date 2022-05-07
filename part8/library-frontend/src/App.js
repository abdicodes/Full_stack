import { useState } from 'react'

import { ALL_AUTHORS, ALL_BOOKS } from './queries'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { useQuery } from '@apollo/client'

const App = () => {
  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const [page, setPage] = useState('authors')

  if (authors.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors show={page === 'authors'} authors={authors} />

      <Books show={page === 'books'} books={books} />

      <NewBook show={page === 'add'} />
    </div>
  )
}

export default App
