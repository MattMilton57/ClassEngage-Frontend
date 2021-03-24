import React from 'react';
import ClassTitle from "../components/ClassTitle"
import ClassScore from "../components/ClassScore"
import Graphics from "../components/Graphics"
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

  setParticipation = () => {
    if (this.state.assessments == []){return(<div>Loading</div>)}else{
    let totalScore=0
    let assessments = this.state.assessments
    let totalAssessments = this.state.assessments.length
    assessments.map( assessment => {if (assessment.participating == true) totalScore=(totalScore+1)})
    let rawScore=(totalScore/totalAssessments)
    let classScore = ((rawScore*100).toFixed(0))
    return(
      <div className="score">{classScore}</div>
    )
    }
  }
  
  render(){
    return(
      <div className="student-home">
        <div className="student-home__name">{this.state.thisStudent.name}
        </div>
        <div className="student-home__assessments">
        <AssessmentList thisStudent={this.state.thisStudent} assessments={this.state.assessments} />
        </div>
        <div className="student-home__graphics">
          eventua graphics section
        </div>
        <div className="student-home__score">
          <ClassScore assessments={this.state.assessments}/>
        </div>
      </div>
    )
  }
} 
export default StudentHomeContainer;