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
import { api } from './services/api'

const DefaultButtons = [
  {Label:"Landing Page", Destination:'/'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"Class Assessment", Destination:'/assess'},
  {Label:"ClassHome", Destination:'/classhome'}]

class App extends React.Component {

  constructor() {
    super();
    this.state= {
      currentButtons:DefaultButtons,
      auth:{user:{}},
      currentUser:''
    }
  }

  componentDidMount(){
    this.setUser()
  }

  setUser = () => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      api.get.fetchCurrentUser()
      // .then(res => res.json())
      .then(res => this.setState({currentUser:res}))
    }
  }

  setButtons = (navButtons) => {
    this.setState({
      currentButtons: navButtons
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
    // localStorage.setItem("token", data)

    this.setState({ auth:newstate})
    this.setUser()

  }

  onLogout = () => {
    localStorage.removeItem("token")
    this.setState({ auth: {user:{}}})
    // this.props.history.push('/')
  }

  render(){
    const {user} = this.state.auth
    const {currentUser} = this.state.currentUser
    return(
      <Router>
        <Header />
        <NavButtons
          // {...props}
          onLogOut={this.onLogout} 
          buttons={this.state.currentButtons} 
          user={this.state.auth.user}/>       
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
              {...props}
              logIn={this.onLogin}  
              navButtons={this.setButtons}
              postTeacher={this.postTeacher}/>
          }/>

          <Route exact path = "/selectClass"
          render={ props => 
            <SelectClass 
              {...props}
              // user={user}
              user={this.state.currentUser}
              logIn={this.onLogin} 
              classes={this.state.allClassPeriods} 
              loggedIn={this.state.currentTeacher}
              navButtons={this.setButtons} 
              />
          }/>

          <Route path = "/classhome/:id"
          render={ props => 
            <ClassHome 
              {...props}
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
          <Route path = "/studenthome/:id"
          render={ props => 
            <StudentHome
              {...props} 
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
