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
      thisPeriod:'',
      newKids:[],
      goneKids:[],
      registerFrom:[]
    }
  }

  componentDidMount(){
    this.props.navButtons(DefaultButtons)
    this.setState({
      classRoster: this.props.thisClass,
      thisPeriod:this.props.thisPeriod,
    })
    this.remainingStudents()
  }

  remainingStudents = () => {
    let studentBody=this.props.studentBody
    let classRoster=this.props.thisClass
    let registerFrom=[]
    // console.log(classRoster)
      studentBody.map(student=>{
        if (classRoster.includes(student)==false)
        {registerFrom.push(student)}
      }) 
    this.setState({allStudents:registerFrom})  
  }

  addToClass = (e)=> {
    let currentClass=this.state.classRoster
    let studentBody=this.state.allStudents
    let newKids=this.state.newKids
    newKids.push(e)
    let newBody=studentBody.filter(studentBody => studentBody !== e)
    currentClass.push(e) 
    this.setState(
      {classRoster:currentClass, 
      allStudents:newBody,
      newKids:newKids})
  }

  removeFromClass = (e) => {
    let currentClass=this.state.classRoster
    let studentBody=this.state.allStudents
    let goneKids=this.state.goneKids
    goneKids.push(e)
    let newClass=currentClass.filter(currentClass => currentClass !== e)
    studentBody.push(e) 
    this.setState(
      {classRoster:newClass, 
      allStudents:studentBody,
      goneKids:goneKids})
  }

  setClass=(e)=>{
    this.register()
    this.deRegister()
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
    let newRegistrations = []
    mapMe.map(student=> {
    const registration = {
      class_period_id: this.state.thisPeriod,
      student_id: student.id,
      }
    newRegistrations.push(registration)     
  })
  this.props.sendRegistration(newRegistrations) 
  this.setState({newKids:[]})
  }

  deRegister=()=>{
    let toDeregister = this.state.goneKids
    toDeregister.map(student=>{this.props.deleteRegistration(student)})
    this.setState({goneKids:[]})
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