import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null }

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setInfo(state, action) {
      return action.payload
    },
  },
})

export const { setInfo } = infoSlice.actions

const DEFAULT_TIMEOUT_LENGTH = 1 // in seconds
let timetoutID = 0

export const notifyWith = (
  message,
  type = 'info',
  time = DEFAULT_TIMEOUT_LENGTH
) => {
  return dispatch => {
    clearTimeout(timetoutID)
    dispatch(setInfo({ message: message, type: type }))
    timetoutID = setTimeout(() => {
      dispatch(setInfo({ message: null }))
    }, 1000 * time)
  }
}

export default infoSlice.reducer
