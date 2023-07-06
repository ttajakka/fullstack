interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartDescription extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartDescription {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartDescription {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartDescription {
  requirements: string[];
  kind: "special";
}

type CoursePart = CoursePartBasic | CoursePartGroup | CoursePartBackground | CoursePartSpecial;

type CourseParts = {
  parts: CoursePart[];
};

const Header = ({ name }: { name: string; }): JSX.Element => {
  return (
    <h1>{name}</h1>
  );
};

const Part = (props: CoursePart): JSX.Element => {

  switch (props.kind) {
    case ('basic'):
      return (
        <div>
          <div><strong>{props.name} {props.exerciseCount}</strong></div>
          <div><em>{props.description}</em></div>
          <br />
        </div>
      );
    case ('group'):
      return (
        <div>
          <div><strong>{props.name} {props.exerciseCount}</strong></div>
          <div>project exercises {props.groupProjectCount}</div>
          <br />
        </div>
      );
    case ('background'):
      return (
        <div>
          <div><strong>{props.name} {props.exerciseCount}</strong></div>
          <div><em>{props.description}</em></div>
          <div>{props.backgroundMaterial}</div>
          <br />
        </div>
      );
    case ("special"): {
      const reqstring = "required skills: " + props.requirements.join(', ');
      // props.requirements.forEach(r => {
      //   reqstring += " " + r;
      // });
      return (
        <div>
          <div><strong>{props.name} {props.exerciseCount}</strong></div>
          <div><em>{props.description}</em></div>
          <div>{reqstring}</div>
          <br />
        </div>
      );
    }
  }
};

const Content = (props: CourseParts): JSX.Element => {
  const parts = props.parts;
  // return (<div>{parts.map(part =>
  //   <p key={part.name}>{part.name} {part.exerciseCount}</p>
  // )}</div>);


  return (<div>{parts.map(part =>
    <Part key={part.name} {...part} />
  )}</div>);
};

const Total = (props: CourseParts): JSX.Element => {
  return (<div>
    Number of exercises{" "}
    {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
  </div>);
};

const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part",
      kind: "basic"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      kind: "group"
    },
    {
      name: "Basics of type Narrowing",
      exerciseCount: 7,
      description: "How to go from unknown to string",
      kind: "basic"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      backgroundMaterial: "https://type-level-typescript.com/template-literal-types",
      kind: "background"
    },
    {
      name: "TypeScript in frontend",
      exerciseCount: 10,
      description: "a hard part",
      kind: "basic",
    },
    {
      name: "Backend development",
      exerciseCount: 21,
      description: "Typing the backend",
      requirements: ["nodejs", "jest"],
      kind: "special"
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
