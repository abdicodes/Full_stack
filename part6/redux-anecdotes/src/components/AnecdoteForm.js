import { useDispatch } from 'react-redux'
import { addAnecdote } from '../reducers/anecdoteReducer'
import anecdotes from '../services/anecdotes'
import { addNotification, addTimeOut } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const newAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    const response = await anecdotes.create(anecdote)
    console.log(response)
    dispatch(addAnecdote(response))
    dispatch(addNotification(`${anecdote} has been added!`))
    setTimeout(() => dispatch(addTimeOut()), 5000)
    event.target.anecdote.value = ''
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
export default AnecdoteForm
