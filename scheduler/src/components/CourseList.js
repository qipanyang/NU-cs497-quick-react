import {Button} from 'rbx';
import React, {useState} from 'react';
import Course from './Course';
import {buttonColor} from './Course/Course';
import {getCourseTerm, terms} from './Course/time';




const CourseList = ({courses, user}) => {
    const [term, setTerm] = useState('Fall');
    const [selected, toggle] = useSelection();
    const termCourses = courses.filter(course => term === getCourseTerm(course));
  return(
    <React.Fragment>
      <TermSelector state={{term, setTerm}}/>
    <Button.Group>
      { termCourses.map(course => <Course key={course.id} course={course} state={{selected, toggle}} user={user}/>) } 
    </Button.Group>
    </React.Fragment>
  );
  };
  
  const TermSelector = ({state}) =>  (
      <div className = "field has-addons">
        {Object.values(terms).map(value => 
        <button 
        data-cy={value}
        key={value} className={buttonColor(value===state.term)} onClick={()=>state.setTerm(value)}> 
          {value} 
        </button>)}
      </div> 
  );

  

// const getCourseDept = course => (course.id.slice(2,4));
const useSelection = () =>
{
  const [selected, setSelected] = useState([]);
  const toggle = (x) =>
    {setSelected(selected.includes(x) ? selected.filter(y=>y !== x) : [x].concat(selected))};
  return [selected, toggle];
};




  export default CourseList;