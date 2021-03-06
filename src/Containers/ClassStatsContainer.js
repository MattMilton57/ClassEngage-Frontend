import React from 'react';
import ClassScore from "../components/ClassScore"
import Graphics from "../components/Graphics"
import LastAssessment from "../components/LastAssessment"
import Roster from "../components/Roster"
import TitleBox from "../components/TitleBox"
import TotalAssessments from '../components/TotalAssessments';

const  ClassStatsContainer = ({assessments, callback, classObject, classPeriod, graphInfoData, roster, stateLables, url}) => {

  const checkForStudents = () => {
    if(roster.length === 0){
      return(
        <div className="class-stats__instructions" >
          <div className="class-stats__instructions--welcome">
            Welcome to Class Engage
          </div>
          <div className="class-stats__instructions--guide">
            click on the edit class tab to the left to create and register some students
          </div>
        </div>
      )
    }else 
      if(assessments.length === 0){
        return(
          <div className="class-stats__instructions" >
            <div className="class-stats__instructions--welcome">
              You have a roster!
            </div>
            <div className="class-stats__instructions--guide">
            click on the assess class tab to the left to assess some students and enable statistics
            </div>
          </div>
        )
    }else{
      return( 
        <div className="class-stats__total-participation-shell ">
          <ClassScore
            roster={roster} 
            assessments={assessments}
            classPeriod={classPeriod}
          />
        </div>         
      )
    }
  }

  return(
    <div className="class-stats class-home__content-class-stats">
      <div className="class-stats__roster-container">
        <div className="class-stats__roster-container-shell">
          <Roster
            assessments={assessments} 
            callback={callback}
            classPeriod={classPeriod} 
            linkTo={true}
            roster={roster} 
            score={true} 
            url={url}
          />
        </div>
      </div>
      <div className="class-stats__class-name">
        <TitleBox title={classObject.subject}/>
      </div>
      <div className="class-stats__total-participation">
        {checkForStudents()}
      </div>
      <div className="class-stats__graphics">
        <Graphics 
          graphData={graphInfoData}
          stateLables={stateLables}
        />
      </div>
      <div className="class-stats__total-assessments">
        <TotalAssessments assessments={assessments}/>
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