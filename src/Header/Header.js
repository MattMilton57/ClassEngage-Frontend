import React from 'react';
import NavButtons from '../NavButtons/NavButtons.js';
import './Header.css';
import Logo from "../img/test.jpg"

class Header extends React.Component {

  constructor() {
    super();
    this.state= {
      placeHolder: []
    }
  }

  componentDidMount(){
    // console.log('landingPage')
    if(this.props.user){console.log(this.props.user)}
  }

  user = () => {
    const a = this.props.user
    if(a == []|| a == '')
    {return (
      <div class="title">
        
        <l1 class="title-1">Class</l1>
        <br></br>
        <l1 class="title-2">Engage</l1>
      </div>
    )} 
      else 
    {return(
      <div>
        Welcome {a.username}
        <NavButtons 
            onLogOut={this.props.onLogOut}
            user={this.props.user}
            buttons={this.props.buttons}/>
        </div>)}
  }

  render(){
    return(
      <div className="header">
                    <div class="logo">

        {/* <img src={Logo}></img> */}
                    </div>

        {this.user()}
      </div>
    )
  }

} export default Header