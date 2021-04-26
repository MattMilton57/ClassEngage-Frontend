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
    .then(res => (this.setState({
      assessments:res
    }), this.props.buildGraph(res)))
  }
  
  render(){
    return(
      <div className="student-home">
        <div className="student-home__header">Student Home</div>
        <div className="student-home__name">
          <TitleBox title={this.state.thisStudent.name} />
        </div>
        <div className="student-home__assessments">
        <AssessmentList thisClass={this.props.classPeriod} assessments={this.state.assessments} />
        </div>
        <div className="student-home__graphics">
        <Graphics 

graphData={this.props.graphInfoData}
stateLables={this.props.stateLables}
// assessments={assessments}
// dataObject={dataObject}
/>
        </div>
        <div className="student-home__score">
          <ClassScore classPeriod={this.props.classPeriod} assessments={this.state.assessments} roster={[this.state.thisStudent]}/>
        </div>

        <div className="student-home__ranking">
          class ranking
        </div>

        <div className="student-home__preferences">
          preferences
        </div>
      </div>
    )
  }
} 
export default StudentHomeContainer;