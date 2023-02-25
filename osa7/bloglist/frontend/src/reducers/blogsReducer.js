import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

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
    }
  }
})

export const { setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    await blogService.remove(blog.id)
    dispatch(setBlogs(blogs.filter(b => b.id !== blog.id)))
  }
}

export default blogSlice.reducer