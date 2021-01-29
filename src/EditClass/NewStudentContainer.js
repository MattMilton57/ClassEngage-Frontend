import NewStudentForm from '../Forms/NewStudent';
import React from 'react';

const NewStudentContainer = ({callback}) => {
return(
    <div name="NewStudentContainer" id='newStudent'>
        <div>
        <NewStudentForm callback={callback}/>
        </div>
    </div>
) 
}
export default NewStudentContainer;