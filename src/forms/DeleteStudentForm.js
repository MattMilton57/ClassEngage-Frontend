import { createHashHistory } from 'history';
import React from 'react';
import RosterRemainder from "../components/RosterRemainder";

import { api } from '../services/api'

export default class DeleteStudentForm extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            student:{
                name:'',
            }
        }
    }

    onChange(state,value){
        const newState = {...this.state.student, [state]:value}
      this.setState({student: newState})
    }
    
    onSubmit = (e) =>{
        e.preventDefault()
        this.postStudent()
    }
    
    postStudent = () => {
        let newStudent = this.state
        api.posts.postStudent(newStudent)
        .then(res => {this.resetForm(); this.props.reFetchStudentBody()})
    }

    resetForm = () => {
        let newState = {...this.state.student, name:''}
        this.setState({student: newState})
    }
    
    render(){
        return(
            <div className="delete-student-form">
                <input type="checkbox" id="delete-student-form__checkbox" className="delete-student-form__checkbox"/>
                <div className="delete-student-form__content">

                    <label className="delete-student-form__content--form-toggle" for="delete-student-form__checkbox">
                        <span className="delete-student-form__content--form-toggle">X</span>
                    </label>



                    <form  className="delete-student-form__content--form" onSubmit={(e)=> this.onSubmit(e)}>

                    <div className="delete-student-form__content--form-roster">
                    <div className="edit-class__headline--student-body">
              <div className="edit-class__headline--title">Student Body</div>
            </div>
                        <RosterRemainder roster={this.props.roster} studentBody={this.props.studentBody} callback={this.props.callback} registerAction=""/>
                    </div>

                    <div className="delete-student-form__content--form-title">
                        delete a student
                    </div>

                    <div className="delete-student-form__content--form-schedule">
                        schedule list
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