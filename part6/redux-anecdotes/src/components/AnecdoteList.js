import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { addNotification, addTimeOut } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)

  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(addNotification(anecdote.content))
    setTimeout(() => dispatch(addTimeOut()), 5000)
  }

  return (
    <div>
      {anecdotes
        .map((a) => a)
        .sort((a, b) => b.votes - a.votes)
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}
export default AnecdoteList
