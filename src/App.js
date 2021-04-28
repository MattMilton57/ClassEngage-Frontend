import React from 'react';
import './css/style.css';
import LandingPage from './main_routes/LandingPage.js'
// import SelectClass from './SelectClass/SelectClass.js'
import SelectClass from './main_routes/SelectClass.js'
import ClassHome from './main_routes/ClassHome.js'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { api } from './services/api'

class App extends React.Component {

  constructor() {
    super();
    this.state= {
      auth:{user:{}},
      currentUser:[],
      classNumber:''
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

  classNumber = (res) => {

    this.setState({classNumber:res})
  }
  

  render(){
    const {user} = this.state.auth
    const {currentUser} = this.state.currentUser
    return(
        <div className="container">

          <div className="content">
            <Router>
              <div>
                <Route exact path = "/"
                component={ props => 
                  <LandingPage 
                    {...props}
                    logIn={this.onLogin}/>
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
                    user={this.state.currentUser}
                    />
                }/>
              </div>
            </Router>
          </div>

        </div>
    )
  }
} export default App
