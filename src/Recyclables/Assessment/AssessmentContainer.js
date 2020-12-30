import React from 'react';
import  Assessment from './Assessment';


const AssessmentContainer = ({thisStudent, callback, score, assessments, classPeriod, linkTo}) => {  
    
    const filterAssessments = (id) => {
        // console.log(assessments)
        if (assessments ===''){
            return(<div>No scores yet</div>)
        }else{
            return(
        assessments.map(assessment => {if(assessment.student_id == thisStudent.id) return(<Assessment assessment={assessment} score={assessment.participating}/>)})
             ) }}


    return(
    <div id='Assessments'>
        <div>
                {filterAssessments()}
        </div>
    </div>
    )
    
}
export default AssessmentContainer;