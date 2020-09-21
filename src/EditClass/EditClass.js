import React from 'react';
import ClassRosterContainer from './ClassRosterContainer'
import StudentBodyContainer from './StudentBodyContainer'

const DefaultButtons = [
  {Label:"Landing Page", Destination:'/'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"ClassHome", Destination:'/classhome'}]
class EditClass extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      allStudents: [],
      classRoster: [],
      thisPeriod:''
    }
  }

  componentDidMount(){
    this.props.navButtons(DefaultButtons)
    this.setState({
      allStudents:this.props.studentBody,
      thisPeriod:this.props.thisPeriod
    })
  }

  register = (e) => {
    // console.log(e)
    // this.props.sendRegistration({class_period_id:this.state.thisClass.id, student_id:e.id})
        // console.log(e)
    // this.props.sendRegistration({class_period_id:this.state.thisClass.id, student_id:e.id})
    const registration = {
      class_period_id: this.state.thisPeriod.id,
      student_id: e.id,
      }
    this.props.sendRegistration(registration)  
  }

  render(){
    return(
      <div>
        <ClassRosterContainer students={this.state.classRoster}/>
        <StudentBodyContainer students={this.state.allStudents} callback={this.register}/>
      </div>
    )
  }

} export default EditClass

// t.integer "class_period_id", null: false
// t.integer "student_id", null: false