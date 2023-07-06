import { useState, useEffect } from 'react';
import { getAllDiaries, createDiaryEntry } from './diaryService';
import { NonSensitiveDiaryEntry, Visibility, Weather } from '../../backend/src/types';

const Diary = (props: NonSensitiveDiaryEntry): JSX.Element => {
  return (<div>
    <h4>{props.date}</h4>
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
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllDiaries().then(data =>
      setDiaries(data));
  });

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const newEntry = {
      date: newDate,
      visibility: newVisibility as Visibility,
      weather: newWeather as Weather,
      comment: newComment
    };
    createDiaryEntry(newEntry)
      .then(data => {
        if (data) {
          setDiaries(diaries.concat(data));
        }
      })
      .catch(error => { 
        setErrorMessage(error.message)
      })
  };

  return (
    <div>
      <h3>Add new entry</h3>
      <div style={{ color: "red" }}>{errorMessage}</div>
      <br />
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
      <h3>Diary entries</h3>
      {diaries.map(d => <Diary key={d.id} {...d} />)}
    </div>
  );
};

export default App;
