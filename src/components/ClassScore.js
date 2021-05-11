import React from 'react';

const ClassScore = ({assessments, classPeriod, roster}) => {

    const  setParticipation = () => {
        if ((assessments === [])){return(<div>Loading</div>)}else{

        let classRoster = []
        roster.forEach(student => {classRoster.push(student.id)})
        // console.log(classRoster)
        let classAssessments = []
        assessments.forEach( assessment => {if ((assessment.class_period_id === classPeriod) && (classRoster.includes(assessment.student_id) === true) ) classAssessments.push(assessment)})

        let totalScore=0
        let totalAssessments = classAssessments.length
        classAssessments.forEach( assessment => {if (assessment.participating === true) totalScore=(totalScore+1)})
        let rawScore=(totalScore/totalAssessments)
        let classScore = ((rawScore*100).toFixed(0))
        console.log(totalAssessments)
        if (totalAssessments === 0){
            return(<div></div>)

        }else{
            return(
                <div className="class-score">
                    <div className="class-score__caption">
                        <div className="class-score__caption-1">Total</div>
                        <div className="class-score__caption-2">Participation</div>
                        <div className="class-score__caption-3">Score</div>
                    </div>
                    <div className="class-score__score">
                        <div className="class-score__score--number">
                            {classScore}
                        </div>
                        <div className="class-score__score--percent">
                            %                            
                        </div>
                    </div>
                </div>
            )}
        }
    }

    return(
        <div >
            {setParticipation()}
        </div>
    )
}
export default ClassScore