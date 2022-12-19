import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    set(state, action) {
      return action.payload
    },
    remove(state, action) {
      return null
    }
  }
})

export const { set, remove } = notificationSlice.actions

let timeoutID = 0

export const setNotification = (content, time) => {
  return dispatch => {
    clearTimeout(timeoutID)
    dispatch(set(content))
    timeoutID = setTimeout(() => {
      dispatch(remove())
    }, 1000*time)
  }
}

export default notificationSlice.reducer