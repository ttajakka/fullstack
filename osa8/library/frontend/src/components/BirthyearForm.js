import { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'
import { EDIT_BIRTHYEAR, ALL_AUTHORS, ALL_BOOKS } from '../queries'

const BirthyearForm = ({ show, authors }) => {
  const [changeYear] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [{ query: ALL_AUTHORS }, { query: ALL_BOOKS }],
  })

  const [selectedAuthor, setSelectedAuthor] = useState(null)
  const [year, setYear] = useState('')

  const options = authors.map(a => ({ value: a.name, label: a.name }))

  const submit = event => {
    event.preventDefault()

    const name = selectedAuthor.value
    changeYear({ variables: { name, year: parseInt(year) } })

    setYear('')
  }

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>Set birthyear</h2>
      <form>
        <Select
          defaultValue={selectedAuthor}
          onChange={setSelectedAuthor}
          options={options}
        />
        <div>
          born{' '}
          <input
            type="number"
            value={year}
            onChange={({ target }) => setYear(target.value)}
          />
        </div>
        <button onClick={submit}>update author</button>
      </form>
    </div>
  )
}

export default BirthyearForm
