import 'rbx/index.css';
import {Button, Container, Title, Message} from 'rbx';
import React, {useState, useEffect} from 'react';
import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth';
import StyleFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import CourseList from './components/CourseList';
import {db} from './db';
import {addScheduleTimes} from './components/Course/time';


// google authentication: project-quick_react

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

  const uiConfig = {
    signInFlow: 'popup',
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    callbacks:{
      signInSuccessWithAuthResult: () => false
    }
  };


//function 



//component
const Banner = ({title, user}) => (
  <React.Fragment>
    {user ? <Welcome user={user} /> : <SignIn /> }
  <Title>{ title || '[loading...]' }</Title>
  </React.Fragment>
);
const Welcome = ({user}) => (
  <Message color="info">
    <Message.Header>
      Welcome, {user.displayName}
      <Button primary onClick={() => firebase.auth().signOut()}>
        Logout
      </Button>
    </Message.Header>
  </Message>
);
const SignIn = () => (
  <StyleFirebaseAuth
    uiConfig={uiConfig}
    firebaseAuth={firebase.auth()}
  />
);




// App
const App = () => {
  const [schedule, setSchedule] = useState ({title: '', courses: []});
  const [user, setUser] = useState('qipanyang');
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
  useEffect(()=>{
    firebase.auth().onAuthStateChanged(setUser);
  }, []);
  
  return(
    <Container>
      <Banner title = {schedule.title} user={user}/>
      <CourseList courses = {schedule.courses} user={user}/> 
    </Container>
  );
};



export default App;




