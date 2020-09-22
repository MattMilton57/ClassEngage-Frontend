import React from 'react';
import './Header.css';

const DefaultButtons = [
  {Label:"Landing Page", Destination:'/'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"ClassHome", Destination:'/classhome'}]
class Header extends React.Component {

  constructor() {
    super();
    this.state= {
      placeHolder: []
    }
  }

  componentDidMount(){
    // console.log('landingPage')
  }

  render(){
    return(
      <div className="header">
          <h2>ClassEngage</h2>
      </div>
    )
  }

} export default Header