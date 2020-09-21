import React from 'react';
import { Link } from 'react-router-dom';

const Class = ({subject, level, period, selected, classObject, id,}) => {
return(
    <div>
        <div id='Period' onClick={e=>(selected(classObject))}>
            <Link to="/classhome">
                {subject} {level}: Period {period} 
            </Link>
        </div>
    </div>
) 
}

export default Class;