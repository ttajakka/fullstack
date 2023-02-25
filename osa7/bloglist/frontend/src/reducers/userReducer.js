import { createSlice } from '@reduxjs/toolkit'
import storageService from '../services/storage'
import loginService from '../services/login'
import { notifyWith } from './infoReducer'

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

export const { setUser } = userSlice.actions

export const initializeUser = () => {
  return async dispatch => {
    dispatch(setUser(storageService.loadUser()))
  }
}

export const login = (username, password) => {
  return async dispatch => {
    try {
      const user = await loginService.login({ username, password })
      dispatch(setUser(user))
      storageService.saveUser(user)
      dispatch(notifyWith('welcome!'))
    } catch (e) {
      dispatch(notifyWith('wrong username or password', 'error'))
    }
  }
}

export const logout = () => {
  return dispatch => {
    storageService.removeUser()
    dispatch(setUser(null))
  }
}

export default userSlice.reducer
