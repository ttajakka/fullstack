import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const initialState = []

const userlistSlice = createSlice({
  name: 'userlist',
  initialState,
  reducers: {
    setUserlist(state, action) {
      return action.payload
    },
  },
})

export const { setUserlist } = userlistSlice.actions

export const initializeUserlist = () => {
  return async dispatch => {
    const userlist = await userService.getAll()
    dispatch(setUserlist(userlist))
  }
}

export default userlistSlice.reducer
