import { useSelector, useDispatch } from 'react-redux'
import { incrementVotes } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdoteList = useSelector((state) => state.anecdotes)
  const filter = useSelector((state) => state.filter)

  const dispatch = useDispatch()
  const vote = (anecdote) => {
    dispatch(incrementVotes(anecdote))

    dispatch(voteNotification(anecdote.content, 5))
  }

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
