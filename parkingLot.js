import React from 'react';
import './EditClass.css';
import ClassRosterContainer from './ClassRosterContainer'
import StudentBodyContainer from './StudentBodyContainer'

const DefaultButtons = [
  {Label:"Landing Page", Destination:'/'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"ClassHome", Destination:'/classhome'}]
class EditClass extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      allStudents: [],
      classRoster: [],
      thisPeriod:''
    }
  }

  componentDidMount(){
    this.props.navButtons(DefaultButtons)
    this.setState({
      classRoster: this.props.thisClass,
      allStudents:this.props.studentBody,
      thisPeriod:this.props.thisPeriod,
    })
  }

  addToClass = (e)=> {
    let currentClass=this.state.classRoster
    let studentBody=this.state.allStudents
    let newBody=studentBody.filter(studentBody => studentBody !== e)
    currentClass.push(e)
    this.setState({classRoster:currentClass, allStudents:newBody})
  }

  removeFromClass = (e) => {
    let currentClass=this.state.classRoster
    let studentBody=this.state.allStudents
    let newClass=currentClass.filter(currentClass => currentClass !== e)
    studentBody.push(e)
    this.setState({classRoster:newClass, allStudents:studentBody})
  }

  setClass=(e)=>{
    let currentClass=this.state.classRoster
    let studentBody=this.state.allStudents
    currentClass.map(student=>{this.register(student)})
    // this.deRegister()
  }

  // deRegister=(e)=>{
  //   this.props.thisClass.map(student=>{
  //     if (this.state.classRoster.includes(student) == false) 
  //       console.log(student)})
  // }

  // filterAssessments(list){
  //   let floorScore = ''
  //     // map through list of students to establish the lowest # of assessments taken
  //   list.map(student => {
  //     if (floorScore == ''){floorScore = student[1]}
  //       else{
  //     if (student[1] < floorScore){floorScore = student[1]}}
  //   })
  //     // send the list and the established lowest score to the function that creates the final list.
  //   this.eligibleList(list, floorScore)
  // }

  register = (e) => {
    // console.log(e)
    // this.props.sendRegistration({class_period_id:this.state.thisClass.id, student_id:e.id})
        // console.log(e)
    // this.props.sendRegistration({class_period_id:this.state.thisClass.id, student_id:e.id})
    const registration = {
      class_period_id: this.state.thisPeriod,
      student_id: e.id,
      }
    this.props.sendRegistration(registration)  
    this.setState({
      classRoster:this.props.thisClass
    })
  }

  render(){
    return(
      <div>
        <div id="submit button">
          <button onClick={this.setClass}>Set Class</button>
        </div>
        <div name="hat" id='Rroster'>
          <ClassRosterContainer 
            students={this.state.classRoster} 
            callback={this.removeFromClass}/>
          <StudentBodyContainer 
            students={this.state.allStudents} 
            callback={this.addToClass}/>
        </div>
      </div>
    )
  }

} export default EditClass

// t.integer "class_period_id", null: false
// t.integer "student_id", null: false