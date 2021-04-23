import React from 'react';
import Roster from "../components/Roster"
import TitleBox from "../components/TitleBox"
import ClassScore from "../components/ClassScore"
import Graphics from "../components/Graphics"
import LastAssessment from "../components/LastAssessment"
import TotalAssessments from '../components/TotalAssessments';

const  ClassStatsContainer = ({assessments, roster, callback, classPeriod, classObject, url, graphInfoData, dataObject, stateLables}) => {

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
          <TitleBox
            title={classObject.subject}
            />
        </div>

        <div className="class-stats__total-participation">
          <ClassScore
            assessments={assessments}
            classPeriod={classPeriod}
            />
        </div>

        <div className="class-stats__graphics">
          <Graphics 

          graphData={graphInfoData}
          stateLables={stateLables}
          assessments={assessments}
          dataObject={dataObject}
          />
        </div>

        <div className="class-stats__total-assessments">
          <TotalAssessments 
          assessments={assessments}/>

        </div>

        <div className="class-stats__last-assessment">
          <LastAssessment
            assessment={assessments[assessments.length-1]}
            />
        </div>

      </div>
    )
} 
export default ClassStatsContainer