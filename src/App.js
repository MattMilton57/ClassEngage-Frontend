import React from 'react';
import './css/style.css';
import LandingPage from './main_routes/LandingPage.js'
import SelectClass from './SelectClass/SelectClass.js'
import ClassHome from './ClassHome/ClassHome.js'
import Header from './main_routes/Header'
import Footer from './main_routes/Footer'
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

          {/* <div class="header">
            <Header 
              onLogOut={this.onLogout}
              user={this.state.currentUser} 
              buttons={this.state.currentButtons} />   
          </div>   */}

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
                    />
                }/>
              </div>
            </Router>
          </div>

          {/* <div className="footer">
            <Footer/>
          </div> */}
        </div>
    )
  }
} export default App
