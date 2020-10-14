import React from 'react';
import './App.css';
import LandingPage from './LandingPage/LandingPage.js'
import SelectClass from './SelectClass/SelectClass.js'
import ClassHome from './ClassHome/ClassHome.js'
import EditClass from './EditClass/EditClass.js'
import NavButtons from './NavButtons/NavButtons.js'
import Header from './Header/Header'
import AssessClass from './AssessClass/AssessClass.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const API = "http://localhost:3000/"
const DefaultButtons = [
  {Label:"Landing Page", Destination:'/'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"Class Assessment", Destination:'/assess'},
  {Label:"ClassHome", Destination:'/classhome'}]

class App extends React.Component {

  constructor() {
    super();
    this.state= {
      allStudents: [],
      allTeachers: [],
      allClassPeriods: [],
      allRegistrations: [],
      allAssessments: [],
      currentAssessments: [],
      currentTeacher: 1,
      currentPeriod: 0,
      currentClass:1,
      currentButtons:DefaultButtons
    }
  }

  componentDidMount(){
    console.log('mounted')
    this.fetchStudents("bob")
  }

  fetchStudents = (C) => {
    fetch(API+"students")
      .then((res) => res.json())
      .then((data) => {
        this.setState(
          {
            allStudents: data,
          },
          console.log("student fetch")
        );this.fetchTeachers()
      });
  };

  fetchTeachers = (C) => {
    fetch(API+"teachers")
      .then((res) => res.json())
      .then((data) => {
        this.setState(
          {
            allTeachers: data,
          },
          console.log("teacher fetch")
        ); this.fetchClasses()
      });
  };

  fetchClasses = (C) => {
    fetch(API+"class_periods")
      .then((res) => res.json())
      .then((data) => {
        this.setState(
          {
            allClassPeriods: data,
          },
          console.log("class fetch")
        ); this.fetchRegistrations()
      });
  };

  fetchRegistrations = (C) => {
    fetch(API+"registrations")
      .then((res) => res.json())
      .then((data) => {
        this.setState(
          {
            allRegistrations: data,
          },
          console.log("registrations fetch")
        ); this.fetchAssessments()
      });
  };

  fetchAssessments = (C) => {
    fetch(API+"assessments")
      .then((res) => res.json())
      .then((data) => {
        this.setState(
          {
            allAssessments: data,
          },
          console.log("assessments fetch")
        ); 
      });
  };

  postRegistration = (registration) => {
    fetch((API+"registrations"), {
        method: 'POST',
        headers: {
            'access-control-allow-origin':'*',
            'Content-Type': 'application/json',
            'Accept':'application/json'
        }, 
        body: JSON.stringify({registration})
    })
    .then(res => res.json())
    .then(res => console.log("registration"+ res.id + "done"))
    console.log(registration)
    this.fetchRegistrations()
}  

  postAssessment = (assessment) => {
    fetch((API+"assessments"), {
        method: 'POST',
        headers: {
            'access-control-allow-origin':'*',
            'Content-Type': 'application/json',
            'Accept':'application/json'
        }, 
        body: JSON.stringify({assessment})
    })
    .then(res => res.json())
    .then(res => console.log("assessment at index:"+ res.id + " done"))
    console.log(assessment)
    this.fetchAssessments()
  } 

  setTeacher = (teacher) => {
    this.setState({
      currentTeacher:teacher
    })
  }

  setPeriod = (thisPeriod) => {
    this.setState({
      currentPeriod:thisPeriod.id
    })
  }

  setButtons = (navButtons) => {
    this.setState({
      currentButtons: navButtons
    })
  }

  setClass = (thisClass) => {
    this.setState({
      currentClass:thisClass
    })
  }

  setAssessments = (currentClassAssessments) => {
    this.setState ({
      currentAssessments:currentClassAssessments
    })
  }

  render(){
    return(
      <Router>
        <Header />
        <div>
          <Route exact path = "/"
          component={ props => 
            <LandingPage 
              teachers={this.state.allTeachers} 
              navButtons={this.setButtons}
              whoAmI={this.setTeacher}/>
          }/>

          <Route exact path = "/selectClass"
          render={ props => 
            <SelectClass 
              classes={this.state.allClassPeriods} 
              loggedIn={this.state.currentTeacher}
              navButtons={this.setButtons} 
              selected={this.setPeriod} 
              />
          }/>

          <Route exact path = "/classhome"
          render={ props => 
            <ClassHome 
              assessments={this.state.allAssessments} 
              loggedIn={this.state.currentTeacher} 
              registrations={this.state.allRegistrations} 
              studentBody={this.state.allStudents} 
              thisPeriod={this.state.currentPeriod} 
              navButtons={this.setButtons}
              setAssessments={this.setAssessments}
              setClass={this.setClass} 
              />
          }/>
          <Route exact path = "/editclass"
          render={ props => 
            <EditClass 
              loggedIn={this.state.currentTeacher} 
              studentBody={this.state.allStudents}  
              thisPeriod={this.state.currentPeriod} 
              navButtons={this.setButtons} 
              sendRegistration={this.postRegistration}
              />
          }/>
          <Route exact path = "/assess"
          render={ props => 
            <AssessClass 
              assessments={this.state.currentAssessments}
              loggedIn={this.state.currentTeacher} 
              roster={this.state.currentClass} 
              thisPeriod={this.state.currentPeriod} 
              navButtons={this.setButtons} 
              sendAssessment={this.postAssessment}
              />
          }/>          
        </div>
        <NavButtons 
          buttons={this.state.currentButtons}/>
      </Router>
      

    )
  }

} export default App
