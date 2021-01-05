import React from 'react';
const DefaultButtons = [
  {Label:"Landing Page", Destination:'/'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"ClassHome", Destination:'/classhome'}]
class LogInPage extends React.Component {

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

  render(){
    return(
      <div className="loginForm">
        <h2>Please log in</h2>
        <label>Username</label>
        <input type="text" name="username" placeholder="username" onChange={this.onChange}/>
        <label>password</label>
        <input type="password" name="password" placeholder="password" onChange={this.onChange}/>
        <input type="submit" value="login" className="button" onClick={this.login}/>
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

} export default LogInPage