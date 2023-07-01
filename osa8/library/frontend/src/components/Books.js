import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
  const [genre, setGenre] = useState(null)

  const allBooks = useQuery(ALL_BOOKS)
  const booksInGenre = useQuery(ALL_BOOKS) //, { variables: { genre } })

  if (!show) {
    return null
  }

  const allGenres = allBooks.data.allBooks
    .map(b => b.genres)
    .flat()
    .filter((item, pos, self) => {
      return self.indexOf(item) === pos
    })

  if (booksInGenre.loading) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      {!genre ? (
        ' '
      ) : (
        <div>
          in genre <strong>{genre}</strong>
        </div>
      )}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {booksInGenre.data.allBooks.map(a => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        onClick={() => {
          setGenre(null)
          booksInGenre.refetch({ genre: null })
        }}
      >
        all genres
      </button>
      {allGenres.map(g => (
        <button
          key={g}
          onClick={() => {
            setGenre(g)
            booksInGenre.refetch({ genre: g })
          }}
        >
          {g}
        </button>
      ))}
    </div>
  )
}

export default Books
