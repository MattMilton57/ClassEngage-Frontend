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
      newKids:[],
      goneKids:''
    })
  }

  addToClass = (e)=> {
    let currentClass=this.state.classRoster
    let studentBody=this.state.allStudents
    // if (this.state.newKids=''){let newKids=["hat"]}else{let newKids = this.state.newKids}
    // console.log(newKids)
    // let newKids= this.state.newKids
    // let addAKid= (newKids.push(e))
    // console.log(addAKid)
    let newKids=this.state.newKids
    newKids.push(e)
    // console.log(newKids)
    let newBody=studentBody.filter(studentBody => studentBody !== e)
    currentClass.push(e) 
    this.setState(
      {classRoster:currentClass, 
      allStudents:newBody,
      newKids:newKids})
      // newKids:addAKid})
  }

  removeFromClass = (e) => {
    let currentClass=this.state.classRoster
    let studentBody=this.state.allStudents
    let goneKids=this.state.goneKids
    let newClass=currentClass.filter(currentClass => currentClass !== e)
    studentBody.push(e) 
    goneKids.push(e)
    this.setState(
      {classRoster:newClass, 
      allStudents:studentBody,
      goneKids:goneKids})
  }

  setClass=(e)=>{
    this.register()
    // let currentClass=this.state.newKids
    // let studentBody=this.state.allStudents
    // currentClass.map(student=>{this.register(student)})
  }

  register = (e) => {
    // console.log(this.state.newKids)
    let mapMe=this.state.newKids
    // mapMe.map(student=>{console.log(student.name)})
    // console.log(e)
    // this.props.sendRegistration({class_period_id:this.state.thisClass.id, student_id:e.id})
        // console.log(e)
    // this.props.sendRegistration({class_period_id:this.state.thisClass.id, student_id:e.id})
    
    // keep below!!!!!!
    // console.log(mapMe)
    // mapMe.map(student=>{console.log(student.name)})
    mapMe.map(student=> {
    const registration = {
      class_period_id: this.state.thisPeriod,
      student_id: student.id,
      }
    this.props.sendRegistration(registration)     
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