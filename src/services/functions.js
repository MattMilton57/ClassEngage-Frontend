const test = () => {
    console.log("testing")
}

const buildList = (roster, classesAssessments) => {
    let classRoster=roster
    let assessments=classesAssessments
    // console.log(roster, classesAssessments)
    let masterList = []
    classRoster.map( student => {
      let studentsAssessments=[]
      assessments.map(assessment => {
        if (assessment.student_id == student.id){
          studentsAssessments.push(assessment)
        }
      })
      let participating = []
      studentsAssessments.map( assessment => {
        if (assessment.participating == true){
          participating.push(assessment)
        }
      })
      let score = (participating.length / studentsAssessments.length).toFixed(0)
      masterList.push([student, studentsAssessments, score])
    })
    return(masterList)
  }

export const functions = {
    tests: {
        test,
    },

    build: {
        buildList,
    }
}