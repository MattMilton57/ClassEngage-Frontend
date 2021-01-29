import React from 'react';
import { api } from '../services/api'

class CreateAClass extends React.Component{

constructor(props){
    super(props);
    this.state={
        class_period:{
            subject:'',
            period:0,
            level:0,
            user_id:props.props.user.user.id,
        }
    }
}

componentDidMount(){
    
    // console.log(this.props.props.user.user.id)
}

onChange(state,value){
    const newState = {...this.state.class_period, [state]:value}
  this.setState({class_period: newState})
}

onSubmit = (e) =>{
    e.preventDefault()
    this.postClass()
}

postClass = () => {
    let newClass = this.state
    api.posts.postClass(newClass)
}

render(){
    return(
        <form onSubmit={(e)=> this.onSubmit(e)}>
        <h3>Create a class</h3>

        <div className="form-group">
            <label>subject</label>
            <input 
                type="text" 
                className="form-control" 
                placeholder="subject"
                value={this.state.class_period.subject}
                onChange={(e) => this.onChange("subject", e.target.value)}/>
        </div>

        <div className="form-group">
            <label>period</label>
            <input 
                type="text" 
                className="form-control" 
                placeholder="period"
                value={this.state.class_period.period}
                onChange={(e) => this.onChange("period", e.target.value)}/>
        </div>

        <div className="form-group">
            <label>level</label>
            <input 
                type="level" 
                className="form-control" 
                placeholder="level"
                value={this.state.class_period.level}
                onChange={(e) => this.onChange("level", e.target.value)}/>
        </div>

        <button className="btn-primary btn-block" >Create Class</button>
    </form>
) 
    }
}export default CreateAClass;