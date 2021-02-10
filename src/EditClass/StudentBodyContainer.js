import RosterContainer from '../Recyclables/Roster/RosterContainer';
import React from 'react';

const StudentBodyContainer = ({students, callback}) => {
return(
        <div>
        <RosterContainer callback={callback} students={students}/>
        </div>
    ) 
}
export default StudentBodyContainer;
