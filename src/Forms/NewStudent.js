import { createHashHistory } from 'history';
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
        this.props.callback()
    }
    
    postStudent = () => {
        let newStudent = this.state
        api.posts.postStudent(newStudent)
        .then(res => this.resetList())
    }

    resetList = () => {
        let newState = {...this.state.student, name:''}
        this.setState({student: newState})
    }
    
    render(){
        return(
            <form onSubmit={(e)=> this.onSubmit(e)}>
            <h3>Create a Student</h3>
    
            <div className="form-group">
                <label>Name</label>
                <input 
                    type="text" 
                    className="form-control" 
                    placeholder="name"
                    value={this.state.student.name}
                    onChange={(e) => this.onChange("name", e.target.value)}/>
            </div>
    
            <button onClick={(e)=> this.onSubmit(e)} className="btn-primary btn-block" >Create Student</button>
        </form>
    ) 
        }
}