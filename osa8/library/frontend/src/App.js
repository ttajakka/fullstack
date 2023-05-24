import { useState } from 'react'
import { useQuery } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import BirthyearForm from './components/BirthyearForm'
import { ALL_AUTHORS, ALL_BOOKS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  // if (page === 'authors' && authors.loading) {
  //   return <div>loading...</div>
  // }

  // if (page === 'books' && books.loading) {
  //   return <div>loading...</div>
  // }

  if (authors.loading || books.loading) {
    return <div>loading...</div>
  }

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('birthyear')}>set birthyear</button>
      </div>

      <Authors authors={authors.data.allAuthors} show={page === 'authors'} />

      <Books books={books.data.allBooks} show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <BirthyearForm show={page === 'birthyear'} authors={authors.data.allAuthors}/>
    </div>
  )
}

export default App
