import React from 'react';
import FormToggle from "../components/FormToggle";

export default class EditStudentForm extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            name:''
        }
    }

    componentDidMount(){

    }

    ///saved for future form expansion///

    // onChange(state,value){
    //     const newState = {...this.state.student, [state]:value}
    //   this.setState({student: newState})
    // }

    onChange(newName){
      this.setState({name: newName})
    }
    
    onSubmit = (e) =>{
        e.preventDefault()
        let student = {name:this.state.name, id:this.props.student.id}
        this.props.patchStudent(student);
        this.props.handleEdit(student)
        this.setState({name:''})
    }
    
    postStudent = () => {
        // let newStudent = this.state
        // api.posts.postStudent(newStudent)
        // .then(res => {this.resetForm(); this.props.reFetchStudentBody()})
    }

    resetForm = () => {
        // let newState = {...this.state.student, name:''}
        // this.setState({student: newState})
    }
    
    render(){
        return(
            <div className="edit-student-form">
                <input type="checkbox" id="edit-student-form__checkbox" className="edit-student-form__checkbox"/>
                <div className="edit-student-form__content">

                    <label className="edit-student-form__content--form-toggle" for="edit-student-form__checkbox">
                        <FormToggle />
                    </label>



                    <form  className="edit-student-form__content--form" onSubmit={(e)=> this.onSubmit(e)}>

                        <div className="edit-student-form__content--form-title">Edit Student</div>

                        <input 
                            type="text" 
                            id="new_student-form__content--form-name"
                            className="edit-student-form__content--form-input-name" 
                            placeholder="name"
                            value={this.state.name}
                                ///saved for future form expansion///
                            // onChange={(e) => this.onChange("name", e.target.value)}/>
                            onChange={(e) => this.onChange(e.target.value)}/>

            
                    <button onClick={(e)=> this.onSubmit(e)} className="edit-student-form__content--form-submit" >
                        <span className="edit-student-form__content--form-submit-test">Submit</span>
                    </button>




                    </form>
                </div>
            </div>

    ) 
        }
}