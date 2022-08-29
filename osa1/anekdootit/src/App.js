import { useState } from 'react'

const ShowPopular = ({ anecdotes, votes }) => {
  const max = Math.max(...votes)
  if (max === 0) return <p>no votes have been cast yet</p>
  
  return (
    <div>
      <p>{anecdotes[votes.indexOf(max)]}</p>
      <p>has {max} votes</p>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]

  const handleNext = () => { 
    while (true) {
      const id = Math.floor(Math.random()*anecdotes.length)
      if (id !== selected) { // show different anecdote each time
        setSelected(id)
        return
      }
    }
  }

  const handleVote = () => {
    const updateVotes = [...votes]
    updateVotes[selected] += 1
    setVotes(updateVotes)
  }
  
  
  const [selected, setSelected] = useState(0)
  
  const zeros = new Uint8Array(anecdotes.length)
  const [votes, setVotes] = useState(zeros)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <button onClick={handleVote}>vote</button>
      <button onClick={handleNext}>next anecdote</button>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>

      <h1>Anecdote with most votes</h1>
      <ShowPopular anecdotes={anecdotes} votes={votes}/>
    </div>
  )
}

export default App;
