import React from 'react';
import { api } from '../services/api'

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
        // this.handlePostUser()
        this.postUser()
        console.log(this.state.user)
    } else {
        alert('Password and password confirmation must match. Please try again.')
    }
  }

  postUser = () => {
      fetch(('https://classengagedeploy-backendapi.herokuapp.com/api/v1/users'), {
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

//   handlePostUser = () => {
//     // fetch(('http://localhost:3000/api/v1/users'), {
//     //     method:"POST",
//     //     headers: {"Content-Type": "application/json", Accept: "application/json"},
//     //     body: JSON.stringify(this.state)
//     // })
//     api.posts.postUser(this.state)
//     .then(res=>{console.log(res)})
//     // .then(res => {console.log(res)
//     // if (!res.error) {
//     //     this.props.logIn(res); this.props.history.push('/selectClass')
//     // }
//   // }) 
// }


  render(){
    return(

        <form className="landing-form__register">

                <div className="landing-form__register-username landing-form__input">
                    <input 
                        type="text" 
                        className="landing-form__textbox" 
                        placeholder="Username"
                        value={this.state.username}
                        onChange={(e) => this.onChange("username", e.target.value)}/>
                </div>

                <div className="landing-form__register-password landing-form__input">
                    <input 
                        type="password" 
                        className="landing-form__textbox" 
                        placeholder="Password"
                        value={this.state.password}
                        onChange={(e) => this.onChange("password", e.target.value)}/>
                </div>

                <div className="landing-form__register-confirm-password landing-form__input">
                    <input 
                        type="password" 
                        className="landing-form__textbox" 
                        placeholder="Confirm Password"
                        value={this.state.password_confirmation}
                        onChange={(e) => this.setState({password_confirmation:e.target.value})}/>
                        {/* onChange={(e) => this.onChange("password_confirmation", e.target.value)}/> */}

                </div>

                {/* <button className="btn btn-dark" type="submit" value="Sign Up" >Sign Up</button> */}
                {/* <div className="landing-form__register-submit">
                  <input className="btn-dark" type="submit" value="Sign Up" onClick={this.onSubmit}/>
                </div> */}

                <button onClick={(e)=> this.onSubmit(e)} className="landing-form__register-submit" >
                  <span >Sign Up</span>
                </button>

                <div className="landing-form__register-switch">
                  <label for="landing-page-toggle" className="landing-form__button">Existing Account</label> 
                </div>

        {/* </form> */}
        </form>
    )
  }

} export default RegisterForm