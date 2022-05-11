import { useEffect } from 'react'
import { ALL_BOOKS, GENRE } from '../queries'
import { useLazyQuery, useQuery } from '@apollo/client'
const Books = (props) => {
  const genres = useQuery(GENRE)
  const [booksReq, result] = useLazyQuery(ALL_BOOKS)

  useEffect(() => {
    booksReq()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const addGenre = async (event) => {
    booksReq({ variables: { genre: event.target.value } })
    result.refetch({ genre: event.target.value })
  }

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
