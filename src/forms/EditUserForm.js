import React from 'react';
import { api } from '../services/api'

export default class EditUserForm extends React.Component {
    
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

    onChange(id, value){
        this.setState({[id]:value})
    }

    
    onSubmit = (e) =>{
        e.preventDefault()
        let user = {id:this.props.user.id, username:this.state.name}
        api.patch.patchUser(user)
        .then(res => {this.props.getUser()})
    }
    
    render(){
        return(
            <div>
                <form  className="edit-user-form" onSubmit={(e)=> this.onSubmit(e)}>
                    <div className="edit-user-form__heading">
                        Edit Profile
                    </div>
                    <input 
                        type="text" 
                        id="new_user-form__name"
                        className="edit-user-form__name" 
                        placeholder="Edit Username"
                        value={this.state.name}
                        onChange={(e) => this.onChange("name", e.target.value)}/>
                    <button onClick={(e)=> this.onSubmit(e)} className="edit-user-form__submit" >
                        <span className="edit-user-form__submit-test">Submit</span>
                    </button>
                </form>
            </div>
        ) 
    }
}