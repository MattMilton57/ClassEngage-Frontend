import React from 'react';
import { api } from '../services/api'

export default class NewStudentForm extends React.Component {
    
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
            <div className="new-student-form">
                <input type="checkbox" id="new-student-form__checkbox" className="new-student-form__checkbox"/>
                <div className="new-student-form__content">

                    <label className="new-student-form__content--form-toggle" htmlFor="new-student-form__checkbox">
                        <span className="new-student-form__content--form-toggle">X</span>
                    </label>



                    <form  className="new-student-form__content--form" onSubmit={(e)=> this.onSubmit(e)}>

                    <div className="new-student-form__content--form-title">Create a student</div>
                        <input 
                            type="text" 
                            id="new_student-form__content--form-name"
                            className="new-student-form__content--form-name" 
                            placeholder="New Student"
                            value={this.state.student.name}
                            onChange={(e) => this.onChange("name", e.target.value)}/>
            
                    <button onClick={(e)=> this.onSubmit(e)} className="new-student-form__content--form-submit" >
                        <span className="new-student-form__content--form-submit-test">Submit</span>
                    </button>




                    </form>
                </div>
            </div>

    ) 
        }
}