import React from 'react';
const DefaultButtons = [
  {Label:"Landing Page", Destination:'/'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"ClassHome", Destination:'/classhome'}]
class LogInPage extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      user:{
          username:'',
          password:''
      }
    }
  }

  componentDidMount(){
    // console.log('landingPage')
  }

  token = () =>{localStorage.getItem("token")}

  onSubmit = (e) => {
    e.preventDefault()
    this.onLogIn()
  }

  onLogIn = () => {
      const token = localStorage.getItem("token")
      const username = (this.state.user.username)
      const password = (this.state.user.password)
    fetch(('http://localhost:3000/api/v1/auth'), {
        method:"POST",
        headers: 
            {"Content-Type": "application/json", 
            Accept: "application/json",
            Authorization: token
        },
        body: JSON.stringify({user:{username:username, password:password}})
    })
    .then(res => res.json())
    .then(res => this.handleLogIn(res))
  }

  handleLogIn = (res) => {
    if (!res.error) 
      {this.props.logIn(res); this.props.history.push('/selectClass')}
        else
      {this.onChange('password', ''); alert("Try again")}
  }

onChange = (state,value) => {
  const newState = {...this.state.user, [state]:value}
this.setState({user: newState})
}

  render(){
    return(
      <div className="loginForm">
        <h2>Please log in</h2>
        <label>Username</label>
        <input type="text" name="username" placeholder="username" onChange={ (e) => this.onChange("username", e.target.value)}/>
        <label>password</label>
        <input type="password" name="password" placeholder="password" value={this.state.user.password} onChange={ (e) => this.onChange("password", e.target.value)}/>
        <input type="submit" value="login" className="button" onClick={this.onSubmit}/>
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