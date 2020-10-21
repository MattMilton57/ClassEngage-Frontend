import React from 'react';
import RosterContainer from '../Recyclables/Roster/RosterContainer';
import Graphics from '../Recyclables/Graphics/GraphicsContainer'
import AssessmentContainer from './AssessmentContainer'


const homeButtons = [
  {Label:"Edit Class", Destination:'/editclass'},
  {Label:"Landing Page", Destination:'/'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"ClassHome", Destination:'/classhome'}]

class AssessClass extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      assessments:props.assessments,
      teacher:props.loggedIn,
      thisPeriod:'',
      classRoster:props.roster,
      assessmentIndex:'',
      assessFrom:[],
      assessing:[],
      score: true,
      sessionCounter: 0,
      floorScore:'',
      test:''
    }
  }

  componentDidMount(props){
    this.props.navButtons(homeButtons)
    this.assessmentList()
    console.log(this.state.assessments)
    this.setPeriod()
  }

  setPeriod(){
    this.setState({thisPeriod:this.props.thisPeriod})
  }

  assessmentList = () => {
    let allAssessmentIndex = []
    let readyToAssess = []
    // map through all of the assessments and create a list (allAssessmentIndex) that contains an array for each student 
    // with the student object and an integer representing the number of times that student has been assessed.
    this.state.classRoster.map(student =>{
      let counter = 0
        this.state.assessments.map(assessment => {
          if (assessment.student_id === student.id){
            counter = counter+1
          } 
        })
      let studentEntry = [student, counter]
      allAssessmentIndex.push(studentEntry)
      this.setState({
        assessmentIndex:allAssessmentIndex
    })
    })
    this.filterAssessments(allAssessmentIndex)
  }

  filterAssessments(list){
    let floorScore = ''
      // map through list of students to establish the lowest # of assessments taken
    list.map(student => {
      if (floorScore == ''){floorScore = student[1]}
        else{
      if (student[1] < floorScore){floorScore = student[1]}}
    })
      // send the list and the established lowest score to the function that creates the final list.
    this.eligibleList(list, floorScore)
  }

  eligibleList = (list, floorScore) => {
    let eligible = []
    let ineligable = []
      // map through the full class roster and push all students with the lowest ammount of assessments into the eligible list
    list.map(student => {
      if(student[1] == floorScore) {{eligible.push(student[0])}{this.setState({assessFrom:eligible})}} else {ineligable.push(student)}
    },)
    if (eligible.length < 10){

      const sorted = ineligable.sort((a,b) => a[[1]] - b[[1]])
      let newbase = eligible
      let counter = eligible.length
      sorted.map(student=>{if(counter < 10){newbase.push(student[0])}{counter=(counter + 1)}{this.setState({assessFrom:newbase})}})
    }
  }

  nextAssessment = () => {
    let pool = this.state.assessFrom
    let index = pool.length
    let now = pool[Math.floor(Math.random() * index)]
    let counter=this.state.sessionCounter
    this.setState({
      assessing:now
    })
  }

  assessed = (e) =>{
    let counter=this.state.sessionCounter +1 
    let participation = ''
    let period = this.state.thisPeriod
    if (this.state.score == 'true') {participation = true} else {participation = false}
    const assessment = {
      participating:participation,
      class_period_id:period,
      student_id:e.id,
    }
    this.props.sendAssessment(assessment) 
    this.setState({
      score:'',
      sessionCounter:counter
    })
    this.reviseAssessList(e)
  }

  reviseAssessList(assessedStudent){
    let pool = this.state.assessFrom
    let counter = 0
    pool.map(student => {
      counter++
      if (student == assessedStudent){
        const newPool = pool.filter(student => student !== assessedStudent)
        this.setState({
          assessFrom:newPool
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
    )
    } else {
      return(
        <div>thats all for today</div>
      )
    }
  }
 
  render(){
    return(
      <div>
        {this.displayPage()}
      </div>
    )
  }

} export default AssessClass