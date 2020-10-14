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
      thisPeriod:props.thisPeriod,
      classRoster:props.roster,
      assessmentIndex:'',
      toAssess:[],
      assessing:[],
      score:'',
      sessionCounter: 0
    }
  }

  componentDidMount(props){
    this.props.navButtons(homeButtons)
    this.assessmentList()
  }

  assessmentList = () => {
    let allAssessmentIndex = []
    let readyToAssess = []
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
    allAssessmentIndex.map (student => {
      let index = (allAssessmentIndex.length - 1)
      if (allAssessmentIndex[0][1] > allAssessmentIndex[index][1])
          {console.log(student)
          console.log(index)}
          else
          {console.log(student+' no')}
    })
    allAssessmentIndex.map (student => {
      readyToAssess.push(student[0])
    })
    this.setState({
      toAssess:readyToAssess
    })
  }

  nextAssessment = () => {
    let pool = this.state.toAssess
    let index = pool.length
    let now = pool[Math.floor(Math.random() * index)]
    let counter=this.state.sessionCounter
    this.setState({
      assessing:now
    })
    pool.map(student => {
      if (now.id === student.id){
        console.log(now.name, student.name)
        console.log(counter)
      }
    })
  }

  assessed = (e) =>{
    console.log(e.id)
    let counter=this.state.sessionCounter +1 
    const assessment = {
      participating:this.state.score,
      teacher_id:this.state.teacher,
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
    let pool = this.state.toAssess
    let counter = 0
    pool.map(student => {
      counter++
      if (student == assessedStudent){
        const newPool = pool.filter(student => student !== assessedStudent)
        console.log(pool) 
        console.log(newPool)
        this.setState({
          toAssess:newPool
        })
      }
    })
    console.log(this.state.toAssess.length)
    this.nextAssessment()
  }

  setScore = (e) => {
    this.setState({
      score:e
    })
  }

  checkCallback = () => {
    console.log('callbackk button')
    this.nextAssessment()
  }

  displayPage(){
    let count = this.state.sessionCounter
    if (count < 5 ) {

    return(
    //   <div>
    //     Asses Class Page
    //     {/* <div onClick={() => this.nextAssessment()}>Click Me</div> */}
    //     {/* {this.todaysAssessment()} */}
        <AssessmentContainer assessButton={ (e) => this.checkCallback()} classRoster={this.state.assessing} score={this.state.score} setScore={this.setScore} assessed={(e) => this.assessed(e)}/>
      // </div>
    )
    } else {
      return(
        <div>thats all for today</div>
      )
    }
  }
 
  render(){
    return(
      // <div>
      //   Asses Class Page
      //   {/* <div onClick={() => this.nextAssessment()}>Click Me</div> */}
      //   {/* {this.todaysAssessment()} */}
      //   <AssessmentContainer assessButton={ (e) => this.checkCallback()} classRoster={this.state.assessing} score={this.state.score} setScore={this.setScore} assessed={(e) => this.assessed(e)}/>
      // </div>
      <div>
        {this.displayPage()}
      </div>
    )
  }

} export default AssessClass