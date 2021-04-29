import React from 'react';
import RosterRemainder from "../components/RosterRemainder";

export default class DeleteStudentForm extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            selectedStudent:'',
            studentRegistrations:'',
            studentSchedule:'',
            registrationIds:'',
            assessments:''
        }
    }
    
    // resetForm = () => {
    //     let newState = {...this.state.student, name:''}
    //     this.setState({student: newState})
    // }

    onSelect = (student) => {
        let studentAssessments = []
        this.props.assessments.forEach(assessment => {if(assessment.student_id === student.id){studentAssessments.push(assessment.id)}})
        let registrationList = []
        this.props.registrations.forEach(registration => {if(registration.student_id === student.id){registrationList.push(registration)}})
        let classList = []
        let teachersRegistrations = []
        let registrationIds = []
        registrationList.forEach(registration=> {this.props.classes.forEach(classPeriod => {if ((registration.class_period_id === classPeriod.id) && (classPeriod.user_id === this.props.user.id)) {classList.push(classPeriod); teachersRegistrations.push(registration); registrationIds.push(registration.id)}}) })
        this.setState({
            selectedStudent:student,
            studentRegistrations:teachersRegistrations,
            studentSchedule:classList,
            registrationIds:registrationIds,
            studentAssessments:studentAssessments,
        })
    }

    displaySchedule = () => {
        if (this.state.studentSchedule !== '' ){
            return(
                <div className="">
                    Deleting this student will also delete their registrations from the following classes:
                    <ul className="">
                        {this.state.studentSchedule.map(classPeriod => {return(<li>{classPeriod.subject}</li>)})}
                    </ul>
                </div>
            )
        }
    }

    onSubmit = (e) => {
        e.preventDefault(e)
        // console.log(this.state.selectedStudent.id, this.state.registrationIds, this.state.studentAssessments)

        this.props.deleteStudent(this.state.selectedStudent.id, this.state.registrationIds, this.state.studentAssessments)
        // console.log(this.state.selectedStudent.id, this.state.registrationIds)
    }
    
    render(){
        return(
            <div className="delete-student-form">
                <input type="checkbox" id="delete-student-form__checkbox" className="delete-student-form__checkbox"/>
                <div className="delete-student-form__content">

                    <label className="delete-student-form__content--form-toggle delete-student-form__toggle" htmlFor="delete-student-form__checkbox">
                        <span className="delete-student-form__content--form-toggle">X</span>
                    </label>



                    <form  className="delete-student-form__content--form" onSubmit={(e)=> this.onSubmit(e)}>

                    <div className="delete-student-form__content--form-roster-container">

                        <div className="edit-class__headline--title">
                            Student Body
                        </div>
                        
                        <RosterRemainder roster={this.props.roster} studentBody={this.props.studentBody} callback={student => this.onSelect(student)} registerAction=""/>

                    </div>

                    <div className="delete-student-form__content--form-title">
                        delete a student
                    </div>

                    <div className="delete-student-form__content--form-schedule">
                        {this.displaySchedule()}
                    </div>

                    <button onClick={(e)=> this.onSubmit(e)} className="delete-student-form__content--form-submit" >
                        <span className="delete-student-form__content--form-submit-test">Delete Student</span>
                    </button>




                    </form>
                </div>
            </div>

    ) 
        }
}