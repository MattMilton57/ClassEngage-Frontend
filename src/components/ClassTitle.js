import React from 'react';

const ClassTitle = ({classObject}) => {

    return(
        <div className="class-title">
            {/* <div className="class-title__class-period">
                P: {classObject.period}
            </div> */}
            <div className="class-title__class-subject">
                <p>
                    {classObject.subject} 
                </p>
            </div>
        </div>
    )
}
export default ClassTitle