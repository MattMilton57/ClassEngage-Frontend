import React from 'react';
const AssessmentCard = ({name}) => {

const handleClick = (e) => {
    console.log("yeet")
}

return(
        <div onClick={()=> handleClick()}>
            An assessment Card for {name}
        </div>    
    ) 
}

export default AssessmentCard;

