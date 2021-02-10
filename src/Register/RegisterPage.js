import React from 'react';

class RegisterPage extends React.Component {

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
        <form onSubmit={(e)=> this.onSubmit(e)}>
            <h3>Sign Up</h3>

            <div className="form-group">
                <label>Username</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Username"
                    value={this.state.username}
                    onChange={(e) => this.onChange("username", e.target.value)}/>
            </div>

            <div className="form-group">
                <label>Bio</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="bio"
                    value={this.state.bio}
                    onChange={(e) => this.onChange("bio", e.target.value)}/>
            </div>

            <div className="form-group">
                <label>Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Password"
                    value={this.state.password}
                    onChange={(e) => this.onChange("password", e.target.value)}/>
            </div>

            <div className="form-group">
                <label>Confirm Password</label>
                <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Confirm Password"
                    value={this.state.confirmedpassword}
                    onChange={(e) => this.setState({password_confirmation:e.target.value})}/>
            </div>

            <div className="form-group">
                <label>Avatar</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Avatar"
                    value={this.state.password}
                    onChange={(e) => this.onChange("avatar", e.target.value)}/>
            </div>


            <button className="btn-primary btn-block" >Sign Up</button>
        </form>
    )
  }

} export default RegisterPage