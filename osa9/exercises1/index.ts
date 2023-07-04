import express from 'express';
import { calculcateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

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

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body = req.body;
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  const keys = Object.keys(body);
  if (keys.length === 0) {
    return res.status(400).send({ error: 'parameters missing' });
  }

  if (keys.length > 2) {
    return res.status(400).send({ error: "malformatted parameters"});
  }

  if (keys.length === 1) {
    if (keys[0] === "target") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      const target = Number(body["target"]);
      if (isNaN(target) || target <= 0 || target > 24) {
        return res.status(400).send({ error: "malformatted parameters" });
      } else {
        return res.status(400).send({ error: "parameters missing" });
      }
    } else if (keys[0] === "daily_exercises") {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      const dailyExCand = body["daily_exercises"];
      if (!(dailyExCand instanceof Array)) {
        return res.status(400).send({ error: 'malformatted parameters' });
      } 
      const dailyExercises = dailyExCand.map(d => Number(d));
      if (!isArrayOfHours(dailyExercises)) {
        return res.status(400).send({ error: "malformatted parameters" });
      } else {
        return res.status(400).send({ error: "parameters missing" });
      }
    } else {
      return res.status(400).send({ error: "malformatter parameters" });
    }
  }

  let target = 0;
  let dailyExercises: number[] = [];

  if (
    (keys[0] === "target" && keys[1] === "daily_exercises") ||
    (keys[1] === "target" && keys[0] === "daily_exercises")
  ) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    target = Number(body["target"]);
    if (isNaN(target) || target <= 0 || target > 24) {
      res.status(400);
      return res.status(400).send({ error: "malformatted parameters" });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment
    const dailyExCand = body["daily_exercises"];
    if (!(dailyExCand instanceof Array)) {
      return res.status(400).send({ error: 'malformatted parameters' });
    }
    dailyExercises = dailyExCand.map(d => Number(d));
    if (!isArrayOfHours(dailyExercises)) {
      return res.status(400).send({ error: "malformatted parameters" });
    }
  } else {
    return res.status(400).send({ error: "malformatted parameters" });
  }

  const result = calculateExercises({ target, dailyExercises });
  return res.status(200).send(result);
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

const isArrayOfHours = (array: number[]) => {
  let good = true;
  array.forEach(a => {
    if (isNaN(a) || a < 0 || a > 24) {
      good = false;
    }
  });
  return good;
};
