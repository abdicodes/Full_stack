import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { addNotification, addTimeOut } from '../reducers/notificationReducer'
import anecdotes from '../services/anecdotes'
const AnecdoteList = () => {
  const anecdoteList = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  const dispatch = useDispatch()
  const vote = async (anecdote) => {
    await anecdotes.put(anecdote.id, anecdote)

    dispatch(addVote(anecdote.id))

    dispatch(addNotification(`You have voted for ${anecdote.content} `))
    setTimeout(() => dispatch(addTimeOut()), 5000)
  }
  console.log(filter)
  console.log(anecdoteList)

  return (
    <div>
      {filter
        ? anecdoteList
            .filter((a) => a.content.includes(filter))
            .sort((a, b) => b.votes - a.votes)
            .map((anecdote) => (
              <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote)}>vote</button>
                </div>
              </div>
            ))
        : anecdoteList
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
