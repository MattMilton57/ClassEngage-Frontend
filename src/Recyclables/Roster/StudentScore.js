import React from 'react';
const StudentScore = ({student, assessments, classPeriod, findscore}) => {

const handleClick = (e) => {}

const findAScore = () => {
    let studentAssessments=[]
    assessments.map(assessment =>{if(assessment.student_id===student.id) studentAssessments.push(assessment)})
    let positiveAssessments = []
    studentAssessments.map(assessment =>{if(assessment.participating===true)positiveAssessments.push(assessment)})
    let all = studentAssessments.length
    let yes = positiveAssessments.length
    let totalScore = ((yes/all))
    if (all > 0){
    return (totalScore*100)+"%"} else {return("No Score Yet")}
}

return(
        <div onClick={()=> handleClick(student)}>
            {findAScore()}
        </div>  
    ) 
}

export default StudentScore;