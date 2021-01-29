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
    // this.login = this.login.bind(this);
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
      const username = (this.state.username)
      const password = (this.state.password)
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
    .then(res => {this.props.logIn(res); this.props.history.push('/selectClass')
    // if (!res.error) {
    //     this.props.onLogIn(res)
    //     }
    }) 
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