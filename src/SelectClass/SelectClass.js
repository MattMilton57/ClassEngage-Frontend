import React from 'react';
import ClassListContainer from './ClassListContainer';
import ClassHome from '../ClassHome/ClassHome.js'
const DefaultButtons = [
  {Label:"Landing Page", Destination:'/'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"ClassHome", Destination:'/classhome'}]
class SelectClass extends React.Component {

  constructor() {
    super();
    this.state= {
      selectedClass: ''
    }
  }

  componentDidMount(){
    // console.log('landingPage')
  }

  render(){
    return(
      <div>
        the select class page for {this.props.user.user.username}
        {/* <ClassListContainer classes={this.props.classes} teacher={this.props.loggedIn} selected={this.props.selected}/> */}
      </div>
    )
  }

} export default SelectClass