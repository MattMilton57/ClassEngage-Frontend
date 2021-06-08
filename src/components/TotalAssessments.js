import React from 'react';

const TotalAssessments = ({assessments}) => {

    const assessmentTotal = () => {
        if (!assessments){
            return (<div></div>)
        }else{
            return(
                <div className="">
                    {assessments.length}
                </div>
            )
        }
    }

    return(
        <div className="total-assessments">
            <div className="total-assessments__text">
                Total Assments
            </div>
            <div className="total-assessments__total">
                {assessmentTotal()}
            </div>
        </div>
    ) 
}
export default TotalAssessments