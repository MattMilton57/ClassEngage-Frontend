import React from 'react';
const Student = ({student, callback, assessments, totalScore, showScore}) => {

const handleClick = (e) => {
    // totalScore(student)
    callback(e)
}

return(
        <div onClick={()=> handleClick(student)}>
            <li key={student.id}>{student.name}</li>
        </div>  
    ) 
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