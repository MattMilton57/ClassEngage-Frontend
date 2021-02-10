import React from 'react';
import './EditClass.css';
import ClassRosterContainer from './ClassRosterContainer'
import StudentBodyContainer from './StudentBodyContainer'
import NewStudentContainer from './NewStudentContainer';
import { api } from '../services/api'

class EditClass2 extends React.Component {

  componentDidMount(){
    this.props.fetchClass()
  }

  classRoster = () => {
    this.props.roster.sort(function(a, b){
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0 
    })
    return (
      <ClassRosterContainer 
      students={this.props.roster} 
      callback={this.findReg}/>
    )
  }

  remainingStudents = () => {
    ///create array of enrolled student ID numbers///
    let classRoster=this.props.roster
    let rosterNumbers=[]
    this.props.roster.map(s=>{rosterNumbers.push(s.id)})
  
    ///create array of all student ID numbers///
    let studentBody = this.props.studentBody
    let allNumbers=[]
    this.props.studentBody.map(s=>{allNumbers.push(s.id)})

    ///create array of non enrolled student ID numbers///
    let registerNumbers=[]
    allNumbers.map(student=>{
      if (rosterNumbers.includes(student)==false)
      {registerNumbers.push(student)}
    }) 

    ///translate that array into list of non enrolled students///
    let registerFrom = [] 
    registerNumbers.map( number => {
      studentBody.map( student => {
        if(number == student.id){
          registerFrom.push(student)
        }
      })
    })

    ///alphebatize list
    registerFrom.sort(function(a, b){
      var x = a.name.toLowerCase();
      var y = b.name.toLowerCase();
      if (x < y) {return -1;}
      if (x > y) {return 1;}
      return 0 
    })

    return(         
       <StudentBodyContainer 
      students={registerFrom} 
      callback={this.handleAdd}/>
    ) 
  }

  handleAdd = (e) => {
    this.props.register(e)
  }

  handleRemove = (r,s) => {
    this.props.deRegister(r)
  }

  findReg= (e) => {
    this.props.registrations.map( r => {
      if (r.student_id == e.id)
      {this.handleRemove(r.id, e)}
    })
  }

  test = () => {
    // console.log('test button')
    this.props.fetchClass()
  }
  
  render(){
    return(
      <div>
          <div id="submit button">
            <button onClick={this.test}>Test</button>
          </div>

          <div name="roster" id='roster'>
            <h1>Class Roster</h1>
            {this.classRoster()}
          </div>

          <div id='remainingStudents'>
            <h1>Student Body</h1>
            {this.remainingStudents()}
          </div>

          <div id='newStudentForm'>
            <NewStudentContainer
              callback={this.props.test}/>
          </div>  
      </div>
    )
  }
  
} export default EditClass2