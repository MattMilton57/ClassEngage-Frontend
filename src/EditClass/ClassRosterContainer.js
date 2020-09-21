import RosterContainer from '../Recyclables/Roster/RosterContainer';
import React from 'react';

const ClassRosterContainer = ({students, callback}) => {
    return(
        <div id='Roster'>
            <h1>Class Roster</h1>
            <div>
            <RosterContainer callback={callback} students={students} />
            </div>
        </div>
    ) 
}
export default ClassRosterContainer;