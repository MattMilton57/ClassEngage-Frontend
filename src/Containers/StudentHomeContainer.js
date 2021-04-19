import React from 'react';
import TitleBox from "../components/TitleBox"
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
  
  render(){
    return(
      <div className="student-home">
        <div className="student-home__name">
          <TitleBox title={this.state.thisStudent.name} />
        </div>
        <div className="student-home__assessments">
        <AssessmentList thisClass={this.props.classPeriod} assessments={this.state.assessments} />
        </div>
        <div className="student-home__graphics">
          eventua graphics section
        </div>
        <div className="student-home__score">
          <ClassScore classPeriod={this.props.classPeriod} assessments={this.state.assessments}/>
        </div>
      </div>
    )
  }
} 
export default StudentHomeContainer;