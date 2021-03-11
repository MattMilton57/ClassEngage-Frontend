import React from 'react';
import Roster from "../components/Roster"

const  ClassStatsContainer = ({assessments, students, callback, classPeriod, url}) => {

    return(
      <div className="class-stats">
        <div className="class-stats__roster-container">
          <Roster
          assessments={assessments} 
          score={true} 
          students={students} 
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