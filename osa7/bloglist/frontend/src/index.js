import React from 'react'
import ReactDOM from 'react-dom/client'
//import { Provider } from 'react-redux'
//import { configureStore } from '@reduxjs/toolkit'
import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)

ReactDOM.createRoot(document.getElementById('root')).render(
  //<Provider>
    <App />
  //</Provider>
)
