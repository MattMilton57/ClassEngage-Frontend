import React from 'react';
const Student = ({student, callback}) => {

const handleClick = (e) => {
    console.log(e)
    callback(e)
}

return(
        <div onClick={()=> handleClick(student)}>
            <li key={student.id}>{student.name}</li>
        </div>    
    ) 
}

export default Student;