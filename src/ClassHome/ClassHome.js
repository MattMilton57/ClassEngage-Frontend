import React from 'react';
import RosterContainer from '../Recyclables/Roster/RosterContainer';
import Graphics from '../Recyclables/Graphics/GraphicsContainer'
import SelectClass from '../SelectClass/SelectClass';
import AssessClass from '../AssessClass/AssessClass';
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
      registrations:props.registrations,
      assessments:props.assessments,
      classRoster:[],
      classAssessments:[],
      classScore:''
    }
  }

  componentDidMount(){
    this.props.navButtons(homeButtons)
    this.gatherRoster()
    this.gatherAssessments()
    this.sendClass()
  }

  gatherRoster = () => {
    return this.state.registrations.map(registration => {
      if (registration.class_period_id == this.state.thisPeriod){
        // console.log(registration)
        return this.state.studentBody.map(student => {
          if (student.id == registration.student_id){
            // console.log(student)
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
    // this.props.refresh()
    // this.setState({assessments:this.props.assessments})
    let allAssessments=this.props.assessments
    // console.log(allAssessments)
    let classAssessments=[]
    allAssessments.map(assessment => {
      if (assessment.class_period_id===this.props.thisPeriod){
        // if (assessment.class_period_id===this.state.thisPeriod){
        //   console.log(assessment)

        //   // console.log(assessment)
          classAssessments.push(assessment)

        // }
        console.log(assessment)

      }
    })
    this.setState({
      classAssessments:classAssessments
    })
    // this.props.refresh()
  }

  // gatherAssessments = () => {
  //   let classesAssessments = this.state.classAssessments
  //   return this.state.assessments.map(assessment => {
  //     if (assessment.teacher_id == this.props.loggedIn){(
  //       if (assessment.class_id = this.props.thisPeriod){
  //         let classesAssessments = this.state.classAssessments
  //         classesAssessments.push(assessment)
  //         this.setState({
  //           classAssessments:classesAssessments
  //         })
  //         this.props.setAssessments(this.state.classAssessments)
  //       }this.classParticipation()
  //     })
  //   })
  // }


  // gatherAssessments = () => {
  //   return this.state.assessments.map(assessment => {
  //     if (assessment.teacher_id == this.props.loggedIn){
  //       let classesAssessments = this.state.classAssessments
  //       classesAssessments.push(assessment)
  //       this.setState({
  //         classAssessments:classesAssessments
  //       })
  //       this.props.setAssessments(this.state.classAssessments)
  //     }this.classParticipation()
  //   })
  // }

  classParticipation = () => {
    let totalScore=0
    let totalAssessments = this.state.classAssessments.length
    this.state.classAssessments.map( assessment => {if (assessment.participating == true) totalScore=(totalScore+1)})
    let classScore=(totalScore/totalAssessments)
    // this.setState({classScore:classScore})
    return classScore
  }


  sendClass = () => {
    this.props.setClass(this.state.classRoster)   
  }

  callback = (e) => {
    // console.log(e.name)
  }

  render(){
    return(
      <div>
        Class Home Page
        This class is at {this.classParticipation()} participation
        {/* <button onClick={this.props.refresh()}>clickMe</button> */}
        <RosterContainer 
          assessments={this.state.classAssessments} 
          score={true} 
          students={this.state.classRoster} 
          callback={this.callback}
          classPeriod={this.props.thisPeriod} />
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
