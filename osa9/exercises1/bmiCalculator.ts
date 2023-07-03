const calculcateBmi = (height: number, weight: number): string => {
  const bmi = weight / (height / 100) ** 2;
  console.log(bmi);
  if (bmi < 18.5) {
    return "Abnormal (underweight range)";
  } else if (bmi < 25) {
    return "Normal (healthy range)";
  } else if (bmi < 30) {
    return "Abnormal (overweight range)";
  } else {
    return "Abnormal (obese range)";
  }
};

console.log(calculcateBmi(180, 74));
