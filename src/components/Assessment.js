import React from 'react';


const Assessment = ({assessment}) => {

const assessmentDate = () => {
    if (assessment.created_at === ''){
        return (<div>Loading</div>)
    }else{
    const date = assessment.created_at; 
    const split = date.split('T'); 
    const dateOnly=split[0]; 
    const dateSplit=dateOnly.split('-');
    const month = dateSplit[1]
    const day = dateSplit[2]

    return(<div>
        <div className="assessment-list__assessment-card--date-month">
            {/* {parsedDate(month)}/{parsedDate(day)}/{dateSplit[0]} */}
            {" " + parsedDate(month)}/{parsedDate(day)}


        </div>
        {/* <div className="assessment-list__assessment-card--date-day">
            {parsedDate(day)}
        </div> */}
        {/* <div className="assessment-list__assessment-card--date-year">
            {dateSplit[0]}
        </div> */}
    </div>)}
}

const parsedDate = (date) => {
    if (date > 9){return(date)}else{const parsedDate = parseInt(date, 10); return(parsedDate)} 
}

const isParticipating = () => {
//    if (assessment.participating === true) {return("Yes")} else {return "No"}
   if (assessment.participating === true) {
       return(           
            <div className="assessment-list__assessment--score-text-positive">
                Student was engaged
            </div>
        )
     }
     else{
         return(           
            <div className="assessment-list__assessment--score-text-negative">
                not engaged in activity
            </div>
            )}
}

    const buildCard = () => {
        if ((assessment.comment === "") || (assessment.comment == null)){
            return(
                <div className="assessment-list__assessment assessment-list__assessment-no-comment">
                    <div className="assessment-list__assessment--date">
                        <div className="assessment-list__assessment--date-text">
                            assessment date: 
                        </div>
                        <div className="assessment-list__assessment--date-number">
                            {assessmentDate()}
                        </div>
                    </div> 
                    <div className="assessment-list__assessment--score">
                    <div className="assessment-list__assessment--score-text">
                            {isParticipating()}
                        </div>
                        {/* <div className="assessment-list__assessment--score-icon">
                            {isParticipating()}
                        </div> */}
                    </div>
                </div>
            ) 
        }else{
            return(
                <div className="assessment-list__assessment assessment-list__assessment-comment">
                    <div className="assessment-list__assessment--date">
                        <div className="assessment-list__assessment--date-text">
                            assessment date: 
                        </div>
                        <div className="assessment-list__assessment--date-number">
                            {assessmentDate()}
                        </div>
                    </div> 
                    <div className="assessment-list__assessment--score">
                        <div className="assessment-list__assessment--score-text">
                            {isParticipating()}
                        </div>
                        {/* <div className="assessment-list__assessment--score-icon">
                            {isParticipating()}
                        </div> */}
                    </div>
                    <div className="assessment-list__assessment--comment">
                        <div className="assessment-list__assessment--comment-header">
                            Instructor comment: 
                        </div>

                        <div className="assessment-list__assessment--comment-text">
                            {assessment.comment}
                        </div>

                    </div>
                </div>
            ) 
        }}

    return(
        <div className="assessment-list__assessment">
                {buildCard()}
        </div>
    ) 
}
export default Assessment;