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
    fetch(('https://classengagedeploy-backendapi.herokuapp.com/api/v1/auth'), {
        method:"POST",
        headers: 
            {"Content-Type": "application/json", 
            Accept: "application/json",
            // Authorization: token
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
      
      <form className="landing-form__login">

        <div className="landing-form__login-username landing-form__input">
          <input className= "landing-form__textbox" type="text" placeholder="Username" onChange={ (e) => this.onChange("username", e.target.value)}/>
        </div>

        <div className="landing-form__login-password landing-form__input">
          <input className="landing-form__textbox"  type="password" name="password" placeholder="Password" value={this.state.user.password} onChange={ (e) => this.onChange("password", e.target.value)}/>
        </div>

        {/* <div className="landing-form__login-submit">
          <input className="btn-dark" type="submit" value="Log In" onClick={this.onSubmit}/>
        </div> */}

        <button onClick={(e)=> this.onSubmit(e)} className="landing-form__login-submit" >
          <span >Log In</span>
        </button>

        <div className="landing-form__login-forgot-password">
          {/* <div>Forgot Password?</div> */}
        </div>

        <div className="landing-form__login-register">
        <label for="landing-page-toggle" className="landing-form__button landing-page__button--register">Create New Account</label> 
        </div>

      </form>
    )
  }
} export default LogInForm