import React from 'react';
import { api } from '../services/api';

class AssessmentCard extends React.Component{

    constructor(props) {
        super(props);
        this.state= {
            checked:false,
            index:'',
            score:'',
            note:'',
            status:"assessment-card__score",
        }
      }

    handleCheck = (e) => {
        this.setState({score:e.target.value,
        checked:true,
        status:"assessment-card__score",
        index:this.props.index})
    }

    handleChange = (value) => {
        this.setState({note:value})
    }

    handleSubmit = (e) => {
        if (this.state.checked===false){
            this.setState({status:"assessment-card__score assessment-card__score--invalid"})
        }else{
            this.postAssessment()
            this.setState({note:''})
        }
    }

    postAssessment = () => {
        let assessment ={
            participating:this.state.score,
            comment:this.state.note,
            student_id:this.props.student.id,
            class_period_id:this.props.classID,
            user_id:this.props.user.id
        }
        api.posts.postAssessment(assessment)
        .then(res=>this.props.reFetch()) 
    }

    testing = () => {

    }

    render(){
        return(
            <div>
                <input type="checkbox" id={"submit"+this.state.index} className="assessment-card__btn--checkbox"/>
                <form className={"assessment-card assessment-card__"+this.state.index} onSubmit={e => this.handleSubmit(e)}>
                    <input type="checkbox" id={"notes"+this.props.index} className={"assessment-card__flipcard--checkbox"}/>

                    <div className="assessment-card__flipcard--side assessment-card__flipcard--front">
                        <div className="assessment-card__flipcard--name">
                            {this.props.student.name}
                        </div>
                    </div>

                    <div className="assessment-card__flipcard--side assessment-card__flipcard--back">
                        <div className="assessment-card__flipcard--side assessment-card__flipcard--comment-name">
                            {this.props.student.name}
                        </div>
                        <textarea
                            type="text" 
                            className="assessment-card__flipcard--comment"
                            value={this.state.note}
                            placeholder="comment" 
                            onChange={e => this.handleChange(e.target.value)}
                        />
                    </div>

                    <div className="assessment-card__comment">
                        <label for={"notes"+this.props.index} className="assessment-card__comment--label">COMMENT</label>
                    </div>

                    <div className={this.state.status}>
                        <input type="radio" id={"true"+this.props.index} class="assessment-card__radio-input" name={this.props.index + this.props.student.name} value='true' onClick={e => this.handleCheck(e)}/> 
                        <label for={"true"+this.props.index} class="assessment-card__radio-label assessment-card__score--true">True</label>
                        <input type="radio" id={"false"+this.props.index}class="assessment-card__radio-input" name={this.props.index + this.props.student.name} value='false' onClick={e => this.handleCheck(e)}/> 
                        <label for={"false"+this.props.index} class="assessment-card__radio-label assessment-card__score--false" >False</label>
                    </div>
                        
                    <div className="assessment-card__btn" onClick={e=> this.handleSubmit(e)}>
                        <label for={"submit"+this.props.index} className="assessment-card__btn--submit">
                                Submit
                        </label>
                    </div>
                </form> 
            </div>
        ) 
    }
}

export default AssessmentCard;