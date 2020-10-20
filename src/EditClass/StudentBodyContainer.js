import RosterContainer from '../Recyclables/Roster/RosterContainer';
import React from 'react';

const StudentBodyContainer = ({students, callback}) => {
return(
    <div name="hat" id='Students'>
        <h1>Current Hogwarts Students</h1>
        <div>
        <RosterContainer callback={callback} students={students}/>
        </div>
    </div>
) 
}
export default StudentBodyContainer;
