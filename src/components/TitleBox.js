import React from 'react';

const TitleBox = ({title}) => {

    return(
        <div className="class-title">
            {/* <div className="class-title__class-period">
                P: {classObject.period}
            </div> */}
            <div className="class-title__class-subject">
                    {title} 
            </div>
        </div>
    )
}
export default TitleBox