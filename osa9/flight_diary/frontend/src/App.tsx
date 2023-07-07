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
  let currentDate = new Date().toJSON().slice(0, 10);
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [newDate, setNewDate] = useState(currentDate);
  const [newVisibility, setNewVisibility] = useState('');
  const [newWeather, setNewWeather] = useState('');
  const [newComment, setNewComment] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    getAllDiaries().then(data =>
      setDiaries(data));
  }, []);

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
        setTimeout(() => {
          setErrorMessage('')
        }, 5000)
        ;
      });
  };

  const visibilityHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewVisibility(event.target.value)
  }

  const weatherHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewWeather(event.target.value)
  }

  return (
    <div>
      <h3>Add new entry</h3>
      <div style={{ color: "red" }}>{errorMessage}</div>
      <br />
      <form onSubmit={entryCreation}>
        

        <div>
          date: <input type='date' value={newDate} onChange={(event) => setNewDate(event.target.value)} />
        </div>

        <div>
         visibility:
         <input type="radio" name="visibility" value="great" onChange={visibilityHandler} /> great
         <input type="radio" name="visibility" value="good" onChange={visibilityHandler} /> good
         <input type="radio" name="visibility" value="ok" onChange={visibilityHandler} /> ok
         <input type="radio" name="visibility" value="poor" onChange={visibilityHandler} /> poor
        </div>
        
        <div>
         weather:
         <input type="radio" name="weather" value="sunny" onChange={weatherHandler} /> sunny
         <input type="radio" name="weather" value="rainy" onChange={weatherHandler} /> rainy
         <input type="radio" name="weather" value="cloudy" onChange={weatherHandler} /> cloudy
         <input type="radio" name="weather" value="windy" onChange={weatherHandler} /> windy
         <input type="radio" name="weather" value="stormy" onChange={weatherHandler} /> stormy
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
