import 'rbx/index.css';
import {Button, Container, Title} from 'rbx';
import React, {useState, useEffect} from 'react';
import firebase from 'firebase/app'
import 'firebase/database'

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
// const schedule = {
//   "title": "CS courses for 2019 Fall",
//   "courses":[
//     {
//       "id": "F:CS497",
//       "title": "Rapid Prototype",
//       "meets": "MWF 13:00-13:50"
//     },
//     {
//       "id": "F:CS325",
//       "title": "AI Programming",
//       "meets": "MWF 11:00-11:50"
//     },
//     {
//       "id": "F:EE475",
//       "title": "ML",
//       "meets": "M 17:00-19:50"
//     },
//     {
//       "id": "F:EE332",
//       "title": "Computer Vision",
//       "meets": "MWF 13:00-13:50"
//     }
//   ]
// };
//firebase
const firebaseConfig = {
  apiKey: "AIzaSyDxqNgiG7wkpDLRo-Ja74GETEwQYDfJgRQ",
  authDomain: "...",
  databaseURL: "https://nu-cs497-quickreact.firebaseio.com/",
  projectId: "...",
  storageBucket: "....",
  messagingSenderId: "...",
  appId: "..."
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database().ref();

const terms = {F:'Fall', W: "Winter", S: "Spring"};
const days = ['M', 'Tu', 'W', 'Th', 'F'];
const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;

//function 
const getCourseTerm = course => (terms[course.id.charAt(0)]);
const getCourseNum = course => (course.id.slice(1,4));
// const getCourseDept = course => (course.id.slice(2,4));
const buttonColor = selected => (selected ? 'button is-success is-selected': 'button');
const useSelection = () =>
{
  const [selected, setSelected] = useState([]);
  const toggle = (x) =>
    {setSelected(selected.includes(x) ? selected.filter(y=>y !== x) : [x].concat(selected))};
  return [selected, toggle];
};
const daysOverlap = (days1, days2) => (
  days.some(day => days1.includes(day) && days2.includes(day))
);
const hoursOverlap = (hours1, hours2) => (
  Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end)
);
const timeConflict = (course1, course2) => (
  daysOverlap(course1.days, course2.days) && hoursOverlap(course1.hours, course2.hours)
);
const courseConflict = (course1, course2) => (
  course1 !== course2 && getCourseTerm(course1) === getCourseTerm(course2) && timeConflict(course1, course2)
);
const hasConflict = (course, selected) =>(
  selected.some(selection => courseConflict(course, selection))
);
const moveCourse = course => {
  const meets = prompt('Enter new meeting data, in this format:', course.meets);
  if (!meets) return;
  const {days} = timeParts(meets);
  if (days) saveCourse(course, meets);
  else moveCourse(course);
};
const saveCourse = (course, meets) => {
  db.child("courses").child(course.id).update({meets}).catch(error => alert(error));
};


//component
const Banner = ({title}) => (
  <Title>{ title || '[loading...]' }</Title>
);
const CourseList = ({courses}) => {
  const [term, setTerm] = useState('Fall');
  const [selected, toggle] = useSelection();
  const termCourses = courses.filter(course => term === getCourseTerm(course));
return(
  <React.Fragment>
    <TermSelector state={{term, setTerm}}/>
  <div className="buttons">
    { termCourses.map(course => <Course key={course.id} course={course} state={{selected, toggle}} />) } 
  </div>
  </React.Fragment>
);
};
const Course = ({course, state}) => (
  <Button color={buttonColor(state.selected.includes(course))} 
  onClick={()=>state.toggle(course)}
  onDoubleClick={()=>moveCourse(course)}
  disabled={hasConflict(course, state.selected)}
  >
    {getCourseTerm(course)} CS {getCourseNum(course)}: {course.title}
  </Button>
);
const TermSelector = ({state}) =>  (
    <div className = "field has-addons">
      {Object.values(terms).map(value => 
      <button key={value} className={buttonColor(value===state.term)} onClick={()=>state.setTerm(value)}> 
        {value} 
      </button>)}
    </div> 
);

const timeParts = meets => {
  const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
  return !match ? {} : {
    days,
    hours: {
      start: hh1 * 60 + mm1 * 1,
      end: hh2 * 60 + mm2 * 1
    }
  };
};
const addCourseTimes = course => ({
  ...course,
  ...timeParts(course.meets)
});
const addScheduleTimes = schedule => ({
  title: schedule.title,
  courses: Object.values(schedule.courses).map(addCourseTimes)
});


// App
const App = () => {
  const [schedule, setSchedule] = useState ({title: '', courses: []});
  // const url = 'https://courses.cs.northwestern.edu/394/data/cs-courses.php';
  useEffect ( () => {
    // const fetchSchedule = async ( )=> {
    //   const response = await fetch(url);
    //   if (!response.ok) throw response;
    //   const json = await response.json();
    //   setSchedule(addScheduleTimes(json));
    // }
    //   fetchSchedule();
    const handleData = snap => {
      if (snap.val()) setSchedule(addScheduleTimes(snap.val()));
    }
    db.on('value', handleData, error => alert(error));
    return () => {db.off('value', handleData);};
    }, []
  );
  
  return(
    <div className="container">
      <Banner title = {schedule.title} />
      <CourseList courses = {schedule.courses} /> 
    </div>
  );
};



export default App;




