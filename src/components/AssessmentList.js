import React from 'react';
import  Assessment from '../components/Assessment';


const AssessmentList = ({thisStudent, assessments}) => {  
    
    const filterAssessments = () => {
        if (assessments ===''){
            return(<div>No scores yet</div>)
        }else{
            return(
        assessments.map(assessment => {if(assessment.student_id == thisStudent.id) return(<Assessment assessment={assessment} score={assessment.participating}/>)})
             ) }}


    return(
    <div id='assessment-list'>
        <div>
                {filterAssessments()}
        </div>
    </div>
    )
    
}
export default AssessmentList;