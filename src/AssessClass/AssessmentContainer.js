import AssessmentCard from './AssessmentCard';
import React from 'react';

// const AssessmentContainer = ({classRoster, assessed, score, setScore}) => {


//     return(
//         <div id='Roster'>
//             <h1>Assessment Container</h1>
//             <div>
//                 {<AssessmentCard score ={score} setScore={setScore} student={classRoster} assessed={assessed}/>}

//                 {/* {classRoster.map(student => <AssessmentCard score ={score} setScore={setScore} student={student} assessed={assessed}/>)} */}
//             </div>
//         </div>
//     ) 
// }
// export default AssessmentContainer;

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

const AssessmentContainer = ({assessButton, classRoster, assessed, score, setScore}) => {

    const handleClick = (e) => {
        // e.preventDefault()
        assessButton(e)
        console.log('check')
    }    
    
        if (classRoster == '') {
            return(
                    <button onClick={(e) => handleClick(e)}> Click here to begin</button>
            )
        } else {
    
        return(
            <div id='Roster'>
                <h1>Assessment Container</h1>
                <div>
                    {<AssessmentCard score ={score} setScore={setScore} student={classRoster} assessed={assessed}/>}
    
                    {/* {classRoster.map(student => <AssessmentCard score ={score} setScore={setScore} student={student} assessed={assessed}/>)} */}
                </div>
            </div>
        ) }
    }
    export default AssessmentContainer;