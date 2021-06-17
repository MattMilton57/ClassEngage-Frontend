import React from 'react';

const ClassRank = ({assessments, roster, thisStudent}) => {

    const  setParticipation = () => {
        let studentObjectScoreAsString = []
        roster.forEach(student => {
            let studentAssessments=[]
            assessments.forEach(assessment =>{if(assessment.student_id===student.id) studentAssessments.push(assessment)})
            let positiveAssessments = []
            studentAssessments.map(assessment =>{if(assessment.participating===true)positiveAssessments.push(assessment)})
            let all = studentAssessments.length
            let yes = positiveAssessments.length
            let totalScore = ((yes/all))
            let scoreString=totalScore.toString()
            studentObjectScoreAsString.push({student:student, score:scoreString})
        })

        studentObjectScoreAsString.sort((b, a) => (a.score - b.score))
        let studentOnjectScoreasStringAndIndex = []
        studentObjectScoreAsString.forEach(student=>{let index = (studentObjectScoreAsString.indexOf(student)+1);studentOnjectScoreasStringAndIndex.push({student:student.student, score:student.score, rawIndex:index})})

        let uniqueScoresAsString = []
        studentObjectScoreAsString.forEach(item => { let string = item.score; if(uniqueScoresAsString.includes(string) == false){uniqueScoresAsString.push(string)}})

        let scoreRank = []
        uniqueScoresAsString.forEach(score=>{let index=uniqueScoresAsString.indexOf(score); let final=(index+1); scoreRank.push({score:score,index:final})})

        let studentScoreIndexTieIndex =[]
        studentOnjectScoreasStringAndIndex.forEach(student=>{scoreRank.forEach(score=>{if(score.score===student.score){studentScoreIndexTieIndex.push({student:student.student, score:student.score, rawIndex:student.rawIndex, tieIndex:score.index})}})})

        let scoreCounter=[]
        uniqueScoresAsString.forEach(score=>{let counter=0;studentObjectScoreAsString.forEach(student=>{if(student.score===score){counter=counter+1}});scoreCounter.push([score,counter])})

        let fullStudentInfo = []
        studentScoreIndexTieIndex.forEach(student => {scoreCounter.forEach(score => {if(student.score===score[0])fullStudentInfo.push({student:student.student, score:student.score, rawIndex:student.rawIndex, tieIndex:student.tieIndex, tiedScores:score[1]})})})

        let currentStudentObject =[]
        if(thisStudent){fullStudentInfo.forEach(student =>{if(student.student.id===thisStudent.id){currentStudentObject.push(student)}})}
        
        let compatriots = []
        if(thisStudent){fullStudentInfo.forEach(student=>{if(student.score===currentStudentObject[0].score){compatriots.push(student)}})}
        console.log(compatriots)
        let finalScore=compatriots[0]

        if(!finalScore){
                return(<div></div>)
            }else{
                if(finalScore.tiedScores > 1){
                    return(
                        <div className="class-rank__score-tied">
                            <div className="class-rank__score-tied-text">
                                Tied
                            </div>
                            <div className="class-rank__score-tied-score">
                                {finalScore.rawIndex}/{fullStudentInfo.length}
                            </div>
                        </div>
                    )
                }else{
                    return(
                        <div className="class-rank__score-singular">
                            {finalScore.rawIndex}/{fullStudentInfo.length}
                        </div>
                    )
                }    
            }
        }

    return(
        <div className="class-rank">
            <div className="class-rank__text">
                Class Ranking
            </div>
            <div className="class-rank__score">
                {setParticipation()}
            </div>
        </div>
    )
}
export default ClassRank