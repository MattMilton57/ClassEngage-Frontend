import React from 'react';

const StudentScore = ({student, assessments}) => {

    const findAScore = () => {
        let studentAssessments=[]
            assessments.map(assessment =>{if(assessment.student_id===student.id) studentAssessments.push(assessment)})
        let positiveAssessments = []
            studentAssessments.map(assessment =>{if(assessment.participating===true)positiveAssessments.push(assessment)})
        let all = studentAssessments.length
        let yes = positiveAssessments.length
        let totalScore = ((yes/all))
        if (all > 0){
            return (totalScore*100).toFixed(0)+"%"
        }else{
            return("--")
        }
    }

    return(
        <div>
            {findAScore()}
        </div>  
    ) 
}
export default StudentScore;