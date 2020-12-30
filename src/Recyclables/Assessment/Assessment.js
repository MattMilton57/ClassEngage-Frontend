import React from 'react';
import { Link } from 'react-router-dom'
const Assessment = ({assessment, score}) => {

const handleClick = () => {
    console.log(score)
}

const isParticipating = (assessment) => {
//    if (assessment.participating === true) {return("Yes")} else {return "No"}
   if (score === true) {return("yes")} else {return('No')}
}

    return(
        <div onClick={()=> handleClick()}>
            <div>
            Assessment date: {assessment.created_at}
            Participating: {isParticipating()}
            </div> 
            <br></br> 
        </div>
    ) 
}
export default Assessment;