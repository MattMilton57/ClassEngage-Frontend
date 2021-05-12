import React from 'react';
import  Assessment from '../components/Assessment';


const AssessmentList = ({thisStudent, thisClass, assessments}) => {  
    
    const filterAssessments = () => {
        if (assessments ===''){
            return(<div>No scores yet</div>)
        }else{
            return(
        assessments.map(assessment => {if(assessment.class_period_id === thisClass) return(<Assessment assessment={assessment} score={assessment.participating}/>)})
             ) }}


    return(
    <div className='assessment-list'>
        <div className="assessment-list-assessments">
                {filterAssessments()}
        </div>
    </div>
    )
    
}
export default AssessmentList;