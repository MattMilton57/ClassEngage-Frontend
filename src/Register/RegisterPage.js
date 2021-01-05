import React from 'react';
const DefaultButtons = [
  {Label:"Landing Page", Destination:'/'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"ClassHome", Destination:'/classhome'}]
class RegisterPage extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
    //   firstname:'',
    //   lastname:'',
      name:'',
    //   email:'',
    //   password:'',
    //   confirmedpassword:''
    }
  }

  componentDidMount(){
    // console.log('landingPage')
  }

  onChange(state,value){
    this.setState({[state]:value})
  }

  onSubmit = (e) =>{
      e.preventDefault()
    // console.log(this.state)
    this.props.postTeacher(this.state)
  }


  render(){
    return(
        <form onSubmit={(e)=> this.onSubmit(e)}>
            <h3>Sign Up</h3>

            <div className="form-group">
                <label>First Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="First Name" 
                    value={this.state.firstname}
                    onChange={(e) => this.onChange("firstname", e.target.value)}/>
            </div>

            <div className="form-group">
                <label>Last Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Last Name"
                    value={this.state.lastname}
                    onChange={(e) => this.onChange("lastname", e.target.value)}/>
            </div>

            <div className="form-group">
                <label>Username</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="Username"
                    value={this.state.username}
                    onChange={(e) => this.onChange("name", e.target.value)}/>
            </div>

            <div className="form-group">
                <label>Email</label>
                <input 
                    type="email" 
                    className="form-control" 
                    placeholder="Email"
                    value={this.state.email}
                    onChange={(e) => this.onChange("email", e.target.value)}/>
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
                    onChange={(e) => this.onChange("confirmedpassword", e.target.value)}/>
            </div>

            <button className="btn-primary btn-block" >Sign Up</button>
        </form>
    )
  }
//   render(){
//     return(
//       <div className="loginForm">
//         <h2>Please register</h2>
//         <label>Username</label>
//         <input type="text" name="username" placeholder="username" onChange={this.onChange}/>
//         <label>password</label>
//         <input type="password" name="password" placeholder="password" onChange={this.onChange}/>
//         <input type="submit" value="login" className="button" onClick={this.login}/>
//       </div>
//     )
//   }

} export default RegisterPage