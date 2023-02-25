import { createSlice } from '@reduxjs/toolkit'

const initialState = { message: null }

const infoSlice = createSlice({
  name: 'info',
  initialState,
  reducers: {
    setInfo(state, action) {
      return action.payload
    }
  }
})

export const { setInfo } = infoSlice.actions

let timetoutID = 0

export const notifyWith = (message, type='info', time=3) => {
  return dispatch => {
    clearTimeout(timetoutID)
    dispatch(setInfo({ message: message, type: type }))
    timetoutID = setTimeout(() => {
      dispatch(setInfo({ message: null }))
    }, 1000*time)
  }
}

export default infoSlice.reducer