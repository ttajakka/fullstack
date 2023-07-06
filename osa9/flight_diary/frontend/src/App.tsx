 import { useState, useEffect } from 'react';
import { getAllDiaries, createDiaryEntry } from './diaryService';
import { NonSensitiveDiaryEntry, Visibility, Weather } from '../../backend/src/types';

const Diary = (props: NonSensitiveDiaryEntry): JSX.Element => {
  return (<div>
    <h3>{props.date}</h3>
    <div>visibility: {props.visibility}</div>
    <div>weather: {props.weather}</div>
  </div>);
};

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [newDate, setNewDate] = useState('');
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    getAllDiaries().then(data =>
      setDiaries(data));
  });

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newEntry = { 
      date: newDate,
      visibility: newVisibility as Visibility,
      weather: newWeather as Weather,
      comment: newComment
    }
    createDiaryEntry(newEntry).then(data => {
      setDiaries(diaries.concat(data))
    })
  }

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={entryCreation}>
        <div>
        date<input value={newDate} onChange={(event) => setNewDate(event.target.value)} />
        </div>
        <div>
        visibility<input value={newVisibility} onChange={(event) => setNewVisibility(event.target.value)} />
        </div>
        <div>
        weather<input value={newWeather} onChange={(event) => setNewWeather(event.target.value)} />
        </div>
        <div>
        comment<input value={newComment} onChange={(event) => setNewComment(event.target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>
      <h2>Diary entries</h2>
      {diaries.map(d => <Diary key={d.id} {...d} />)}
    </div>
  );
};

export default App;
