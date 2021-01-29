import React from 'react';
import RosterContainer from '../Recyclables/Roster/RosterContainer';
import Graphics from '../Recyclables/Graphics/GraphicsContainer'
import SelectClass from '../SelectClass/SelectClass';
import AssessClass from '../AssessClass/AssessClass';
import { api } from '../services/api'
const homeButtons = [
  {Label:"Landing Page", Destination:'/'},
  {Label:"Edit Class", Destination:'/editclass'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"Assess Students", Destination:'/assess'}]

class ClassHome extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      thisPeriod:props.thisPeriod,
      studentBody:props.studentBody,
      registrations:'',
      assessments:props.assessments,
      classRoster:[],
      classAssessments:[],
      classScore:'',
      allStudents:''
    }
  }

  componentDidMount(){
    const id = this.props.thisPeriod
    this.props.navButtons(homeButtons)
    this.fetchRegistrations(id)
    this.fetchClassesAssessments(id)
    // this.fetchStudents()
    // this.props.fetchReg()
    // this.gatherRoster()
    // this.gatherAssessments()
    // this.sendClass()
  }

  fetchRegistrations = (id) => {
    (api.get.filteredRegistrations({class_period_id:id}))
    .then(res => this.setState({registrations:res}))
    .then(this.fetchStudents)
  }

  fetchStudents = () => {
    api.get.fetchStudents()
    .then(res => this.setState({allStudents:res}))
    // .then(console.log(this.state.allStudents))
    // .then(console.log(res))

    .then(res => this.buildClassList())
  }

  fetchClassesAssessments = (id) => {
    api.get.classesAssessments({class_period_id:id})
    .then(res => this.setState({classAssessments:res}))
    // .then(res => (this.setState({classesAssessments:res})))
  }

  buildClassList = () => {
    // console.log(this.state.allStudents)
    return this.state.registrations.map (registration => {
      return this.state.allStudents.map (student => {
        if (student.id == registration.student_id){
          let roster = this.state.classRoster
          roster.push(student)
          this.setState({
            classRoster:roster
          })
        }
      })
    })
  }

  // gatherRoster = () => {
  //   return this.state.registrations.map(registration => {
  //     if (registration.class_period_id == this.state.thisPeriod){
  //       return this.state.studentBody.map(student => {
  //         if (student.id == registration.student_id){
  //           let roster = this.state.classRoster
  //           roster.push(student)
  //           this.setState({
  //             classRoster:roster
  //           })
  //         }
  //       })
  //     }
  //   })
  // }

  // gatherAssessments = () => {
  //   let allAssessments=this.props.assessments
  //   let classAssessments=[]
  //   allAssessments.map(assessment => {
  //     if (assessment.class_period_id===this.props.thisPeriod){
  //         classAssessments.push(assessment)
  //     }
  //   })
  //   this.setState({
  //     classAssessments:classAssessments
  //   })
  // }

  classParticipation = () => {
    let totalScore=0
    let totalAssessments = this.state.classAssessments.length
    if (totalAssessments>0){
    this.state.classAssessments.map( assessment => {if (assessment.participating == true) totalScore=(totalScore+1)})
    let classScore=(totalScore/totalAssessments)
    return <div>This class is at {(classScore*100)} % participation </div>
    }else{
      return(<div>No assessments yet</div>)
    }
  }

  sendClass = () => {
    this.props.setClass(this.state.classRoster)   
  }

  callback = (e) => {
    this.props.setStudent(e)
  }

  render(){
    return(
      <div>
        Class Home Page
        {this.classParticipation()}
        <RosterContainer 
          assessments={this.state.classAssessments} 
          score={true} 
          students={this.state.classRoster} 
          callback={this.callback}
          classPeriod={this.props.thisPeriod} 
          linkTo={true}/>
      </div>
    )
  }

} export default ClassHome