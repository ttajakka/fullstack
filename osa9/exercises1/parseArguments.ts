const parseArguments = (): number[] => {
  const len = process.argv.length;
  if (len < 3) return [];

  const args = [];
  let n = 0;
  for (let i = 2; i < len; i++) {
    n = Number(process.argv[i]);
    if (isNaN(n)) throw new Error("All arguments must be numbers");
    args.push(n);
  }

  return args;
};

export default parseArguments;
