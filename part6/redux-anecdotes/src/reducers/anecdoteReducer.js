import { createSlice } from '@reduxjs/toolkit'
import anecdotes from '../services/anecdotes'

const anecdotesAtStart = []

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = anecdotesAtStart.map(asObject)

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    addAnecdote(state, action) {
      return state.concat(action.payload)
    },
    addVote(state, action) {
      const anecdoteToChange = action.payload

      return state.map((anecdote) =>
        anecdote.id === anecdoteToChange.id ? anecdoteToChange : anecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})
export const initialAnecdotes = () => {
  return async (dispatch) => {
    const initialAnecdotes = await anecdotes.getAll()
    dispatch(setAnecdotes(initialAnecdotes))
  }
}
export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotes.create(content)
    dispatch(addAnecdote(newAnecdote))
  }
}
export const incrementVotes = (content) => {
  return async (dispatch) => {
    const incrementedAnecdote = await anecdotes.put(content)

    dispatch(addVote(incrementedAnecdote))
  }
}

export const { addVote, addAnecdote, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
