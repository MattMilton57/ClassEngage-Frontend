import React from 'react';
import EditUserForm from "../forms/EditUserForm";
import DeleteUserForm from "../forms/DeleteUserForm";
import FormToggle from "../components/FormToggle";
import { api } from '../services/api'

class UserPreferencesForm extends React.Component {

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

        <form className="user-preferences-form">

          <input type="checkbox" id="user-preferences-form__checkbox" className="user-preferences-form__checkbox"/>
                <div className="user-preferences-form__content">
                  <div className="user-preferences-form__content--form">
                    <div className="user-preferences-form__content--form-edit">
                      <EditUserForm getUser={this.props.getUser} user={this.props.user}/>
                    </div>
                    <div className="user-preferences-form__content--form-delete">
                      <DeleteUserForm user={this.props.user} history={this.props.history} logOutRedirect={this.props.logOutRedirect} logout={this.props.logOut}/>
                    </div>
                  </div>


                    <label className="user-preferences-form__content--form-toggle" htmlFor="user-preferences-form__checkbox">
                        <FormToggle />
                    </label>


                {/* <div className="landing-form__register-username landing-form__input">
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

                </div>
                <div className="landing-form__register-submit">
                  <input className="btn btn-dark" type="submit" value="Sign Up" onClick={this.onSubmit}/>
                </div>

                <div className="">
                  <label for="landing-page-toggle" className="landing-page__button landing-form__register-switch">Existing Account</label> 
                </div> */}
                                    </div>

        </form>
    )
  }

} export default UserPreferencesForm