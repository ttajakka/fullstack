import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { notifyWith } from './infoReducer'

const initialState = []

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload
    },

    appendBlog(state, action) {
      state.push(action.payload)
    },

    deleteBlog(state, action) {
      return state.filter(b => b.id !== action.payload.id)
    }
  }
})

export const { setBlogs, appendBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`))
    dispatch(appendBlog(newBlog))
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      await blogService.remove(blog.id)
      dispatch(notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`))
      dispatch(deleteBlog(blog))
    }
  }
}

export default blogSlice.reducer