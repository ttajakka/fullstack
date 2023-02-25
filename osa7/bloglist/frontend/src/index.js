import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit'
import App from './App'

import infoReducer from './reducers/infoReducer'
import blogsReducer from './reducers/blogsReducer'

const store = configureStore({
  reducer: {
    info: infoReducer,
    blogs: blogsReducer
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
