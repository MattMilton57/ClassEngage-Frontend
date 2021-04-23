import React from 'react';

const TotalAssessments = ({assessments}) => {

const assessmentTotal = () => {
    if (!assessments){
        return (<div>Loading</div>)
    }else{
        return(

             <div className="total-assessments__total">
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

            {assessmentTotal()}

        </div>
    ) 
}
export default TotalAssessments