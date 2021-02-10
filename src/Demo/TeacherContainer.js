import React from 'react';
import  Teacher from './Teacher';

const TeacherContainer = ({teachers, whoAmI}) => {
    return(
        <div id='Teacher'>
            {teachers.map( teacher => <div><Teacher name={teacher.name} id={teacher.id} whoAmI={whoAmI}/></div>)}
        </div>
        ) 
    }
export default TeacherContainer;
