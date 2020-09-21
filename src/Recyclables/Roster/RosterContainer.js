import React from 'react';
import  Student from './Student';

const RosterContainer = ({students, callback}) => {    

return(
    <div id='Roster'>
        <div>
            {students.map(student => <div><Student callback={callback} student={student}/></div>)}
        </div>
    </div>
) 
}
export default RosterContainer;