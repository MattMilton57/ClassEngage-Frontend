import React from 'react';
import  RosterContainer from './RosterContainer';



const BuildClass = ({students, callback, classPeriod}) => {  
    
    const filterAssessments = (id) => {
        if (assessments ===''){
        let studentAssessments = []
        assessments.map(assessment => {if(assessment.student_id == id) studentAssessments.push(assessment)})
        let positiveAssessments = []
        studentAssessments.map(studentAssessment => {if(studentAssessment.participating == true) positiveAssessments.push(studentAssessment)})
        let all = studentAssessments.length
        let yes = positiveAssessments.length
        let totalScore = ((yes/all)+'%')
        return totalScore}
    }

if (score===true){
    return(
    <div id='Roster'>
        <div>
            {students.map(student => 
                <div id="student">
                    <div id="name">
                        <RosterContiner 
                            totalScore={filterAssessments(student.id)} 
                            callback={callback} 
                            student={student} 
                            assessments={assessments} 
                            showScore={score}/>
                    </div>
                    <div id="score">
                        <StudentScore
                            student={student}
                            assessments={assessments}
                            classPeriod={classPeriod}
                        
                        />
                    </div>
                </div>)}
        </div>
    </div>
)
            }else{
                return(
                    <div id='Roster'>
                        <div>
                            {students.map(student => 
                                <div id="student">
                                    <div id="name">
                                        <Student 
                                            totalScore={filterAssessments(student.id)} 
                                            callback={callback} 
                                            student={student} 
                                            assessments={assessments} 
                                            showScore={score}/>
                                    </div>
                                </div>)}
                        </div>
                    </div>
                )            
            } 
}
export default BuildClass;