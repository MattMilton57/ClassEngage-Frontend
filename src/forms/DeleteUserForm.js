import React from 'react';
import { api } from '../services/api'

export default class DeleteUserForm extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            user:'',
            name:''
        }
    }

    componentDidMount(){
        this.setState({
            user:this.props.user
        })
    }

    ///saved for future form expansion///

    // onChange(state,value){
    //     const newState = {...this.state.student, [state]:value}
    //   this.setState({student: newState})
    // }

    onChange(id, value){
        this.setState({[id]:value})
    }

    
    onSubmit = (e) =>{
        e.preventDefault()
        // let student = {name:this.state.name, id:this.props.student.id}
        // this.props.patchStudent(student);
        // this.props.handleEdit(student)
        // let classPeriod = this.state.classPeriod
        // let id = this.props.classObject.id
        // console.log(id)
        // this.props.patchClassPeriod(classPeriod, id)
        // this.setState({
        //     classPeriod:{
        //     ...this.state.classPeriod,
        //     subject:"Change Successful"
        //       }
        //   })
        api.delete.deleteUser(this.state.user.id)
        .then(res => this.props.logOutRedirect())
        // console.log(this.state.user.id)
    }
    
    postUser = () => {
    }

    resetForm = () => {
        // let newState = {...this.state.student, name:''}
        // this.setState({student: newState})
    }
    
    render(){
        return(
            <div>

                    <label for="delete-user-form__checkbox" className="delete-user-form__toggle" >
                        Delete Your Account
                    </label>
                <form  className="delete-user-form" onSubmit={(e)=> this.onSubmit(e)}>
                    <input type="checkbox" id="delete-user-form__checkbox" className="delete-user-form__checkbox"/>
                    <div className="delete-user-form__confirm">
                        <div className="delete-user-form__confirm-warning">
                            <div className="delete-user-form__confirm-warning-heading">
                                Warning!
                            </div>
                            <div className="delete-user-form__confirm-warning-text">
                                This will delete your account, as well as all classes, students, and assessments that you have created. 
                                This action cannot be undone.
                            </div>
                        </div>
                        <input 
                            type="text" 
                            id="delete-user-form__confirm-confirmation"
                            className="delete-user-form__confirm-confirmation" 
                            placeholder="Type DELETE and press submit"
                            value={this.state.confirmation}
                            onChange={(e) => this.onChange("confirmation", e.target.value)}/>
                        <button onClick={(e)=> this.onSubmit(e)} className="delete-user-form__confirm-submit" >
                            <span className="delete-user-form__confirm-submit-delete">Submit</span>
                        </button>
                    </div>
                </form>
            </div>
        ) 
    }
}