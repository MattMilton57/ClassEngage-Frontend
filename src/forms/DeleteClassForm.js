import React from 'react';

class DeleteClassForm extends React.Component{

constructor(props){
    super(props);
    this.state={
        selected:'',
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
    e.preventDefault(e)
    // let newState = {...this.state.class_period, user_id:this.props.id}
    // console.log(newState)
    // this.postClass()

    // console.log(this.state.selected.id)

    this.props.deleteClass(this.state.selected.id)

    // this.props.gatherList()
}

onSelect = (selected) =>{
    this.setState({selected:selected})

    // let newState = {...this.state.class_period, user_id:this.props.id}
    // console.log(newState)


    // this.props.gatherList()
}

// postClass = () => {
//     let newClass = {...this.state.class_period, user_id:this.props.id}
//     api.posts.postClass(newClass)
//     .then(res => 
//         {this.props.gatherList();
//         this.setState({        
//             class_period:{
//                 subject:'',
//                 period:'',
//                 level:0,
//                 user_id:this.props.id,}})})
// }

listClasses = () => {
    if (this.props.classes === ''){return <div class="select-class__welcome">Welcome! Please create some classes.</div>}
    else
    {return this.props.classes.map(classPeriod => {return(<li onClick={e => this.onSelect(classPeriod)}>Class period {classPeriod.period}: {classPeriod.subject}</li>)})}
} 

confirm = () => {
    if (this.state.selected === ''){return <div className="delete-class-form__content--form-title" >Select a class to delete</div>}
    else
    {return(
        <div className="delete-class-form__content--form-title">
            This will remove {this.state.selected.subject}
        <button onClick={(e)=> this.onSubmit(e)} className="delete-class-form__content--form-confirm-submit" >
            <span className="">Submit</span> 
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
                        <span className="delete-class-form__content--form-toggle">X</span>
                </label>

                <form className="delete-class-form__content--form" onSubmit={(e)=> this.onSubmit(e)}>
                    {/* <div className="delete-class-form__content--form-title" >Select a class to delete</div> */}

                    <div className="delete-class-form__content--form-class-list">
                        <ul className="">
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