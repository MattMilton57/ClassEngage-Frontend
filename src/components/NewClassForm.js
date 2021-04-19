import React from 'react';
import { SubjectSubscriber } from 'rxjs/internal/Subject';
import { api } from '../services/api'

class NewClassForm extends React.Component{

constructor(props){
    super(props);
    this.state={
        class_period:{
            subject:'',
            period:'',
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

    // this.props.gatherList()
}

postClass = () => {
    let newClass = {...this.state.class_period, user_id:this.props.id}
    api.posts.postClass(newClass)
    .then(res => 
        {this.props.gatherList();
        this.setState({        
            class_period:{
                subject:'',
                period:'',
                level:0,
                user_id:this.props.id,}})})
}

render(){
    return(
        <div className="new-class-form">
            <input type="checkbox" id="new-class-form__checkbox" className="new-class-form__checkbox"/>

            <div className="new-class-form__content">

                <label className="new-student-form__content--form-toggle" for="new-class-form__checkbox">
                        <span className="new-class-form__content--form-toggle">X</span>
                </label>

                <form className="new-class-form__content--form" onSubmit={(e)=> this.onSubmit(e)}>
                    <div className="new-class-form__content--form-title" >Create a class</div>

                        <input 
                            type="text" 
                            className="new-class-form__content--form-subject new-class-form__content--form-input" 
                            placeholder="subject"
                            value={this.state.class_period.subject}
                            onChange={(e) => this.onChange("subject", e.target.value)}/>

                        <input 
                            type="text" 
                            className="new-class-form__content--form-period new-class-form__content--form-input"
                            placeholder="period"
                            value={this.state.class_period.period}
                            onChange={(e) => this.onChange("period", e.target.value)}/>


                    {/* <div className="form-group">
                        <label>level</label>
                        <input 
                            type="level" 
                            className="form-control" 
                            placeholder="level"
                            value={this.state.class_period.level}
                            onChange={(e) => this.onChange("level", e.target.value)}/>
                    </div> */}

                    <button onClick={(e)=> this.onSubmit(e)} className="new-class-form__content--form-submit" >
                        <span className="">Submit</span> 
                    </button>
                </form>
            </div>
        </div>
) 
    }
}export default NewClassForm;