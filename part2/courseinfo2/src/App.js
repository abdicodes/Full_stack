import React from "react";
const Header = (props) => {
  return <h1 key={props.id}>{props.courseName}</h1>;
};
const Part = (props) => {
  return (
    <p key={props.id}>
      {props.name} {props.exercises}
    </p>
  );
};
const Content = (props) => {
  return (
    <div key={props.id}>
      {props.parts.map((content) => (
        <Part
          name={content.name}
          exercises={content.exercises}
          key={content.id}
        />
      ))}
    </div>
  );
};
const Course = (props) => {
  return props.course.map((course) => {
    return (
      <div key={course.id}>
        <Header courseName={course.name} id={course.id} />
        <Content parts={course.parts} id={course.id} />
        <Total parts={course.parts} id={course.id} />
      </div>
    );
  });
};
const Total = (props) => {
  // const sum = props.parts.map((e) => e.exercises);

  return (
    <p key={props.id}>
      <b>
        Number of exercises{" "}
        {props.parts.reduce((sum, e) => sum + e.exercises, 0)}
      </b>
    </p>
  );
};

const App = () => {
  const courses = [
    {
      name: "Half Stack application development",
      id: 1,
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },
        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  return <Course course={courses} id={courses.id} />;
};

export default App;
