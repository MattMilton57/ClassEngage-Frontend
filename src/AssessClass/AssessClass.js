import React from 'react';
import RosterContainer from '../Recyclables/Roster/RosterContainer';
import Graphics from '../Recyclables/Graphics/GraphicsContainer'
import AssessmentContainer from './AssessmentContainer'

const homeButtons = [
  {Label:"Edit Class", Destination:'/editclass'},
  {Label:"Landing Page", Destination:'/'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"ClassHome", Destination:'/classhome'}]

class AssessClass extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      thisPeriod:props.thisPeriod,
      classRoster:[]
    }
  }

  componentDidMount(props){
    this.props.navButtons(homeButtons)
    this.setState({
        classRoster:this.props.roster
    })
  }

  render(){
    return(
      <div>
        Asses Class Page
        <AssessmentContainer classRoster={this.state.classRoster}/>
      </div>
    )
  }

} export default AssessClass