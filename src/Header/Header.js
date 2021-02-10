import React from 'react';
import NavButtons from '../NavButtons/NavButtons.js';
import './Header.css';

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
      <div>
        ClassEngage
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
        {this.user()}
      </div>
    )
  }

} export default Header