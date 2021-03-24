import React from 'react';

const ClassScore = ({assessments}) => {

    const  setParticipation = () => {
        if (assessments == []){return(<div>Loading</div>)}else{
        let totalScore=0
        let totalAssessments = assessments.length
        assessments.map( assessment => {if (assessment.participating == true) totalScore=(totalScore+1)})
        let rawScore=(totalScore/totalAssessments)
        let classScore = ((rawScore*100).toFixed(0))
        if (classScore == "NaN") {
                return(
                    <div className="class-score__score--loading">
                        Loading
                    </div>)
            }else{
                return(
                    <div className="class-score__score">
                        {classScore}%
                    </div>
                )
            }
        }
    }

    return(
        <div className="class-score">
            <div className="class-score__caption">
                <div className="class-score__caption-1">Total</div>
                <div className="class-score__caption-2">Participation</div>
                <div className="class-score__caption-3">Score</div>
            </div>
                {setParticipation()}
        </div>
    )
}
export default ClassScore