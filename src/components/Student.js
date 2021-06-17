import React from 'react';
import { Link } from 'react-router-dom'

const Student = ({student, callback, linkTo, url, registerAction}) => {

    const handleClick = (e) => {
        e.preventDefault(e)
        callback(student)
    }

    if (linkTo === true) {
        return(
            <div>
                <Link to={`${url}${student.id}`}>
                    {student.name}
                </Link>
            </div>)
    }else{
        return(
            <div className="roster__edit-student" onClick={(e)=> handleClick(e)}>
                <div className="roster__edit-student--name" value={student} key={student.id}>{student.name}</div>
                <div className="roster__edit-student--caption">{registerAction}</div>
            </div>  
        ) 
    }
}
export default Student;