import { useQuery } from '@apollo/client'
import { ALL_AUTHORS } from '../queries'
const Authors = (props) => {
  if (!props.show) {
    return null
  }
  // const authors = []
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const result = useQuery(ALL_AUTHORS)

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {result.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
