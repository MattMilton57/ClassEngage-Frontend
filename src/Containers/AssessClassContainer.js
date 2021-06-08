import React from 'react';
import TitleBox from "../components/TitleBox"
import LastAssessment from "../components/LastAssessment"
import TotalAssessments from '../components/TotalAssessments';
import AssessmentCard from '../components/AssessmentCard';
import { api } from '../services/api'

class AssessClass extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      assess:[],
      instructions:'no',
      classesAssessments:[]
    }
  }

  componentDidMount(props){
    this.buildAssessmentIndex()
    this.needInstructions()
  }

  ///// Create index of student objects with # of times assessed /////
  buildAssessmentIndex = () => {
    let roster=this.props.roster
    let assessments=this.props.assessments
    let index = []
    roster.forEach(student => {
      let counter = 1 
        assessments.forEach( assessment => {
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

  ///// Push bottom 5 (or all students if <5) from index into state:index /////
  makeList = (index) => {
    let assess = []
    if (index.length <= 5) {

      var i
      for (i = 0; i < index.length; i++)
      {assess.push([index[i][0],i])}
    }else{
      var i
      for (i = 0; i < 5; i++)
      {assess.push([index[i][0],i])}
    }
    // console.log(assess)
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
    if (this.state.assess === []) {
      return(
        <div className="assess-class__loading">
          loading
        </div>
      )
    }else{
      return(
        <div className="assess-class__card-container-shell">
          <ul className="assess-class__card-container-shell-list">
              {students.map(student => <li key={student.name} className="assess-class__card-container--card">
                                          <AssessmentCard
                                            user={this.props.user}  
                                            reFetch={this.props.reFetch}
                                            classID={this.props.classPeriod} 
                                            index={student[1]} 
                                            nextAssessment={this.nextAssessment} 
                                            student={student[0]}/></li> )}
          </ul>

        </div>
      )
    }
  }

  needInstructions= () => {
    api.get.classesAssessments({class_period_id:this.props.classPeriod})
    // .then(res => {this.setState({classAssessments:res}); this.testDate(res)})
    // .then(res => {this.setState({instructions:'go'})})
    .then(res => {this.setClassesAssessments(res)})
  }

  setClassesAssessments = (assessments) => {
    let classesAssessments = []
    assessments.forEach(assessment => {this.props.roster.forEach(student=>{if(student.id === assessment.student_id){classesAssessments.push(assessment)}})})
    this.setState({classesAssessments:classesAssessments, instructions:'go'})
  }

  instructions = () => {
    if(this.props.roster.length === 0)
    {return(<div className="assess-class__new" >
        <div className="assess-class__new--welcome">
          Welcome to Class Engage
        </div>
        <div className="assess-class__new--guide">
          click on the edit class tab in the navbar to create and register some students
        </div>
      </div>)}
    else 
    if ((this.state.classesAssessments.length < 1)&&(this.state.instructions === 'go'))
    {return(
      <ul className="assess-class__instructions">
        <li className="assess-class__instructions--list-item assess-class__instructions--list-item-1">to submit an assessment:</li>
        <li className="assess-class__instructions--list-item assess-class__instructions--list-item-2">click true or false</li>
        <li className="assess-class__instructions--list-item assess-class__instructions--list-item-3">click comment to add a comment</li>
        <li className="assess-class__instructions--list-item assess-class__instructions--list-item-4">click submit to submit the assessment</li>
      </ul>
    )}
    else
    {return(
      <div className="assess-class__future-expansion">

      </div>
    )}
  }
 
  render(){
    return(
      <div className="assess-class">
        <div className="assess-class__card-container">
          
          {this.makeCards()}


        </div>

        <div className="assess-class__class-name">
          <TitleBox
            title={this.props.classObject.subject}
            />
        </div>

        <div>
          {this.instructions()}

        </div>

        <div className="assess-class__last-assessment">
          <LastAssessment
            assessment={this.props.assessments[this.props.assessments.length-1]}
            />
        </div>

        <div className="assess-class__total-assessments">
          <TotalAssessments 
          assessments={this.props.assessments}/>

        </div>
      </div>
    )
  }
  

} export default AssessClass