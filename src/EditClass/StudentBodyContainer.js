import RosterContainer from '../Recyclables/Roster/RosterContainer';
import React from 'react';

const StudentBodyContainer = ({students, callback}) => {
return(
    <div id='Roster'>
        <h1>Current Hogwarts Students</h1>
        <div>
        <RosterContainer callback={callback} students={students}/>
        </div>
    </div>
) 
}
export default StudentBodyContainer;
