import React from 'react';
import sprite from "../img/sprite.svg";

const Assessment = ({assessment}) => {

const assessmentDate = () => {
    if (assessment.created_at == ''){
        return (<div>Loading</div>)
    }else{
    const date = assessment.created_at; 
    const split = date.split('T'); 
    const dateOnly=split[0]; 
    const dateSplit=dateOnly.split('-');
    const month = dateSplit[1]
    const day = dateSplit[2]
    const dateString = dateSplit.toString() 
    return(<div>
        <div className="assessment-list__assessment-card--date-month">
            {parsedDate(month)}/{parsedDate(day)}/{dateSplit[0]}

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
    console.log(date)
    if (date > 9){return(date)}else{const parsedDate = parseInt(date, 10); return(parsedDate)} 
}

const isParticipating = () => {
//    if (assessment.participating === true) {return("Yes")} else {return "No"}
   if (assessment.participating === true) {
       return(           
        <svg className="assessment-list__assessment--score-icon assessment-list__assessment--score-icon-up">
            <use href={sprite + "#icon-thumbs-up"} ></use>
        </svg>
        )
     } else {
         return(           
            <svg className="assessment-list__assessment--score-icon assessment-list__assessment--score-icon-down">
                <use href={sprite + "#icon-thumbs-down"} ></use>
            </svg>
            )}
}

const hasComment = () => {
    if (assessment.comment != null)
        {return(<div className="assessment-list__assessment--comment-trigger">comment</div>)
    }else{
        console.log('no comment')
    }}

    return(
        <div className="assessment-list__assessment">
            <div className="assessment-list__assessment--date">
                {assessmentDate()}
            </div> 
            <div className="assessment-list__assessment--score">
                {isParticipating()}
            </div>
            <div className="assessment-list__assessment--comment">
                {hasComment()}
            </div>
        </div>
    ) 
}
export default Assessment;