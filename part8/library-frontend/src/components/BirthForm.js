import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import { UPDATE_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from '../queries'
const BirthForm = (props) => {
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: (error) => {
      console.log(error)
    },
  })
  const [name, setName] = useState(null)
  const [year, setYear] = useState('')
  const submit = async (event) => {
    event.preventDefault()
    updateAuthor({
      variables: { name: name.value, year: year },
    })
    setName('')
    setYear('')
  }

  if (!props.show) {
    return null
  }
  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <Select
          defaultValue="select an author"
          onChange={setName}
          options={props.authors.data.allAuthors.map((author) => {
            return { value: author.name, label: author.name }
          })}
        />
        <br />
        born
        <input
          value={year}
          onChange={({ target }) => setYear(Number(target.value))}
        />
        <br />
        <button type="submit">update author</button>
      </form>
    </div>
  )
}
export default BirthForm
