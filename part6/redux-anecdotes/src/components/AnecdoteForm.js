import { newAnecdoteNotification } from '../reducers/notificationReducer'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { connect } from 'react-redux'

const AnecdoteForm = ({ createAnecdote, newAnecdoteNotification }) => {
  const newAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value

    createAnecdote(anecdote)
    newAnecdoteNotification(anecdote, 3)
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
const mapDispatchToProps = {
  newAnecdoteNotification,
  createAnecdote,
}
export default connect(null, mapDispatchToProps)(AnecdoteForm)
