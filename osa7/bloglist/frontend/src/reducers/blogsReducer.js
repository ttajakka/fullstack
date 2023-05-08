import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { notifyWith } from './infoReducer'
import { initializeUserlist } from './userlistReducer'

const initialState = []

const byLikes = (b1, b2) => b2.likes - b1.likes

const blogSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    setBlogs(state, action) {
      return action.payload.sort(byLikes)
    },

    appendBlog(state, action) {
      state.push(action.payload)
    },

    updateBlog(state, action) {
      const id = action.payload.id
      return state.map(b => (b.id !== id ? b : action.payload)).sort(byLikes)
    },

    deleteBlog(state, action) {
      return state.filter(b => b.id !== action.payload.id)
    },
  },
})

export const { setBlogs, appendBlog, updateBlog, deleteBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = blog => {
  return async dispatch => {
    const newBlog = await blogService.create(blog)
    dispatch(
      notifyWith(`A new blog '${newBlog.title}' by '${newBlog.author}' added`)
    )
    dispatch(appendBlog(newBlog))
    dispatch(initializeUserlist())
  }
}

export const likeBlog = blog => {
  return async dispatch => {
    let updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id
    }
    updatedBlog = await blogService.update(updatedBlog)
    dispatch(updateBlog(updatedBlog))
  }
}

export const removeBlog = blog => {
  return async dispatch => {
    const ok = window.confirm(
      `Sure you want to remove '${blog.title}' by ${blog.author}`
    )
    if (ok) {
      await blogService.remove(blog.id)
      dispatch(
        notifyWith(`The blog' ${blog.title}' by '${blog.author} removed`)
      )
      dispatch(deleteBlog(blog))
      dispatch(initializeUserlist())
    }
  }
}

export default blogSlice.reducer
