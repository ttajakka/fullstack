import express from 'express';
import { calculcateBmi } from './bmiCalculator';

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const q = req.query;
  let badPar = Object.keys(q).length !== 2 || !q.height || !q.weight;

  const height = Number(q.height);
  const weight = Number(q.weight);

  badPar = badPar || isNaN(height) || isNaN(weight);
  badPar = badPar || height < 0 || height > 300;
  badPar = badPar || weight < 0 || weight > 600;

  if (badPar) {
    res.status(400);
    res.send({ error: 'malformatted parameters' });
    return;
  }

  res.status(200);
  res.send({
    height,
    weight,
    bmi: calculcateBmi(Number(height), Number(weight)),
  });
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
