import React from 'react';

const ClassScore = ({classScore}) => {

    return(
        <div className="class-score">
            <div className="class-score__caption">
                <div className="class-score__caption-1">Total</div>
                <div className="class-score__caption-2">Participation</div>
                <div className="class-score__caption-3">Score</div>
            </div>
            <div className="class-score__score">
                {classScore}%
            </div>
        </div>
    )
}
export default ClassScore