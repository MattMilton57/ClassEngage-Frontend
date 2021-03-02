import React from 'react';
import './Footer.css';

class Footer extends React.Component {

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
      <div className="footer">
        thisisthefooter
      </div>
    )
  }

} export default Footer