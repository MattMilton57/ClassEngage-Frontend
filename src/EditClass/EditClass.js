import React from 'react';
import './EditClass.css';
import ClassRosterContainer from './ClassRosterContainer'
import StudentBodyContainer from './StudentBodyContainer'
import NewStudentContainer from './NewStudentContainer';
import { api } from '../services/api'


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
      thisPeriod:this.props.currentPeriod,
      newKids:[],
      goneKids:[],
      registerFrom:[],
      registrations:'',
      hat:[]
    }
  }

  componentDidMount(){
    // const id = this.props.thisPeriod
    //////// REMOVE ///////////
    const id = this.props.thisPeriod
    this.props.navButtons(DefaultButtons)
    this.fetchStudents(id)
    this.fetchClass(id)
    this.fetchRegistrations(id)
  }

  fetchStudents = () => {
    api.get.fetchStudents()
    // .then(res => console.log(res))
    .then(res => this.setState({allStudents:res}))
    // .then(this.remainingStudents)
  }

  fetchRegistrations = (id) => {
    (api.get.filteredRegistrations({class_period_id:id}))
    .then(res => this.setState({registrations:res}))
    // .then(this.remainingStudents)
  }

  fetchClass = (id) => {
    (api.get.classList({class_period_id:id}))
    // .then(res => console.log(res))
    .then(res => this.setState({classRoster:res}))
    .then(res => this.remainingStudents())
  }

  remainingStudents = () => {
    ///create array of enrolled student ID numbers///
    let classRoster=this.state.classRoster
    let rosterNumbers=[]
    classRoster.map(s=>{rosterNumbers.push(s.id)})
  
    ///create array of all student ID numbers///
    let allStudents = this.state.allStudents
    let allNumbers=[]
    allStudents.map(s=>{allNumbers.push(s.id)})

    ///create array of non enrolled student ID numbers///
    let registerNumbers=[]
    allNumbers.map(student=>{
      if (rosterNumbers.includes(student)==false)
      {registerNumbers.push(student)}
    }) 

    ///translate that array into list of non enrolled students///
    let registerFrom = [] 
    registerNumbers.map( number => {
      allStudents.map( student => {
        if(number == student.id){
          registerFrom.push(student)
        }
      })
    })
    // .then(this.setState({registerFrom:registerFrom}))
  console.log(registerFrom)
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
      api.posts.postRegistration({class_period_id:this.props.thisPeriod, student_id:e.id})
      this.sendClass()
  }

  removeFromClass = (e) => {
    let currentClass=this.state.classRoster
    let studentBody=this.state.allStudents
    let goneKids=this.state.goneKids
    goneKids.push(e)
    let newClass=currentClass.filter(currentClass => currentClass !== e)
    console.log(newClass) 
    console.log(currentClass)
    studentBody.push(e) 
    this.setState(
      {classRoster:newClass, 
      allStudents:studentBody,
      goneKids:goneKids})
    console.log(e)
      this.removeFetch(e.id)
      this.sendClass()
  }

  removeFetch = (id) => {
    let registrations = this.state.registrations
    registrations.map( r => {if (r.student_id == id)
      {api.delete.deleteRegistration(r.id)}})
  }

  sendClass = () => {
    this.props.setClass(this.state.classRoster)   
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
          <NewStudentContainer
            callback={this.fetchStudents}/>

        </div>
      </div>
    )
  }
  
} export default EditClass

// t.integer "class_period_id", null: false
// t.integer "student_id", null: false
//origional functions for using the submit button to send all of the class fetches to the app fetch at once. Did not work. nope. 

  // setClass=(e)=>{
  //   this.register()
  //   this.deRegister()
  // }

  // register = (e) => {
  //   // console.log(this.state.newKids)
  //   let mapMe=this.state.newKids
  //   // mapMe.map(student=>{console.log(student.name)})
  //   // console.log(e)
  //   // this.props.sendRegistration({class_period_id:this.state.thisClass.id, student_id:e.id})
  //       // console.log(e)
  //   // this.props.sendRegistration({class_period_id:this.state.thisClass.id, student_id:e.id})
    
  //   // keep below!!!!!!
  //   // console.log(mapMe)
  //   // mapMe.map(student=>{console.log(student.name)})
  //   let newRegistrations = []
  //   mapMe.map(student=> {
  //   const registration = {
  //     class_period_id: this.state.thisPeriod,
  //     student_id: student.id,
  //     }
  //   newRegistrations.push(registration)     
  // })
  // this.props.sendRegistration(newRegistrations) 
  // this.setState({newKids:[]})
  // }

  // deRegister=()=>{
  //   let toDeregister = this.state.goneKids
  //   toDeregister.map(student=>{this.props.deleteRegistration(student)})
  //   this.setState({goneKids:[]})
  // }