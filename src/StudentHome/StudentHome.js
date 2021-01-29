import React from 'react';
import StudentScore from '../Recyclables/Roster/StudentScore';
import Graphics from '../Recyclables/Graphics/GraphicsContainer'
import SelectClass from '../SelectClass/SelectClass';
import AssessClass from '../AssessClass/AssessClass';
import AssessmentContainer from '../Recyclables/Assessment/AssessmentContainer'
import { api } from '../services/api'

const homeButtons = [
  {Label:"Landing Page", Destination:'/'},
  {Label:"Edit Class", Destination:'/editclass'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"Assess Students", Destination:'/assess'}]

class StudentHome extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      thisPeriod:props.thisPeriod,
      thisStudent:props.currentStudent,
      registrations:props.registrations,
      assessments:props.assessments,
    }
  }

  componentDidMount(){
    this.getAssessments()
  }

  getAssessments = () => {
    let id = {student_id:this.props.currentStudent.id}
    api.get.studentsAssessments(id)
    .then(res => this.setState({
      assessments:res
    }))
  }

  

  render(){
    return(
      <div>
        Student home
        <br></br>
        {this.state.thisStudent.name}
        <br></br>
        Total participation score: <StudentScore student={this.state.thisStudent} assessments={this.state.assessments} />

        <AssessmentContainer thisStudent={this.state.thisStudent} assessments={this.state.assessments} />
      </div>
    )
  }

} export default StudentHome