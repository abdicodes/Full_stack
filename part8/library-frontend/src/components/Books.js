import { useState, useEffect } from 'react'
import { ALL_BOOKS, GENRE } from '../queries'
import { useLazyQuery, useQuery } from '@apollo/client'
const Books = (props) => {
  const [genre, setGenre] = useState(null)
  // const [books, setBooks] = useState(null)
  const [filteredBooks, setFilteredBooks] = useState([])
  const genres = useQuery(GENRE)
  const [booksReq, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    booksReq()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   if (!genre) return
  //   books({ variables: { genre: genre } })
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [genre])

  const addGenre = async (event) => {
    console.log(event.target.value)

    booksReq({ variables: { genre: event.target.value } })
  }

  // let unique = [
  //   ...new Set(props.books.data.allBooks.map((item) => item.genres).flat()),
  // ]
  // let filteredBooks =
  //   genre === null
  //     ? props.books.data.allBooks
  //     : props.books.data.allBooks.filter((book) => book.genres.includes(genre))

  if (!props.show) {
    return null
  }
  if (result.loading || genres.loading) {
    return <div>loading...</div>
  }
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
          {result.data.allBooks.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {genres.data.genres.map((a, i) => (
        <button key={i} value={a} onClick={addGenre}>
          {a}
        </button>
      ))}
      <button value="all" onClick={addGenre}>
        all Genres
      </button>
    </div>
  )
}

export default Books
