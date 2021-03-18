import React from 'react';
import Roster from "../components/Roster"
import ClassTitle from "../components/ClassTitle"
import ClassScore from "../components/ClassScore"
import Graphics from "../components/Graphics"

const  ClassStatsContainer = ({assessments, roster, callback, classPeriod, classObject, classScore, url, graphInfo}) => {

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
        <div className="class-stats__class-name">
          <ClassTitle
            classObject={classObject}
            />
        </div>
        <div className="class-stats__total-participation">
          <ClassScore
            classScore={classScore}
            />
        </div>
        <div className="class-stats__graphics">
          <Graphics 
          graphInfo={graphInfo}
          />
        </div>
      </div>
    )
} 
export default ClassStatsContainer