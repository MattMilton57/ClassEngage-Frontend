import React from 'react';
import AssessmentCard from '../components/AssessmentCard';
import { api } from '../services/api'

class AssessClass extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      assess:[]
    }
  }

  componentDidMount(props){
    this.buildAssessmentIndex()
  }

  ///// Create index of student objects with # of times assessed /////
  buildAssessmentIndex = () => {
    let roster=this.props.roster
    let assessments=this.props.assessments
    let index = []
    roster.map(student => {
      let counter = 1 
        assessments.map( assessment => {
          if (assessment.student_id === student.id){
            counter = counter+1
          }
        })
      let studentEntry = [student, counter]
      index.push(studentEntry)
    })
    index.sort((a,b) => a[[1]] - b[[1]])
    this.makeList(index)
  }

  ///// Push bottom 5 from index into state:index /////
  makeList = (index) => {
    let assess = []
    if (index.length <= 5) {
      index.map(student => {assess.push(student[0])})
    }else{
      var i
      for (i = 0; i < 5; i++)
      {assess.push([index[i][0],i])}
    }
    this.setState({assess:assess})
  }

  nextAssessment = () => {
    let assessments=this.state.assess
    assessments.shift()
    this.setState({assess:assessments})
  }

  ///// Send students from index to AssesmentCard component /////
  makeCards = () => {
    let students = this.state.assess
    if (this.state.assess == []) {
      return(
        <div className="assess-class__loading">
          loading
        </div>
      )
    }else{
      return(
        <ul className="assess-class__card-container">
            {students.map(student => <li className="assess-class__card-container--card"><AssessmentCard classID={this.props.classPeriod} index={student[1]} nextAssessment={this.nextAssessment} student={student[0]}/></li> )}
        </ul>
      )
    }
  }
 
  render(){
    return(
      <div className="assess-class">
      <div className="assess-class__header">Assess Class</div>

        {this.makeCards()}
      </div>
    )
  }
  

} export default AssessClass