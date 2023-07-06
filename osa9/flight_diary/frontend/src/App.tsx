import { useState, useEffect } from 'react';
import { getAllDiaries } from './diaryService';
import { NonSensitiveDiaryEntry } from '../../backend/src/types';

const Diary = (props: NonSensitiveDiaryEntry): JSX.Element => {
  return(<div>
    <h2>{props.date}</h2>
    <div>visibility: {props.visibility}</div>
    <div>weather: {props.weather}</div>
  </div>)
}

const App = () => {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([]);

  useEffect(() => {
    getAllDiaries().then(data => 
      setDiaries(data))
  })

  return (
    <div>
      <h1>Diary entries</h1>
      {diaries.map(d => <Diary key={d.id} {...d} />)}
    </div>
  );
}

export default App;
