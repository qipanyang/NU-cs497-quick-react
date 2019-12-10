import {Button} from 'rbx';
import React, {useState} from 'react';
import {db} from '../../db';
import {getCourseNum, getCourseTerm, hasConflict, timeParts} from './time';

export const buttonColor = selected => (selected ? 'button is-success is-selected': 'button');

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
  

const Course = ({course, state, user}) => (
    <Button 
    data-cy="course"
    color={buttonColor(state.selected.includes(course))} 
    onClick={()=>state.toggle(course)}
    onDoubleClick={user ? ()=>moveCourse(course) : null}
    disabled={hasConflict(course, state.selected)}
    >
      {getCourseTerm(course)} CS {getCourseNum(course)}: {course.title}
    </Button>
);

export default Course;

