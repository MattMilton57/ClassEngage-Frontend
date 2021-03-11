import React from 'react';
import { Link } from 'react-router-dom';

const NewClass = ({ listType, subject, level, period, classObject}) => {
    
    if (listType == "home") {
        return(
            <li className="class-list__class-item">
                <Link className="class-list__class link" to={`/classhome/${classObject.id}`}>
                    <div className="class-list__class--period">
                        P: {period}
                    </div>
                </Link>
            </li>
        ) 

    }else{

        return(
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
}

export default NewClass;