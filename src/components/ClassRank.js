import React from 'react';

const ClassRank = ({assessments, roster, thisStudent}) => {

    const  setParticipation = () => {
        // console.log(roster, assessments)
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
        console.log(studentOnjectScoreasStringAndIndex)

        // console.log(studentObjectScoreAsString)
        // let sampleSorted = []
        // let intArray = []
        // studentObjectScoreAsString.forEach(score=>{intArray.push(score[1])})

///////////////////////
        let uniqueScoresAsString = []
        studentObjectScoreAsString.forEach(item => { let string = item.score; if(uniqueScoresAsString.includes(string) == false){uniqueScoresAsString.push(string)}})
///////////////////////


        // console.log(intArray)
        // console.log(uniqueScoresAsString)


///////////////////////
        let scoreRank = []
        uniqueScoresAsString.forEach(score=>{let index=uniqueScoresAsString.indexOf(score); let final=(index+1); scoreRank.push({score:score,index:final})})

        let test =[]
        studentOnjectScoreasStringAndIndex.forEach(student=>{scoreRank.forEach(score=>{if(score.score===student.score){test.push({student:student.student, score:student.score, rawIndex:student.rawIndex, tieIndex:score.index})}})})

///////////////////////


        // let finalList =[]
        // studentObjectScoreAsString.forEach(studentItem=>{scoreRank.map(score=>{if(score[0]===studentItem[1]){finalList.push([studentItem[0],score[1]])}})})
        // studentObjectScoreAsString.forEach(studentItem=>{scoreRank.map(score=>{console.log(studentItem,score)})})

        // console.log(intArray)
        // console.log(uniqueScoresAsString)
        // console.log(studentObjectScoreAsString)
        // console.log(scoreRank)
        // console.log(finalList)




        let scoreCounter=[]
        uniqueScoresAsString.forEach(score=>{let counter=0;studentObjectScoreAsString.forEach(student=>{if(student.score===score){counter=counter+1}});scoreCounter.push([score,counter])})
        // console.log(scoreCounter)


        let fullStudentInfo = []
        test.forEach(student => {scoreCounter.forEach(score => {if(student.score===score[0])fullStudentInfo.push({student:student.student, score:student.score, rawIndex:student.rawIndex, tieIndex:student.tieIndex, tiedScores:score[1]})})})
        // console.log(fullStudentInfo)

        
        let currentStudentObject =[]
        if(thisStudent){fullStudentInfo.forEach(student =>{if(student.student.id===thisStudent.id){currentStudentObject.push(student)}}) }
        
        let compatriots = []
        if(thisStudent){fullStudentInfo.forEach(student=>{if(student.score===currentStudentObject[0].score){compatriots.push(student)}})}
        console.log(compatriots)
        let finalScore=compatriots[0]

        if(!finalScore){
            return(
                <div>
                    loading
                </div>
            )
        }else{
            if(finalScore.tiedScores > 1)
            return(
                <div>
                    <div className="class-rank__text">
                        Class Ranking
                    </div>
                    <div className="class-rank__score-tied">
                        <div className="class-rank__score-tied-text">
                            Tied
                        </div>
                        <div className="class-rank__score-tied-score">
                        {finalScore.rawIndex}/{fullStudentInfo.length}
                        </div>

                    </div>
                </div>
            )
        else{
            return(
                <div>
                <div className="class-rank__text">
                    Class Ranking
                </div>
                <div className="class-rank__score-singular">
                {finalScore.rawIndex}/{fullStudentInfo.length}
                </div>
            </div>
            )
        }    
        }
///////////////////////
        // let scoreCounter=[]
        // scoreRank.forEach(score=>
        //     {let counter=0;test.forEach(student=>
        //         {if(student.score===score.score)
        //             {counter=counter+1;
        //             scoreCounter.push({student:student.student, score:student.score, rawIndex:student.rawIndex, tieIndex:score.tieIndex, scoreSiblings:counter})
        //         }
        //         }
        //     )}
        // )

        // console.log(scoreCounter)
///////////////////////



       
// studentObjectScoreAsString.forEach(student=>{scoreCounter.forEach(score=>{if((student[1]===score[0])&&(score[1]>1)){console.log(student[0].name+"tied")}else{console.log(student[0].name+"unique")}})})

///////////////////////
        // let scoreIsUnique = []
        // scoreCounter.forEach(score=>{if((score[1]>1)){scoreIsUnique.push([score[0], false])}else{scoreIsUnique.push([score[0],true])}})
///////////////////////

        // console.log(studentOnjectScoreasStringAndIndex)
        // console.log(scoreIsUnique)

        ///////////////////////
        // let finalList=[]
        // studentOnjectScoreasStringAndIndex.forEach(student=>{
        //     scoreIsUnique.forEach(score=>{
        //         if((score[0]===student[1])&&(score[1]===true))
        //         {finalList.push({student:student[0],score:student[2],isUnique:true})
        //     }})})

        // studentOnjectScoreasStringAndIndex.forEach(student=>{
        //     scoreIsUnique.forEach(score=>{
        //         if((score[0]===student[1])&&(score[1]===false))
        //             {finalList.push({student:student[0],score:student[1],isUnique:false})}
        //     })
        // })
///////////////////////

        // console.log(studentOnjectScoreasStringAndIndex)
///////////////////////
        // console.log(finalList)
   
        // let actualFinalList = []
        // finalList.forEach(student=>{
        //     if(student.isUnique===true)
        //     {actualFinalList.push(student)}
        //     else{scoreCounter.forEach(score=>{if(student.score===score[0]){actualFinalList.push({student:student[0],score:score[1],isUnique:false})}})
        //     }
        // })
        // console.log(actualFinalList)
///////////////////////                



            // let actualFinalList = []
            // finalList.forEach(student=>
            //     {if(student.isUnique===false)
            //         {actualFinalList.push(student)}}
            //         else
            //     {scoreCounter.forEach(score=>{if(student.score===score[0]){actualFinalList.push({student:student[0],score:score[1],isUnique:false})}}})


        // bigNewArray.forEach(score=>{let index=bigNewArray.indexOf(score);console.log(index)})





        // assessmentlist.forEach(studentItem=>{
        //     let counter = 0; 
        //     bigNewArray.forEach( score => {if(score != studentItem[1]){let counter = (counter+1)}})
        //     if(bigNewArray.includes(studentItem[1]) == false){let counter = (counter+1)};
        //     console.log(counter)
        // })

        // let final = []
        // bigNewArray.forEach(score=>{assessmentlist.forEach(student=>{let counter=1;if(score===student[1]){let rank=counter}else{let counter=(conter+1)}; final.push([student[0],student[1],rank])})})
        // assessmentlist.forEach(student=>{bigNewArray.map(score=>{let string = student[1].toString;console.log(score,string)})})
        // bigNewArray.forEach(score=>{let newscore=score.toInt;final.push(newscore)})

        // let counter=1
        // assessmentlist.forEach(student=>{bigNewArray.map(score=>{counter=1;if(student[1]===score){final.push([student,counter]);let counter=1}else{counter+=1}})})
        // console.log(final)

        // {if (bigNewArray.includes(string) == false) {console.log(item[1])}else{bigNewArray.push(item[1])}}})
    }

    // {this.props.propInQuestion ? <a href="#">link</a> : null}

    return(
        <div className="class-rank">
            {setParticipation()}
        </div>
    )
}
export default ClassRank

// resources:
// all assessments
// class roster

// const findAScore = () => {
//     let studentAssessments=[]
//     assessments.map(assessment =>{if(assessment.student_id===student.id) studentAssessments.push(assessment)})
//     let positiveAssessments = []
//     studentAssessments.map(assessment =>{if(assessment.participating===true)positiveAssessments.push(assessment)})
//     let all = studentAssessments.length
//     let yes = positiveAssessments.length
//     let totalScore = ((yes/all))
//     if (all > 0){
//     return (totalScore*100).toFixed(0)+"%"} else {return("--")}
// }

// sortByPriceAsc() {
//     this.setState(prevState => {
//       this.state.products.sort((a, b) => (a.price - b.price))
//   });
