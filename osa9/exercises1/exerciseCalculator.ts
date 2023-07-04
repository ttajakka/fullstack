import parseArguments from "./parseArguments";

export interface ExerciseData {
  target: number;
  dailyExercises: number[];
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const getExerciseData = (): ExerciseData => {
  const args = parseArguments();
  if (!args || args.length < 2)
    throw new Error("Must provide at least two arguments");

  if (args[0] <= 0) throw new Error("First argument (target) must be positive");

  if (Math.max(...args) > 24)
    throw new Error("All arguments must be at most 24 (hours)");

  const target = args[0];
  args.shift();
  const dailyExercises = args;

  return {
    target,
    dailyExercises,
  };
};

export const calculateExercises = (data: ExerciseData): Result => {
  const { target, dailyExercises } = data;

  const periodLength = dailyExercises.length;
  const trainingDays = dailyExercises.filter((e) => e > 0).length;
  const totalExercise = dailyExercises.reduce((sum, n) => sum + n, 0);
  const average = totalExercise / periodLength;
  const success = average < target ? false : true;

  const rating = average >= target ? 3 : average >= 0.6 * target ? 2 : 1;

  const ratingDescription =
    rating === 3
      ? "You reached your target!"
      : rating === 2
      ? "You were close to reaching your target"
      : "You were far from your target";

  return {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average,
  };
};

// try {
//   console.log(calculateExercises(getExerciseData()));
// } catch (error: unknown) {
//   let errorMessage = "Something went wrong.";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }

// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1]));
