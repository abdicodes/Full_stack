const Recommended = (props) => {
  const filteredBooks = props.books.data.allBooks.filter((book) =>
    book.genres.includes(props.genre)
  )

  if (!props.show) {
    return null
  }
  return (
    <>
      <div>
        <h1>Recommendations</h1>
        <p>
          books in your favorite genre
          <span style={{ fontWeight: 'bold' }}> {props.genre}</span>
        </p>
      </div>

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
    </>
  )
}

export default Recommended
