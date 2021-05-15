import React from 'react';
import Roster from "../components/Roster"
import TitleBox from "../components/TitleBox"
import ClassScore from "../components/ClassScore"
import Graphics from "../components/Graphics"
import LastAssessment from "../components/LastAssessment"
import TotalAssessments from '../components/TotalAssessments';

const  ClassStatsContainer = ({assessments, roster, callback, classPeriod, classObject, url, graphInfoData, dataObject, stateLables}) => {

  const checkForStudents = () => {
    // console.log(roster)
    if(roster.length === 0)
    {return(<div className="class-stats__instructions" >
        <div className="class-stats__instructions--welcome">
          Welcome to Class Engage
        </div>
        <div className="class-stats__instructions--guide">
          click on the edit class tab to the left to create and register some students
        </div>
      </div>)}
    else 
    if(assessments.length === 0)
    {return(
    <div className="class-stats__instructions" >
        <div className="class-stats__instructions--welcome">
          You have a roster!
        </div>
        <div className="class-stats__instructions--guide">
        click on the assess class tab to the left to assess some students and enable statistics
        </div>
      </div>)}
    else
    {return(          
    <ClassScore
      roster={roster} 
      assessments={assessments}
      classPeriod={classPeriod}
      />)}
  }

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
          {checkForStudents()}
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