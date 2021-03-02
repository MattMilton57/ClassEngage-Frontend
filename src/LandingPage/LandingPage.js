import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';
// import { api } from '../services/api'

class LandingPage extends React.Component {

  componentDidMount(){
    console.log("landing page mounted")
  }

  test = (e) => {
    console.log('Test Button')
  }

  render(){
    return(
      <div>
      <div class="title">Welcome to classEngage 2.500</div>
      <div class="logInLink"><Link to={'/logIn'}> log in</Link></div>
      <div class="registerLink"><Link to={'/register'}> register</Link></div>
      <br></br>
      <button class='btn' onClick={e=> this.test(e)}>Button for tests</button>
      </div>
    )
  }

} export default LandingPage

//////// for refactoring login and register into landing page ////////

  // onChange = (e) =>{
  //   this.setState({[e.target.name]: e.target.value})
  // }

    // constructor(props) {
  //   super(props);
  //   this.state= {
  //     username:'',
  //     password:''
  //   }
  //   this.login = this.login.bind(this);
  // }