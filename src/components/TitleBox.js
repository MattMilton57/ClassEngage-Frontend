import React from 'react';

const TitleBox = ({title}) => {

    return(
        <div className="title-box">
            {/* <div className="class-title__class-period">
                P: {classObject.period}
            </div> */}
            <div className="class-title__class-subject">
                <p>
                    {title} 
                </p>
            </div>
        </div>
    )
}
export default TitleBox