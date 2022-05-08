import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { UPDATE_AUTHOR, ALL_AUTHORS, ALL_BOOKS } from '../queries'
const BirthForm = (props) => {
  const [updateAuthor] = useMutation(UPDATE_AUTHOR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
    onError: (error) => {
      console.log(error)
    },
  })
  const [name, setName] = useState('')
  const [year, setYear] = useState('')
  const submit = async (event) => {
    event.preventDefault()

    updateAuthor({
      variables: { name: name, year: year },
    })
    setName('')
    setYear('')
  }
  return (
    <div>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        name{' '}
        <input value={name} onChange={({ target }) => setName(target.value)} />{' '}
        <br />
        born{' '}
        <input
          value={year}
          onChange={({ target }) => setYear(Number(target.value))}
        />{' '}
        <br />
        <button type="submit">update author</button>
      </form>
    </div>
  )
}
export default BirthForm
