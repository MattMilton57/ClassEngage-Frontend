import React from 'react';
import './App.css';
import LandingPage from './LandingPage/LandingPage.js'
import SelectClass from './SelectClass/SelectClass.js'
import ClassHome from './ClassHome/ClassHome.js'
import StudentHome from './StudentHome/StudentHome.js'
import EditClass from './EditClass/EditClass.js'
import NavButtons from './NavButtons/NavButtons.js'
import Header from './Header/Header'
import AssessClass from './AssessClass/AssessClass.js'
import LogIn from './LogIn/LogInPage.js'
import Register from './Register/RegisterPage.js'
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
      currentStudent:'',
      currentTeacher: '',
      currentPeriod: '',
      currentClass:'',
      currentButtons:DefaultButtons,
      auth:{user:{}}
    }
  }

  componentDidMount(){
    console.log('mounted')
    this.fetchStudents("bob")
    this.fetchTeachers()
    this.fetchClasses()
    this.fetchRegistrations()
    this.fetchAssessments()
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
        );
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
        ); 
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
        ); 
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
        ); 
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


//   postRegistration = (newRegistrations) => {
//     console.log(newRegistrations)
//     // newRegistrations.map(registration =>{
//     fetch((API+"registrations"), {
//         method: 'POST',
//         headers: {
//             'access-control-allow-origin':'*',
//             'Content-Type': 'application/json',
//             'Accept':'application/json'
//         }, 
//         body: JSON.stringify({newRegistrations})
//     })
//     .then(res => res.json())
//     .then(this.fetchRegistrations())
//   // })
// }  

//   postRegistration = (newRegistrations) => {
//     console.log(newRegistrations)
//     fetch((API+"registrations"), {
//         method: 'POST',
//         headers: {
//             'access-control-allow-origin':'*',
//             'Content-Type': 'application/json',
//             'Accept':'application/json'
//         }, 
//         body: JSON.stringify({newRegistrations})
//     })
//     .then(res => res.json())
//     .then(res=>console.log(res))
//     // .then(res => console.log("registration"+ res.id + "done"))
//     console.log(newRegistrations)
//     this.fetchRegistrations()
// }  

postTeacher = (teacher) => {
  fetch((API+"teachers"), {
      method: 'POST',
      headers: {
          'access-control-allow-origin':'*',
          'Content-Type': 'application/json',
          'Accept':'application/json'
      }, 
      body: JSON.stringify({teacher})
  })
  .then(res => res.json())
  .then(res => console.log(res))
  .then(this.fetchTeachers())
} 

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
  .then(res => console.log(res))
  .then(this.fetchRegistrations())
} 

  postAssessment = (assessment) => {
    console.log(assessment)
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
    .then(res => console.log(res))
    this.fetchAssessments()   
  }
  
  deleteRegistrations = (student) => {
    this.state.allRegistrations.map(registration=>{
      if (registration.student_id == student.id){
        let candidate = registration
        if (candidate.class_period_id == this.state.currentPeriod){
            fetch(API + "registrations/" + registration.id, {
            method: 'DELETE',
          }).then (res => console.log(res))
          .then (console.log(student.name + " removed"))
          .then(this.fetchRegistrations())
        }
      }this.fetchRegistrations()}
    )}

    // deleteRegistrations = (student) => {
    //   this.state.allRegistrations.map(registration=>{
    //     if (registration.student_id == student.id){
    //       let candidate = registration
    //       if (candidate.class_period_id == this.state.currentPeriod){
    //           fetch(API + "registrations/" + registration.id, {
    //           method: 'DELETE',
    //         }).then (res => console.log(res))
    //         .then (console.log(student.name + " removed"))
    //         .then(this.fetchRegistrations())
    //       }
    //     }}
    //   )}

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

  setStudent = (thisStudent) => {
    console.log(thisStudent)
    this.setState({
      currentStudent:thisStudent
    })
  }

  setAssessments = (currentClassAssessments) => {
    console.log(currentClassAssessments)
    this.setState ({
      currentAssessments:currentClassAssessments
    })
  }

  refresh = (e) => {
    e.preventDefault()
    this.fetchAssessments()
  }

  onLogin = (data) => {
    console.log(data)
    const newstate = {...this.state.auth, user: {...data}}
    localStorage.setItem("token", data.jwt)
    this.setState({ auth:newstate})

  }

  onLogout = () => {
    localStorage.removeItem("token")
    this.setState({ auth: {user:{}}})
  }

  render(){
    const {user} = this.state.auth
    return(
      <Router>
        <Header />
        <NavButtons 
          buttons={this.state.currentButtons} user={this.state.auth.user}/>
        <div> <button onClick={this.onLogout}>Log Out</button></div>  
        <div>
          <Route exact path = "/"
          component={ props => 
            <LandingPage 
              {...props}
              teachers={this.state.allTeachers} 
              navButtons={this.setButtons}
              whoAmI={this.setTeacher}/>
          }/>

          <Route exact path = "/logIn"
          component={ props => 
            <LogIn
              {...props}
              logIn={this.onLogin}    
              navButtons={this.setButtons}/>
          }/>

          <Route exact path = "/register"
          component={ props => 
            <Register
              onSignUp={this.onLogin}  
              navButtons={this.setButtons}
              postTeacher={this.postTeacher}/>
          }/>

          <Route exact path = "/selectClass"
          render={ props => 
            <SelectClass 
              {...props}
              user={user}
              classes={this.state.allClassPeriods} 
              loggedIn={this.state.currentTeacher}
              navButtons={this.setButtons} 
              selected={this.setPeriod} 
              />
          }/>

          <Route exact path = "/classhome"
          render={ props => 
            <ClassHome 
              refresh={(e) => (this.refresh)}
              assessments={this.state.allAssessments} 
              loggedIn={this.state.currentTeacher} 
              registrations={this.state.allRegistrations} 
              studentBody={this.state.allStudents} 
              thisPeriod={this.state.currentPeriod} 
              navButtons={this.setButtons}
              setAssessments={this.setAssessments}
              setClass={this.setClass} 
              fetchReg={this.fetchRegistrations}
              setStudent={this.setStudent}
              />
          }/>

          <Route exact path = "/editclass"
          render={ props => 
            <EditClass 
              loggedIn={this.state.currentTeacher} 
              studentBody={this.state.allStudents}  
              thisPeriod={this.state.currentPeriod}
              thisClass={this.state.currentClass} 
              navButtons={this.setButtons} 
              sendRegistration={this.postRegistration}
              deleteRegistration={this.deleteRegistrations}
              setClass={this.setClass} 
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
          <Route exact path = "/studenthome"
          render={ props => 
            <StudentHome 
              refresh={(e) => (this.refresh)}
              assessments={this.state.allAssessments} 
              loggedIn={this.state.currentTeacher} 
              registrations={this.state.allRegistrations} 
              studentBody={this.state.allStudents} 
              thisPeriod={this.state.currentPeriod} 
              navButtons={this.setButtons}
              setAssessments={this.setAssessments}
              setClass={this.setClass} 
              fetchReg={this.fetchRegistrations}
              currentStudent={this.state.currentStudent}
              />
          }/>        
        </div>
      </Router>
      

    )
  }

} export default App
