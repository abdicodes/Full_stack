import { useState } from 'react'
const Books = (props) => {
  const [genre, setGenre] = useState(null)
  if (!props.show) {
    return null
  }

  const addGenre = async (event) => {
    setGenre(event.target.value)
  }
  let unique = [
    ...new Set(props.books.data.allBooks.map((item) => item.genres).flat()),
  ]
  let filteredBooks =
    genre === null
      ? props.books.data.allBooks
      : props.books.data.allBooks.filter((book) => book.genres.includes(genre))

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {filteredBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {unique.map((a, i) => (
        <button key={i} value={a} onClick={addGenre}>
          {' '}
          {a}{' '}
        </button>
      ))}
      <button value="all" onClick={() => setGenre(null)}>
        {' '}
        all Genres
      </button>
    </div>
  )
}

export default Books
