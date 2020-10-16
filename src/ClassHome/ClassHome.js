import React from 'react';
import RosterContainer from '../Recyclables/Roster/RosterContainer';
import Graphics from '../Recyclables/Graphics/GraphicsContainer'
import SelectClass from '../SelectClass/SelectClass';
import AssessClass from '../AssessClass/AssessClass';
const homeButtons = [
  {Label:"Edit Class", Destination:'/editclass'},
  {Label:"Landing Page", Destination:'/'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"Class Assessment", Destination:'/assess'},
  {Label:"ClassHome", Destination:'/classhome'}]

class ClassHome extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      thisPeriod:props.thisPeriod,
      studentBody:props.studentBody,
      registrations:props.registrations,
      assessments:props.assessments,
      classRoster:[],
      classAssessments:[]
    }
  }

  componentDidMount(){
    this.props.navButtons(homeButtons)
    this.gatherRoster()
    this.gatherAssessments()
    console.log(this.state.thisPeriod)
    this.sendClass()
  }

  gatherRoster = () => {
    return this.state.registrations.map(registration => {
      if (registration.class_period_id == this.state.thisPeriod){
        return this.state.studentBody.map(student => {
          if (student.id == registration.id){
            let roster = this.state.classRoster
            roster.push(student)
            this.setState({
              classRoster:roster
            })
          }
        })
      }
    })
  }

  gatherAssessments = () => {
    return this.state.assessments.map(assessment => {
      if (assessment.teacher_id == this.props.loggedIn){
        let classesAssessments = this.state.classAssessments
        classesAssessments.push(assessment)
        this.setState({
          classAssessments:classesAssessments
        })
        this.props.setAssessments(this.state.classAssessments)
      }
    })
  }


  sendClass = () => {
    console.log(this.state.classRoster) 
    this.props.setClass(this.state.classRoster)   
  }

  callback = (e) => {
    console.log(e.name)
  }

  render(){
    return(
      <div>
        Class Home Page
        <RosterContainer score={'hat'} students={this.state.classRoster} callback={this.callback} />
        {/* {this.gatherRoster()} */}
        {/* <Graphics thisPeriod={this.state.thisPeriod}/> */}
      </div>
    )
  }

} export default ClassHome

// thisClass={this.state.currentClass} 
// studentBody={this.state.students} 
// registrations={this.state.registrations} 
// loggedIn={this.state.currentTeacher} 
// navButtons={this.setButtons}/>
