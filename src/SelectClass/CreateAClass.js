import React from 'react';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { api } from '../services/api'

class CreateAClass extends React.Component{

constructor(props){
    super(props);
    this.state={
        class_period:{
            subject:'',
            period:0,
            level:0,
            user_id:this.props.id,
        }
    }
}

componentDidMount(){
    // let hat = (this.props.id)
    // console.log(hat)
    // const newState = {...this.state.class_period, user_id:this.props.id}
    // console.log(newState)
    // this.setState({class_period:newState})
    // console.log(props.id)
    this.setUser()
}

setUser = () => {
        let hat = (this.props.id)
    console.log(hat)
    let newState = {...this.state.class_period, user_id:this.props.id}
    console.log(newState)
    this.setState({class_period:newState})
    console.log(this.props.id)
}

onChange(state,value){
    let newState = {...this.state.class_period, [state]:value}
  this.setState({class_period: newState})
}

onSubmit = (e) =>{
    e.preventDefault()
    // let newState = {...this.state.class_period, user_id:this.props.id}
    // console.log(newState)
    this.postClass()
    this.props.gatherList()
}

postClass = () => {
    let newClass = {...this.state.class_period, user_id:this.props.id}
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