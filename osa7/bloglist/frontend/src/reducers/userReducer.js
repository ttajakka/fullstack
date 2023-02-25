import { createSlice } from '@reduxjs/toolkit'
import storageService from '../services/storage'

const initialState = storageService.loadUser()

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
  },
})

export const { setUSer } = userSlice.actions

export default userSlice.reducer
