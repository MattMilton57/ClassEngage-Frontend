import React from 'react';

class LogInForm extends React.Component {

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
    console.log('Log in page mounted')
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
      
      <div className="landing-form__login landing-form">
        <h2 className="landing-form__heading">Please log in</h2>
        <label className= "landing-form__label">Username</label>
        <input className= "landing-form__textbox" type="text" placeholder="username" onChange={ (e) => this.onChange("username", e.target.value)}/>
        <label className= "landing-form__label">Password</label>
        <input className="landing-form__textbox"  type="password" name="password" placeholder="password" value={this.state.user.password} onChange={ (e) => this.onChange("password", e.target.value)}/>
        <input className="btn btn-dark" type="submit" value="login" onClick={this.onSubmit}/>

      </div>
    )
  }
} export default LogInForm