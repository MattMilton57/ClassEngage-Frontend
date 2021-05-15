import React from 'react';
import FormToggle from "../components/FormToggle";
import NewStudentForm from "../forms/NewStudentForm";
import DeleteStudentForm from "../forms/DeleteStudentForm"
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import EditStudentForm from './EditStudentForm';

export default class EditRosterForm extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            selected:1
        }
    }

    selectorFocus = (focus) => {
        this.setState({selected:focus})
    }

    highlight = (id) => {
        if (this.state.selected === id){
            return "edit-roster-form__content-selectors-link-selected"
        }else{
            return "edit-roster-form__content-selectors-link"
        }
    }

    render(){
        return(
            <div className="edit-roster-form">
                <input type="checkbox" id="edit-roster-form__checkbox" className="edit-roster-form__checkbox"/>
                    <label className="edit-roster-form__content--form-toggle" for="edit-roster-form__checkbox">
                        <FormToggle />
                    </label>
                <div className="edit-roster-form__content">
                    <div className="edit-roster-form__content-selectors">
                        <div onClick={e => this.selectorFocus(1)} className={this.highlight(1)}>
                            Add a Student
                        </div>
                        <div onClick={e => this.selectorFocus(2)} className={this.highlight(2)}>
                            Delete a Student
                        </div>
                    </div>
                    <div className="edit-roster-form__content--add-student">
                    <NewStudentForm 
                        reFetchStudentBody={this.props.reFetchStudentBody}
                        user={this.props.user}
                        />
                    </div>
                    <div className="edit-roster-form__content--delete-student">
                    <DeleteStudentForm 
                        roster={this.props.roster}
                        studentBody={this.props.studentBody}
                        assessments={this.props.assessments}
                        classes={this.props.classes}
                        registrations={this.props.registrations}
                        deleteStudent={this.props.deleteStudent}
                        user={this.props.user}/>
                    </div>
                </div>
            </div>
        ) 
    }


} 