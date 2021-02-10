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
      thisStudent:'',
      registrations:[],
      assessments:[],
    }
  }

  componentDidMount(){
    const {match} = this.props
    const id = (parseInt(match.params.id))
    console.log(id)
    // this.getAssessments()
    api.get.currentStudent(id)
    .then(res => this.setState({thisStudent:res}))
    .then(res => this.getAssessments())
  }

    getAssessments = () => {
    let id = {student_id:this.state.thisStudent.id}
    api.get.studentsAssessments(id)
    .then(res => this.setState({
      assessments:res
    }))
  }

  // getAssessments = () => {
  //   let id = {student_id:this.state.thisStudent.id}
  //   api.get.studentsAssessments(id)
  //   .then(res => this.setState({
  //     assessments:res
  //   }))
  // }

  test = (e) => {
    e.preventDefault()
    // const {match} = this.props
    // console.log(this.props.params)
    console.log(this.state.thisStudent)
  }

  render(){
    return(
      <div>
        Student home
        <button onClick={e=> this.test(e)}>Button for tests</button>
        <br></br>
        {this.state.thisStudent.name}
        <br></br>
        Total participation score: <StudentScore student={this.state.thisStudent} assessments={this.state.assessments} />

        <AssessmentContainer thisStudent={this.state.thisStudent} assessments={this.state.assessments} />
      </div>
    )
  }

} export default StudentHome