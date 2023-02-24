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
export default infoSlice.reducer