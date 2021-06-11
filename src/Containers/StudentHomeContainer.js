import React from 'react';
import TitleBox from "../components/TitleBox"
import ClassScore from "../components/ClassScore"
import ClassRank from "../components/ClassRank"
import Graphics from "../components/Graphics"
import EditStudentForm from "../forms/EditStudentForm"
import { api } from '../services/api'
import AssessmentList from '../components/AssessmentList'
class StudentHomeContainer extends React.Component{

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
    this.props.setHeader("Student Page")
    api.get.currentStudent(id)
    .then(res => this.setState({thisStudent:res}))
    .then(res => this.getAssessments())
  }

    getAssessments = () => {
    let id = {student_id:this.state.thisStudent.id}
    let classesAssessments = []
    api.get.studentsAssessments(id)
    .then(res => (
        res.forEach(assessment => {if(assessment.class_period_id === this.props.classPeriod){classesAssessments.push(assessment)}}),
        this.setState({
          assessments:classesAssessments
            }), 
        this.props.buildGraph(classesAssessments)))
  }

  handleDelete = (e) => {
    this.props.registrations.forEach(registration => {
      if(registration.student_id === this.state.thisStudent.id)
      {api.delete.deleteRegistration(registration.id)
      .then(res => (console.log("done with" + res)))}
    })
  }

  handleEdit = (e) => {
    api.get.currentStudent(this.state.thisStudent.id)
    .then(res => this.setState({thisStudent:e}))
  }

  testfunct = (registration) => {
      api.delete.deleteRegistration(registration.id)
      .then(res => (console.log("done with" + res)))
  }
  
  render(){
    return(
      <div className="student-home">
        <div className="student-home__assessments">
          <div className="student-home__assessments-shell">
            <AssessmentList thisClass={this.props.classPeriod} assessments={this.state.assessments} />
          </div>
        </div>

        <div className="student-home__name">
        <TitleBox title={this.state.thisStudent.name} />
        </div>

        <div className="student-home__graphics">
        <Graphics graphData={this.props.graphInfoData} stateLables={this.props.stateLables} />
        </div>

        <div className="student-home__score">
          <ClassScore classPeriod={this.props.classPeriod} assessments={this.state.assessments} roster={[this.state.thisStudent]}/>
        </div>

        <div className="student-home__ranking">
          <ClassRank 
          thisStudent={this.state.thisStudent}
          roster={this.props.roster}
          assessments={this.props.assessments}/>
        </div>

        <div className="student-home__preferences">
          <label for="edit-student-form__checkbox" className="student-home__preferences-btn">Student Preferences</label>
        </div>

        <div className="student-home__forms">
          <EditStudentForm 
              student={this.state.thisStudent}
              patchStudent={this.props.patchStudent}
              handleEdit={e => this.handleEdit(e)} />
        </div>
      </div>
    )
  }
} 
export default StudentHomeContainer;