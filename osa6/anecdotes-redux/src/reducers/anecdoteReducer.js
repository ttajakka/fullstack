import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'
 
const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    appendAnecdote(state, action) {
      state.push(action.payload)
    },
    getAnecdote(state, action) {
      console.log(action.payload)
      const anecdote = state.find(a => a.id === action.payload)
      console.log({...anecdote})
      return {...anecdote}
    },
    updateAnecdote(state, action) {
      const id = action.payload.id
      return state.map(a => 
        a.id !== id ? a : action.payload
      ).sort(
        (a,b) => b.votes - a.votes
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { appendAnecdote, getAnecdote, updateAnecdote, setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }
}

export const vote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }
    await anecdoteService.update(updatedAnecdote)
    dispatch(updateAnecdote(updatedAnecdote))
  }
}

export default anecdoteSlice.reducer