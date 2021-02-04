import React from 'react';
import { Link } from 'react-router-dom';
import { api } from '../services/api'

const DefaultButtons = [
  {Label:"Landing Page", Destination:'/'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"ClassHome", Destination:'/classhome'}]
class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      username:'',
      password:''
    }
    this.login = this.login.bind(this);
  }

  componentDidMount(){
    // console.log('landingPage')
  }

  login(){
    console.log(this.state.username)
  }

  onChange = (e) =>{
    this.setState({[e.target.name]: e.target.value})

  }

  test = (e) => {
    e.preventDefault()
    const {match} = this.props.match
    console.log(match)
  }

  render(){
    return(
      // <div className="loginForm">
      //   <h2>Please log in</h2>
      //   <label>Username</label>
      //   <input type="text" name="username" placeholder="username" onChange={this.onChange}/>
      //   <label>password</label>
      //   <input type="password" name="password" placeholder="password" onChange={this.onChange}/>
      //   <input type="submit" value="login" className="button" onClick={this.login}/>
      // </div>
      <div>
      <div>Welcome to classEngage 2.500</div>
      <Link to={'/logIn'}> log in</Link>
      <Link to={'/register'}> register</Link>
      <button onClick={e=> this.test(e)}>Button for tests</button>
      </div>
    )
  }

  // render(){
  //   return(
  //     <div>
  //       Welcome to Hogwarts!<br></br>
  //       Which member of our esteemed faculty are you?
  //       <TeacherContainer teachers={this.props.teachers} whoAmI={this.props.whoAmI} />
  //     </div>
  //   )
  // }

} export default LandingPage