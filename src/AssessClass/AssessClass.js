import React from 'react';
import { Link } from 'react-router-dom';
import AssessmentContainer from './AssessmentContainer'
import { api } from '../services/api'


class AssessClass extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      // assessments:props.assessments,
      assessments:this.props.assessments,
      // teacher:props.loggedIn,
      // thisPeriod:'',
      roster:this.props.roster,
      toAssess:'',
      // assessFrom:[],
      assessing:[],
      // score: true,
      sessionCounter: 0,
      // floorScore:'',
      // test:''
    }
  }

  componentDidMount(props){
    this.buildAssessmentIndex()
    const {match} = this.props
    const id = (parseInt(match.params))
  }

  logEach = (e) => {
    // e.preventDefault()
    // console.log(e)
    e.map( item => {console.log(item.name)})
  }

  buildAssessmentIndex = () => {
    let roster=this.props.roster
    let assessments=this.props.assessments
    let allAssessmentIndex = []
    roster.map(student => {
      let counter = 1 
        assessments.map( assessment => {
          if (assessment.student_id === student.id){
            console.log(assessment.student_id)
            counter = counter+1
          }
        })
      let studentEntry = [student, counter]
      allAssessmentIndex.push(studentEntry)
    })
    console.log(allAssessmentIndex)
    const sortMe = allAssessmentIndex.sort((a,b) => a[[1]] - b[[1]])
    this.makeList(allAssessmentIndex)
  }

  makeList = (list) => {
    let toAssess = []
    var i
    let number = (list.length*.4).toFixed(0)
    for (i = 0; i < number; i++)
    {toAssess.push(list[i][0])}
    this.setState({toAssess:toAssess})
  }

  nextAssessment = () => {
    let pool = this.state.toAssess
    let index = pool.length
    let now = pool[Math.floor(Math.random() * index)]
    let counter=this.state.sessionCounter
    this.setState({
      assessing:now
    })
    // console.log(pool)
    // this.logEach(now)
  }

  assessed = (e) =>{
    let counter=this.state.sessionCounter +1 
    let participation = ''
    // let period = this.props.classPeriod
    if (this.state.score == 'true') {participation = true} else {participation = false}
    const assessment = {
      participating:participation,
      // class_period_id:period,
      class_period_id:this.props.classPeriod,
      student_id:e.id,
    }
    // console.log(assessment)
    api.posts.postAssessment(assessment) 
    this.setState({
      score:'',
      sessionCounter:counter
    })
    this.reviseAssessList(e)
  }

  reviseAssessList(assessedStudent){
    console.log("assessed and removed " + assessedStudent.name)
    let pool = this.state.toAssess
    let counter = 0
    pool.map(student => {
      counter++
      if (student == assessedStudent){
        const newPool = pool.filter(student => student !== assessedStudent)
        this.setState({
          toAssess:newPool
        })
      }
    })
    this.nextAssessment()
  }

  setScore = (e) => {
    this.setState({
      score:e
    })
  }

  checkCallback = () => {
    this.nextAssessment()
  }

  displayPage(){
    let count = this.state.sessionCounter
    if (count < 5 ) {

    return(
        <AssessmentContainer assessButton={ (e) => this.checkCallback()} classRoster={this.state.assessing} score={this.state.score} setScore={this.setScore} assessed={(e) => this.assessed(e)}/>
    // <li>placeholder</li>
        )
    } 
    else {
      return(
        <div>
          thats all for today
          <br></br>
          <button onClick={this.props.fetchAssessments}><Link to={`/classHome/${this.props.classPeriod}/roster`}>Return to class home page</Link></button>
        </div>
      )
    }
  }





  makeCards = () => {
    if (this.state.toAssess == '') {
      return(
        <div className="hat">
          loading
        </div>
      )
    }else{
      return(
        <div className="l">
          loaded
        </div>
      )
    }

  }
 
  render(){
    return(
      <div>        
        {this.makeCards()}
        {/* {this.displayPage()} */}
      
      </div>
    )
  }

} export default AssessClass

  // assessmentList = () => {
  //   let allAssessmentIndex = []
  //   let readyToAssess = []
  //   // map through all of the assessments and create a list (allAssessmentIndex) that contains an array for each student 
  //   // with the student object and an integer representing the number of times that student has been assessed.
  //   this.state.classRoster.map(student =>{
  //     let counter = 0
  //       this.state.assessments.map(assessment => {
  //         if (assessment.student_id === student.id){
  //           counter = counter+1
  //         } 
  //       })
  //     let studentEntry = [student, counter]
  //     allAssessmentIndex.push(studentEntry)
  //     this.setState({
  //       assessmentIndex:allAssessmentIndex
  //   })
  //   })
  //   this.filterAssessments(allAssessmentIndex)
  // }

    // fetchStudentsAssessments = (e) => {
  //   e.preventDefault()
  //   api.get.studentsAssessments({student_id:1})
  //   // .then(res => this.setState({registrations:res}))
  //   .then(res => console.log(res))
  // }

  // fetchClass = (id) => {
  //   (api.get.classList({class_period_id:id}))
  //   // .then(res => console.log(res))
  //   .then(res => this.fetchClassesAssessments(id, res))
  //   .then(res => this.setState({classRoster:res}))
  // }

  // fetchClassesAssessments = (id, classList) => {
  //   api.get.classesAssessments({class_period_id:id})
  //   .then(res => this.newAssessmentList(res, classList))
  //   // .then(res => (this.setState({classesAssessments:res})))
  // }

    // eligibleList = (list, floorScore) => {
  //   let eligible = []
  //   let ineligable = []
  //     // map through the full class roster and push all students with the lowest ammount of assessments into the eligible list
  //   list.map(student => {
  //     if(student[1] == floorScore) {{eligible.push(student[0])}{this.setState({assessFrom:eligible})}} else {ineligable.push(student)}
  //   },)
  //   if (eligible.length < 10){

  //     const sorted = ineligable.sort((a,b) => a[[1]] - b[[1]])
  //     let newbase = eligible
  //     let counter = eligible.length
  //     sorted.map(student=>{if(counter < 10){newbase.push(student[0])}{counter=(counter + 1)}{this.setState({assessFrom:newbase})}})
  //   }
  // }