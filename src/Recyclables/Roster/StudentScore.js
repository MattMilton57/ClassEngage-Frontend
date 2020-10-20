import React from 'react';
const StudentScore = ({student, assessments, classPeriod, findscore}) => {

const handleClick = (e) => {
    // console.log(classPeriod)
}

const findAScore = () => {
    // if (assessments===''){
    let studentAssessments=[]
    assessments.map(assessment =>{if(assessment.student_id===student.id) studentAssessments.push(assessment)})
    // console.log(student.name, studentAssessments)
    let positiveAssessments = []
    studentAssessments.map(assessment =>{if(assessment.participating===true)positiveAssessments.push(assessment)})
    let all = studentAssessments.length
    let yes = positiveAssessments.length
    let totalScore = ((yes/all))
    if (totalScore > 0){
    return totalScore+"%"} else {return("No Score Yet")}
}

// const findAScore = () => {
//     // if (assessments===''){
//     let studentAssessments=[]
//     assessments.map(assessment =>{if(assessment.student_id===student.id) studentAssessments.push(assessment)})
//     let positiveAssessments = []
//     studentAssessments.map(assessment =>{if(assessment.participating===true)positiveAssessments.push(assessment)})
//     let all = studentAssessments.length
//     let yes = positiveAssessments.length
//     let totalScore = ((yes/all)+'%')
//     return totalScore
// }

// if (showScore == false){

return(
        <div onClick={()=> handleClick(student)}>
            {findAScore()}
        </div>  
    ) 
// }else{
//     // if (totalScore=undefined){
//         // console.log(totalScore)
//         return(

//             <div onClick={()=> handleClick(student)}>
//                 <div key={student.id}>{student.name}</div>
//                 <div>Score: {totalScore}</div>
//             </div>  
//     )
// // }else{
//         // console.log(totalScore)
//         // return(
//         //     <div>noscore</div>)
//         } 
// }
}

export default StudentScore;

// const filterAssessments = (id) => {
//     console.log(assessments)
//     if (assessments ===''){
//     let studentAssessments = []
//     assessments.map(assessment => {if(assessment.student_id == id) studentAssessments.push(assessment)})
//     let positiveAssessments = []
//     studentAssessments.map(studentAssessment => {if(studentAssessment.participating == true) positiveAssessments.push(studentAssessment)})
//     let all = studentAssessments.length
//     let yes = positiveAssessments.length
//     let totalScore = ((yes/all)+'%')
//     console.log(yes) 
//     console.log(all)
//     console.log(totalScore)
//     return totalScore}
// }

// import React from 'react';
// const Student = ({student, callback, assessments, totalScore, showScore}) => {

// const handleClick = (e) => {
//     totalScore(student)
//     callback(e)
// }

// if (showScore == false){

// return(
//         <div onClick={()=> handleClick(student)}>
//             <li key={student.id}>{student.name}</li>
//         </div>  
//     ) 
// }else{
//     // if (totalScore=undefined){
//         // console.log(totalScore)
//         return(

//             <div onClick={()=> handleClick(student)}>
//                 <div key={student.id}>{student.name}</div>
//                 <div>Score: {totalScore}</div>
//             </div>  
//     )
// // }else{
//         // console.log(totalScore)
//         // return(
//         //     <div>noscore</div>)
//         } 
// // }
// }

// export default Student;

// const filterAssessments = (id) => {
//     console.log(assessments)
//     if (assessments ===''){
//     let studentAssessments = []
//     assessments.map(assessment => {if(assessment.student_id == id) studentAssessments.push(assessment)})
//     let positiveAssessments = []
//     studentAssessments.map(studentAssessment => {if(studentAssessment.participating == true) positiveAssessments.push(studentAssessment)})
//     let all = studentAssessments.length
//     let yes = positiveAssessments.length
//     let totalScore = ((yes/all)+'%')
//     console.log(yes) 
//     console.log(all)
//     console.log(totalScore)
//     return totalScore}
// }