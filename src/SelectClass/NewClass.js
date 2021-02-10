import React from 'react';
import { Link } from 'react-router-dom';

const NewClass = ({subject, level, period, selected, classObject}) => {
return(
    <div>
        {/* <div id='Period' onClick={e=>(selected(classObject))}> */}
        <div id='Period'>

            <Link to={`/classhome/${classObject.id}/roster`}>
                <li>{subject} {level}: Period {period} </li>
            </Link>
        </div>
    </div>
) 
}

export default NewClass;