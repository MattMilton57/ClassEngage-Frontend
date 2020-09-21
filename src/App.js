import React from 'react';
import './App.css';
import LandingPage from './LandingPage/LandingPage.js'
import SelectClass from './SelectClass/SelectClass.js'
import ClassHome from './ClassHome/ClassHome.js'
import EditClass from './EditClass/EditClass.js'
import NavButtons from './NavButtons/NavButtons.js'
import Header from './Header/Header'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const API = "http://localhost:3000/"
const DefaultButtons = [
  {Label:"Landing Page", Destination:'/'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"ClassHome", Destination:'/classhome'}]

class App extends React.Component {

  constructor() {
    super();
    this.state= {
      students: [],
      teachers: [],
      classPeriods: [],
      registrations: [],
      assessments: [],
      currentTeacher: '',
      currentPeriod: 0,
      currentClass:'',
      buttons:DefaultButtons
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
            students: data,
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
            teachers: data,
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
            classPeriods: data,
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
            registrations: data,
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
            assessments: data,
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
      buttons: navButtons
    })
  }

  setClass = (thisClass) => {
    this.setState({
      currentClass:thisClass
    })
  }

  render(){
    return(
      <Router>
        <Header />
        <div>
          <Route exact path = "/"
          component={ props => 
            <LandingPage teachers={this.state.teachers}whoAmI={this.setTeacher} navButtons={this.setButtons}/>
          }/>

          <Route exact path = "/selectClass"
          render={ props => 
            <SelectClass classes={this.state.classPeriods} loggedIn={this.state.currentTeacher} selected={this.setPeriod} navButtons={this.setButtons}/>
          }/>

          <Route exact path = "/classhome"
          render={ props => 
            <ClassHome thisPeriod={this.state.currentPeriod} studentBody={this.state.students} registrations={this.state.registrations} loggedIn={this.state.currentTeacher} setClass={this.setClass} navButtons={this.setButtons}/>
          }/>
          <Route exact path = "/editclass"
          render={ props => 
          <EditClass thisPeriod={this.state.currentPeriod} studentBody={this.state.students} loggedIn={this.state.currentTeacher} navButtons={this.setButtons} sendRegistration={this.postRegistration}/>
          }/>
        </div>
        <NavButtons buttons={this.state.buttons}/>
      </Router>
      

    )
  }

} export default App
