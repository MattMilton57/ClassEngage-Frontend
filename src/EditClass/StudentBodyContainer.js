import Roster from '../components/Roster';
import React from 'react';

const StudentBodyContainer = ({students, callback}) => {
return(
        <div>
        <Roster callback={callback} students={students}/>
        </div>
    ) 
}
export default StudentBodyContainer;
