import React from 'react';
import { api } from '../services/api'
class AssessmentCard extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            score:'',
            note:'',
        }
      }

handleCheck = (e) => {
    this.setState({score:e.target.value})
}

handleChange = (value) => {
  this.setState({note:value})
}

handleSubmit = (e) => {
    e.preventDefault(e)
    this.postAssessment()
}

postAssessment = () => {
    let assessment ={
        participating:this.state.score,
        comment:this.state.note,
        student_id:this.props.student.id,
        class_period_id:this.props.classID,
    }
    api.posts.postAssessment(assessment) 
}

render(){
    return(
            <form className={"assessment__card-"+this.props.index} onSubmit={e => this.handleSubmit(e)}>
                <div className="assessment__card-name">{this.props.student.name}</div>
                <div className="assessment__card-score assessment__card-score--true">
                        <input type="radio" id="true" class="card__radio-input" name={this.props.index + this.props.student.name} value='true' onClick={e => this.handleCheck(e)}/> 
                        <label for="true">True</label>
                </div>
                <div className="assessment__card-score assessment__card-score--false">
                        <input type="radio" id="false" class="card__radio-input" name={this.props.index + this.props.student.name} value='false' onClick={e => this.handleCheck(e)}/> 
                        <label for="false">False</label>
                </div>
                <div className="assessment__card-comment">
                        <input type="text" className="assessment__card-comment--input" value={this.state.note} onChange={e => this.handleChange(e.target.value)}/>
                </div>
                <button className="assessment__card-btn">
                    Submit
                </button>
            </form>    
        ) 
    }
}

export default AssessmentCard;