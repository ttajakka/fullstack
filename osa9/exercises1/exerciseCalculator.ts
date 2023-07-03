interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (dailyExercises: number[]): Result => {
  const TARGET = 2;

  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((e) => e > 0).length;
  const totalExercise = dailyExercises.reduce((sum, n) => sum + n, 0);
  const average = totalExercise / periodLength;
  const success = average < TARGET ? false : true;

  const rating = average >= TARGET ? 3 : average >= 0.6 * TARGET ? 2 : 1;

  const ratingDescription =
    rating === 3
      ? "You reached your target!"
      : rating === 2
      ? "You were close to reaching your target"
      : "You were far from your target"

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target: TARGET,
    average,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));