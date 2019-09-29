import React from 'react';
import logo from './logo.svg';
import './App.css';

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
  <h1>{props.title}</h1>
);
const CourseList = ({courses}) => (
  <div>
    { courses.map(course => <Course key={course.id} course={course} />) } 
  </div>
);
const Course = ({course}) => (
  <button>
    {getCourseTerm(course)} {getCourseDept(course)} {getCourseNum(course)}: {course.title}

  </button>
);



//function 
const getCourseTerm = course => (terms[course.id.charAt(0)]);
const getCourseNum = course => (course.id.slice(4,7));
const getCourseDept = course => (course.id.slice(2,4));


// App
const App = () => (
  <div> 
    <Banner title = {schedule.title} />
    <CourseList courses = {schedule.courses} /> 
  </div>
);

export default App;
