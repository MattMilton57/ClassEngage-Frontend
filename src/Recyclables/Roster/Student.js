import React from 'react';
const Student = ({student, callback, score}) => {

const handleClick = (e) => {
    console.log(e)
    callback(e)
}

if (score == ''){

return(
        <div onClick={()=> handleClick(student)}>
            <li key={student.id}>{student.name}</li>
        </div>  
    ) 
}else{return(
    <div onClick={()=> handleClick(student)}>
        <div key={student.id}>{student.name}</div>
        <div>Score: {score}</div>
    </div>  
) 
}}

export default Student;