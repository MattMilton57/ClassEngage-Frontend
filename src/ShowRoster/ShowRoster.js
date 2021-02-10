import React from 'react';
import RosterContainer from '../Recyclables/Roster/RosterContainer';
import { api } from '../services/api'

class ShowRoster extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      students:'',
      classPeriod:this.props.classPeriod,
    }
  }

  componentDidMount(){
    this.setState({
      students:this.props.students
    })
  }
  
  render(){
    return(
      <div>
        <div name="hat" id='Rroster'>
          showRoster component
          <RosterContainer
            url={this.props.url} 
            students={this.props.students}
            score={this.props.score}
            linkTo={this.props.linkTo}   
            callback={this.props.callback}
            classPeriod={this.props.classPeriod}
            assessments={this.props.assessments} 
            />
        </div>
      </div>
    )
  }
  
} export default ShowRoster