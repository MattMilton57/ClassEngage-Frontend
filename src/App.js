import React from 'react';
import './App.css';
import LandingPage from './LandingPage/LandingPage.js'
import SelectClass from './SelectClass/SelectClass.js'
import ClassHome from './ClassHome/ClassHome.js'
import Header from './Header/Header'
import LogIn from './LogIn/LogInPage.js'
import Register from './Register/RegisterPage.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { api } from './services/api'

const DefaultButtons = [
  {Label:"Landing Page", Destination:'/'},
  {Label:"My Classes", Destination:'/selectClass'},]

class App extends React.Component {

  constructor() {
    super();
    this.state= {
      currentButtons:DefaultButtons,
      auth:{user:{}},
      currentUser:[]
    }
  }

  componentDidMount(){
    this.setUser()
    console.log('App mounted')

  }

  setUser = () => {
    const userToken = localStorage.getItem("token");
    if (userToken) {
      api.get.fetchCurrentUser()
      .then(res => this.setState({currentUser:res}))
    }
  }

  refresh = (e) => {
    e.preventDefault()
    this.fetchAssessments()
  }

  onLogin = (data) => {
    // console.log(data)
    const newstate = {...this.state.auth, user: {...data}}
    localStorage.setItem("token", data.jwt)
    this.setState({ auth:newstate})
    this.setUser()
  }

  onLogout = () => {
    console.log('logout')
    localStorage.removeItem("token")
    this.setState(
      { currentUser:'', 
        auth:{user:{}}
      })
  }

  render(){
    const {user} = this.state.auth
    const {currentUser} = this.state.currentUser
    return(
      <Router>
        <Header 
          onLogOut={this.onLogout}
          user={this.state.currentUser} 
          buttons={this.state.currentButtons} />     
        <div>
          <Route exact path = "/"
          component={ props => 
            <LandingPage 
              {...props}/>
          }/>

          <Route exact path = "/logIn"
          component={ props => 
            <LogIn
              {...props}
              logIn={this.onLogin}/>
          }/>

          <Route exact path = "/register"
          component={ props => 
            <Register
              {...props}
              logIn={this.onLogin}  
              />
          }/>

          <Route exact path = "/selectClass"
          render={ props => 
            <SelectClass 
              {...props}
              user={this.state.currentUser}
              logIn={this.onLogin} 
              />
          }/>

          <Route path = "/classhome/:id"
          render={ props => 
            <ClassHome 
              {...props}
              />
          }/>
        </div>
      </Router>
    )
  }
} export default App
