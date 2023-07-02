import { useState } from 'react'
import { useApolloClient, useQuery, useSubscription } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BirthyearForm from './components/BirthyearForm'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'

import { ALL_AUTHORS, ALL_BOOKS, ME, BOOK_ADDED } from './queries'

export const updateCache = (cache, query, addedBook) => {
  // helper that is used to eliminate saving same person twice
  const uniqByName = (a) => {
    let seen = new Set()
    return a.filter((item) => {
      let k = item.title
      return seen.has(k) ? false : seen.add(k)
    })
  }

  cache.updateQuery(query, ({ allBooks }) => {
    return {
      allBooks: uniqByName(allBooks.concat(addedBook)),
    }
  })
}

const Notify = ({ message }) => {
  if (!message) {
    return null
  }
  return (
    <div style={{color: 'blue'}}>
      {message}
    </div>
  )
}

const App = () => {
  const [message, setMessage] = useState(null)
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)
  const user = useQuery(ME)

  useSubscription(BOOK_ADDED, {
    onData: ({ data }) => {
      const addedBook = data.data.bookAdded
      notify(`Added book ${addedBook.title}`)

      updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
    }
  })

  const client = useApolloClient()

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  if (authors.loading || books.loading || user.loading) {
    return <div>loading...</div>
  }

  const notify = (message) => {
    setMessage(message)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button
          onClick={() => setPage('login')}
          style={token !== null ? { display: 'none' } : null}
        >
          login
        </button>
        <button
          onClick={() => setPage('add')}
          style={token ? null : { display: 'none' }}
        >
          add book
        </button>
        <button
          onClick={() => {
            user.refetch()
            setPage('recommendations')
          }}
          style={token ? null : { display: 'none' }}
        >
          recommend
        </button>
        <button
          onClick={() => setPage('birthyear')}
          style={token ? null : { display: 'none' }}
        >
          set birthyear
        </button>
        <button onClick={logout} style={token ? null : { display: 'none' }}>
          logout
        </button>
      </div>

      <Notify message={message} />

      <Authors authors={authors.data.allAuthors} show={page === 'authors'} />

      <Books show={page === 'books'} />

      <LoginForm
        setPage={setPage}
        setToken={setToken}
        show={page === 'login'}
      />

      <NewBook show={page === 'add'} />

      <Recommendations
        genre={!user.data.me ? null : user.data.me.favoriteGenre}
        books={books.data.allBooks}
        show={page === 'recommendations'}
      />

      <BirthyearForm
        show={page === 'birthyear'}
        authors={authors.data.allAuthors}
      />
    </div>
  )
}

export default App
