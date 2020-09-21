import React from 'react';
import TeacherContainer from './TeacherContainer';
const DefaultButtons = [
  {Label:"Landing Page", Destination:'/'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"ClassHome", Destination:'/classhome'}]
class LandingPage extends React.Component {

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
      <div>
        Welcome to Hogwarts!<br></br>
        Which member of our esteemed faculty are you?
        <TeacherContainer teachers={this.props.teachers} whoAmI={this.props.whoAmI} />
      </div>
    )
  }

} export default LandingPage