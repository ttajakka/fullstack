interface CoursePart {
  name: string;
  exerciseCount: number;
}

type CourseParts = {
  parts: CoursePart[]
}

const Header = ({ name }: { name: string}): JSX.Element => {
  return (
    <h1>{name}</h1>
  )
}

const Content = (props: CourseParts): JSX.Element => {
  const parts = props.parts;
 return (<div>{parts.map(part => 
    <p key={part.name}>{part.name} {part.exerciseCount}</p>
  )}</div>)
};

const Total = (props: CourseParts): JSX.Element => {
  return (<p>
    Number of exercises{" "}
    {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </p>)
}

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts}/>
    </div>
  );
};

export default App;
