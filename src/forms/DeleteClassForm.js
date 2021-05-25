import React from 'react';
import FormToggle from "../components/FormToggle";


class DeleteClassForm extends React.Component{

constructor(props){
    super(props);
    this.state={
        selected:'',
    }
}

componentDidMount(){
    this.setUser()
}

setUser = () => {
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
    e.preventDefault(e)
    this.props.deleteClass(this.state.selected.id)
    this.setState({selected:''})
}

onSelect = (selected) =>{
    this.setState({selected:selected})
}

highlight = (id) => {
    if (this.state.selected.id === id){
        return "delete-class-form__content--form-class-list-container-class-period delete-class-form__content--form-class-list-container-class-period-selected"
    }else{
        return "delete-class-form__content--form-class-list-container-class-period"
    }
}

listClasses = () => {
    if (this.props.classes === ''){return <div class="select-class__welcome">Welcome! Please create some classes.</div>}
    else
    {return this.props.classes.map(classPeriod => {
        return(<li className={this.highlight(classPeriod.id)} onClick={e => this.onSelect(classPeriod)}>
            <div className="delete-class-form__content--form-class-list-container-class-period-period">{classPeriod.period}</div> 
            <div className="delete-class-form__content--form-class-list-container-class-period-subject">{classPeriod.subject}</div> 
            </li>)})}
} 

confirm = () => {
    if (this.state.selected === '')
    {return <div className="delete-class-form__content--form-title" >Select a class to delete</div>}
    else
    {return(
        <div className="delete-class-form__content--form-title">
            <button onClick={(e)=> this.onSubmit(e)} className="delete-class-form__content--form-confirm-submit btn" >
                <span className="">delete class</span> 
            </button>
        </div>
    )}
} 

render(){
    return(
        <div className="delete-class-form">
            <input type="checkbox" id="delete-class-form__checkbox" className="delete-class-form__checkbox"/>

            <div className="delete-class-form__content">

                <label className="new-student-form__content--form-toggle" for="delete-class-form__checkbox">
                <FormToggle />
                </label>

                <form className="delete-class-form__content--form" onSubmit={(e)=> this.onSubmit(e)}>
                    {/* <div className="delete-class-form__content--form-title" >Select a class to delete</div> */}

                    <div className="delete-class-form__content--form-class-list">
                        <ul className="delete-class-form__content--form-class-list-container">
                            {this.listClasses()}
                        </ul>
                    </div>

                    <div className="delete-class-form__content--form-confirm">
                        <ul className="">
                            {this.confirm()}
                        </ul>
                    </div>
                </form>
            </div>
        </div>
) 
    }
}export default DeleteClassForm;