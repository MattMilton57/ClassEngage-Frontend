import React from 'react';

const LastAssessment = ({assessment}) => {

    const assessmentDate = () => {
        if (!assessment){
            return (<div></div>)
        }else{
        const date = assessment.created_at; 
        const split = date.split('T'); 
        const dateOnly=split[0]; 
        const dateSplit=dateOnly.split('-');
        const month = dateSplit[1]
        const day = dateSplit[2]
        return(
            <div className="last-assessment__date">
                {parsedDate(month)}/{parsedDate(day)}
            </div>
            )
        }
    }

    const parsedDate = (date) => {
        if (date > 9)
            {return(date)}
        else
            {const parsedDate = parseInt(date, 10); return(parsedDate)} 
    }

    return(
        <div className="last-assessment" >
                        <div className="last-assessment__text">
            Last Assessment
        </div>
            {assessmentDate()}
        </div>
    ) 

}
export default LastAssessment