import React from 'react';
import Roster from "../components/Roster"

const  ClassStatsContainer = ({assessments, roster, callback, classPeriod, url}) => {

    return(
      <div className="class-stats">
        <div className="class-stats__roster-container">
          <Roster
          assessments={assessments} 
          score={true} 
          roster={roster} 
          callback={callback}
          classPeriod={classPeriod} 
          linkTo={true}
          url={url}
          />
        </div>
        <div className="class-stats__graphics">
          Graphics
        </div>
      </div>
    )
} 
export default ClassStatsContainer