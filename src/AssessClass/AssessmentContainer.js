import AssessmentCard from './AssessmentCard';
import React from 'react';

const AssessmentContainer = ({classRoster}) => {
    return(
        <div id='Roster'>
            <h1>Assessment Container</h1>
            <div>
                {classRoster.map(student => <AssessmentCard name={student.name}/>)}
            </div>
        </div>
    ) 
}
export default AssessmentContainer;

// const RosterContainer = ({students, callback}) => {    

//     return(
//         <div id='Roster'>
//             <div>
//                 {students.map(student => <div><Student callback={callback} student={student}/></div>)}
//             </div>
//         </div>
//     ) 
//     }
//     export default RosterContainer;