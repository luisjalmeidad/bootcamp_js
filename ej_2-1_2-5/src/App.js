import "./styles.css";

const Course = ({ course }) => {
  return (
    <>
      {course.map((element, index) => {
        console.log(element.name);
        return (
          <>
            <Header key={element.id} title={element.name} />
            <ol>
              <Content parts={element.parts} />
            </ol>
            <Total parts={element.parts} />
          </>
        );
      })}
    </>
  );
};

const Header = ({ title }) => {
  return <h1>{title}</h1>;
};

const Content = ({ parts }) => {
  return (
    <>
      {parts.map((element, index) => {
        return (
          <li key={index}>
            {element.name}: {element.exercises}
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
  const course = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2
        }
      ]
    }
  ];

  return (
    <div className="App">
      <Course course={course} />
    </div>
  );
}
