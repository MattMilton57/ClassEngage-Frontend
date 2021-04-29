import React from 'react';
import  Student from '../components/Student';
import  StudentScore from '../components/StudentScore';


const Roster = ({ url, roster, callback, score, assessments, classPeriod, linkTo, registerAction}) => {  
    
    const filterAssessments = (id) => {
        // console.log(assessments)
        if (assessments ===''){
        let studentAssessments = []
        assessments.forEach(assessment => {if(assessment.student_id === id) studentAssessments.push(assessment)})
        let positiveAssessments = []
        studentAssessments.forEach(studentAssessment => {if(studentAssessment.participating === true) positiveAssessments.push(studentAssessment)})
        let all = studentAssessments.length
        let yes = positiveAssessments.length
        let totalScore = ((yes/all)+'%')
        // console.log(yes) 
        // console.log(all)
        // console.log(totalScore)
        return totalScore}
    }


    roster.sort(function(a, b){
        var x = a.name.toLowerCase();
        var y = b.name.toLowerCase();
        if (x < y) {return -1;}
        if (x > y) {return 1;}
        return 0 
    })


    if (score===true){
        return(
        <div className='roster'>
            <ul>
                {roster.map(student => 
                    <li className="roster__student" key={student.name}>
                        <div className="roster__student--name" id="name">
                            <Student 
                                url={url}
                                totalScore={filterAssessments(student.id)} 
                                callback={callback} 
                                student={student} 
                                assessments={assessments} 
                                showScore={score}
                                linkTo={linkTo}/>
                        </div>
                        <div className="roster__student--score" id="score">
                            <StudentScore
                                student={student}
                                assessments={assessments}
                                classPeriod={classPeriod}
                            
                            />
                        </div>
                    </li>)}
            </ul>
        </div>
    )
            }else{
                return(
                    <div className='roster'>
                        <ul>
                            {roster.map(student => 
                                <li id="student" key={student.name}>
                                    {/* <div className="roster__student--name" id="name"> */}
                                        <Student 
                                            totalScore={filterAssessments(student.id)} 
                                            callback={callback} 
                                            student={student} 
                                            assessments={assessments} 
                                            showScore={score}
                                            registerAction={registerAction}/>
                                    {/* </div> */}
                                </li>)}
                        </ul>
                    </div>
                )            
            } 



}
export default Roster;