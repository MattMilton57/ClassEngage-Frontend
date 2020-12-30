import React from 'react';
import { Link } from 'react-router-dom'
const Student = ({student, callback, linkTo, assessments, totalScore, showScore}) => {

const handleClick = (e) => {
    // totalScore(student)
    callback(e)
}

if (linkTo == true) {
    return(
        <div onClick={()=> handleClick(student)}>
            <Link to={'/studenthome'}>
                {student.name}
            </Link>
        </div>)
}else{
    return(
        <div onClick={()=> handleClick(student)}>
            <li key={student.id}>{student.name}</li>
        </div>  
    ) 
}


// return(
//         <div onClick={()=> handleClick(student)}>
//             <li key={student.id}>{student.name}</li>
//         </div>  
//     ) 
// }
}

export default Student;

// const filterAssessments = () => {
//     let studentAssessments = []
//     assessments.map(assessment => {if(assessment.student_id == student.id) studentAssessments.push(assessment)})
//     let positiveAssessments = []
//     studentAssessments.map(studentAssessment => {if(studentAssessment.participating == true) positiveAssessments.push(studentAssessment)})
//     let all = studentAssessments.length
//     let yes = positiveAssessments.length
//     let totalScore = ((yes/all)+'%')
//     console.log(all)
//     console.log(yes)
//     console.log(totalScore)
// }