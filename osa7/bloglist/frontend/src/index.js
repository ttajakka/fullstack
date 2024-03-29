import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'

import infoReducer from './reducers/infoReducer'
import blogsReducer from './reducers/blogsReducer'
import userReducer from './reducers/userReducer'
import userlistReducer from './reducers/userlistReducer'

const store = configureStore({
  reducer: {
    info: infoReducer,
    blogs: blogsReducer,
    user: userReducer,
    userlist: userlistReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
