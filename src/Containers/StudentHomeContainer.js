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
    // console.log(id)
    // this.getAssessments()
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
    // console.log(this.state.thisStudent.id)
    // this.props.deleteRegistration(this.state.thisStudent.id)
  }

  handleEdit = (e) => {
    api.get.currentStudent(this.state.thisStudent.id)
    .then(res => this.setState({thisStudent:e}))
    // .then(res => console.log(res))

  }

  testfunct = (registration) => {
      api.delete.deleteRegistration(registration.id)
      .then(res => (console.log("done with" + res)))
  }
  
  render(){
    return(
      <div className="">
      <div className="student-home">
        <div className="student-home__header">Student Home</div>
        <div className="student-home__name">
          <TitleBox title={this.state.thisStudent.name} />
        </div>
        <div className="student-home__assessments">
        <AssessmentList thisClass={this.props.classPeriod} assessments={this.state.assessments} />
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
        <label for="edit-student-form__checkbox" className="edit-class__controll-btn edit-class__controll-new-student">edit student</label>
        </div>
      </div>
      <EditStudentForm 
          // reFetchStudentBody={e => this.reFetchStudentBody(e)}
          student={this.state.thisStudent}
          patchStudent={this.props.patchStudent}
          handleEdit={e => this.handleEdit(e)} />
      </div>
    )
  }
} 
export default StudentHomeContainer;