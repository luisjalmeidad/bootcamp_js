import "./styles.css";

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((element, index) => {
        return (
          <li key={index}>
            {element.part}: {element.exercises}
          </li>
        );
      })}
    </>
  );
};

const Total = ({ parts }) => {
  return (
    <p>
      Number of exercises:{" "}
      {parts
        .map((item) => item.exercises)
        .reduce((prev, curr) => prev + curr, 0)}
    </p>
  );
};

export default function App() {
  const course = {
    name: "Half Stack application development",
    parts: [
      {
        part: "Fundamentals of React",
        exercises: 10
      },
      {
        part: "Using props to pass data",
        exercises: 7
      },
      {
        part: "State of a component",
        exercises: 14
      }
    ]
  };

  return (
    <div className="App">
      <Header title={course.name} />
      <ol>
        <Content parts={course.parts} />
      </ol>
      <Total parts={course.parts} />
    </div>
  );
}
