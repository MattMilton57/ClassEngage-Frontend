import React from 'react';
import { Link } from 'react-router-dom';

const NewClass = ({subject, level, period, classObject}) => {
return(

        // <div className="class-list__class" id='Period'>
        <li className="class-list__class-item">
            <Link className="class-list__class link" to={`/classhome/${classObject.id}`}>
                <div className="class-list__class--name">
                    {subject}
                </div>
                <div className="class-list__class--period">
                    P: {period}
                </div>
            </Link>
        </li>

) 
}

export default NewClass;