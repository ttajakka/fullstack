import parseArguments from "./parseArguments";

interface InputValues {
  height: number;
  weight: number;
}

export const getHeightAndWeight = (): InputValues => {
  const args = parseArguments();
  if (args.length !== 2)
    throw new Error("Must provide two arguments: height (cm) and weight (kg)");

  const height = args[0];
  const weight = args[1];

  if (height > 300)
    throw new Error("First argument (height) cannot exceed 300 (cm)");
  if (weight > 600)
    throw new Error("Second argument (weight) cannot exceed 600 (kg)");

  return {
    height,
    weight,
  };
};

export const calculcateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  if (bmi < 18.5) {
    return "Underweight";
  } else if (bmi < 25) {
    return "Normal (healthy range)";
  } else if (bmi < 30) {
    return "Overweight";
  } else {
    return "Obese";
  }
};

// try {
//   const { height, weight } = getHeightAndWeight();
//   console.log(calculcateBmi(height, weight));
// } catch (error: unknown) {
//   let errorMessage = "Something went wrong.";
//   if (error instanceof Error) {
//     errorMessage += " Error: " + error.message;
//   }
//   console.log(errorMessage);
// }
