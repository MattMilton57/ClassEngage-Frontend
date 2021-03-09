import React from 'react';

class RegisterForm extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
        password_confirmation:'',
        user:{username: '',
        password: '',
        bio: '',
        avatar: ''}}
    
  }

  componentDidMount(){
    console.log('Register Page mounted')
  }

  onChange(state,value){
      const newState = {...this.state.user, [state]:value}
    this.setState({user: newState})
  }

  onSubmit = (e) =>{
      e.preventDefault()
    if (this.state.password_confirmation === this.state.user.password) {
        this.postUser()
        console.log(this.state.user)
    } else {
        alert('not good')
    }
  }

  postUser = () => {
      fetch(('http://localhost:3000/api/v1/users'), {
          method:"POST",
          headers: {"Content-Type": "application/json", Accept: "application/json"},
          body: JSON.stringify(this.state)
      })
      .then(res => res.json())
      .then(res => {console.log(res)
      if (!res.error) {
          this.props.logIn(res); this.props.history.push('/selectClass')
      }}) 
  }


  render(){
    return(
        <div class="landing-form__register landing-form">
        <form onSubmit={(e)=> this.onSubmit(e)}>
        <h2 class="landing-form__heading">Register</h2>


                <label class= "landing-form__label">Username</label>
                <input 
                    type="text" 
                    className="landing-form__textbox" 
                    placeholder="Username"
                    value={this.state.username}
                    onChange={(e) => this.onChange("username", e.target.value)}/>



                <label class= "landing-form__label">Bio</label>
                <input 
                    type="text" 
                    className="landing-form__textbox" 
                    placeholder="bio"
                    value={this.state.bio}
                    onChange={(e) => this.onChange("bio", e.target.value)}/>



                <label class= "landing-form__label">Password</label>
                <input 
                    type="password" 
                    className="landing-form__textbox" 
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(e) => this.onChange("password", e.target.value)}/>



                <label class= "landing-form__label">Confirm Password</label>
                <input 
                    type="password" 
                    className="landing-form__textbox" 
                    placeholder="Confirm Password"
                    value={this.state.confirmedpassword}
                    onChange={(e) => this.setState({password_confirmation:e.target.value})}/>



                <label class= "landing-form__label">Avatar</label>
                <input 
                    type="text" 
                    className="landing-form__textbox"
                    placeholder="Avatar"
                    value={this.state.password}
                    onChange={(e) => this.onChange("avatar", e.target.value)}/>



            <button className="btn btn-dark" type="submit" value="Sign Up" >Sign Up</button>
        </form>
        </div>
    )
  }

} export default RegisterForm