/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { calcExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {

  if( isNaN(Number(req.query.height)) || isNaN(Number(req.query.weight)) ) {
    res.status(400).json({
      error: 'malformed parameters'
    });
  }
  
  const data: string[] = [
    String(req.query.height),
    String(req.query.weight)
  ];

  res.send({
    weight: req.query.weight,
    height: req.query.height,
    bmi: calculateBmi(data)
  });
});

app.post('/exercises', (req, res) => {

  const {daily_exercises, target} = req.body;

  if( !daily_exercises || !target ) {
    res.status(400).json({
      error: 'parameters missing'
    });
  } else if ( daily_exercises.find( (d: number) => isNaN(d) ) ) {
    res.status(400).json({
      error: 'malfomatted parameters'
    });
  }

  res.send(calcExercises(daily_exercises, target));
});

const PORT = 3001;

app.listen(PORT, () => {
  console.log(`Server running in ${PORT}`);
});