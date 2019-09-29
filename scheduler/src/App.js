import React from 'react';
import 'rbx/index.css';
import {Button, Container, Title} from 'rbx';
// import logo from './logo.svg';
// import './App.css';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

//variables
const schedule = {
  "title": "CS courses for 2019 Fall",
  "courses":[
    {
      "id": "F:CS497",
      "title": "Rapid Prototype",
      "meets": "MWF 13:00-13:50"
    },
    {
      "id": "F:CS325",
      "title": "AI Programming",
      "meets": "MWF 11:00-11:50"
    },
    {
      "id": "F:EE475",
      "title": "ML",
      "meets": "M 17:00-19:50"
    },
    {
      "id": "F:EE332",
      "title": "Computer Vision",
      "meets": "MWF 13:00-13:50"
    }
  ]
};
const terms = {F:'Fall', W: "Winter", S: "Spring"};

//component
const Banner = props => (
  <Title>{props.title}</Title>
);
const CourseList = ({courses}) => (
  <Button.Group>
    { courses.map(course => <Course key={course.id} course={course} />) } 
  </Button.Group>
);
const Course = ({course}) => (
  // <div>
  <Button>
    {getCourseTerm(course)} {getCourseDept(course)} {getCourseNum(course)}: {course.title}
  </Button>
  //</div>
);



//function 
const getCourseTerm = course => (terms[course.id.charAt(0)]);
const getCourseNum = course => (course.id.slice(4,7));
const getCourseDept = course => (course.id.slice(2,4));


// App
const App = () => (
  <Container> 
  <div>
    <Banner title = {schedule.title} />
    <CourseList courses = {schedule.courses} /> 
  </div>
  </Container>
);

export default App;
