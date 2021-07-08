import React from 'react';
import FormToggle from "../components/FormToggle";

export default class EditClassForm extends React.Component {
    
    constructor(props){
        super(props);
        this.state={
            classPeriod:{
                level:'',
                period:'',
                subject:'',
                user_id:'',
                max:''
            }
        }
    }

    componentDidMount(){
        this.setState({
            classPeriod:{
                id:this.props.classObject.id,
                level:this.props.classObject.level,
                period:this.props.classObject.period,
                subject:this.props.classObject.subject,
                user_id:this.props.classObject.user_id,
                max:this.props.classObject.max,
            }
        })
    }

    onChange(id, value){
        if(id==="max"){      
            this.setState({
            classPeriod:{
            ...this.state.classPeriod,
            [id]:parseInt(value)
              }
          })}else{
              this.setState({
                  classPeriod:{
                  ...this.state.classPeriod,
                  [id]:value
                    }
                })

          }
    }

    
    onSubmit = (e) =>{
        e.preventDefault()
        let classPeriod = this.state.classPeriod
        let id = this.props.classObject.id
        console.log(id)
        this.props.patchClassPeriod(classPeriod, id)
        this.setState({
            classPeriod:{
            ...this.state.classPeriod,
            subject:"Change Successful"
              }
          })
    }
    
    postStudent = () => {
        // let newStudent = this.state
        // api.posts.postStudent(newStudent)
        // .then(res => {this.resetForm(); this.props.reFetchStudentBody()})
    }

    resetForm = () => {
        // let newState = {...this.state.student, name:''}
        // this.setState({student: newState})
    }
    
    render(){
        return(
            <div className="edit-class-form">
                <input type="checkbox" id="edit-class-form__checkbox" className="edit-class-form__checkbox"/>
                <div className="edit-class-form__content">

                    <label className="edit-class-form__content--form-toggle" for="edit-class-form__checkbox">
                        <FormToggle />
                    </label>



                    <form  className="edit-class-form__content--form" onSubmit={(e)=> this.onSubmit(e)}>

                        <div className="edit-class-form__content--form-title">Edit Class Name</div>

                        <input 
                            type="text" 
                            id="subject"
                            className="edit-class-form__content--form-input-name" 
                            placeholder="name"
                            value={this.state.classPeriod.subject}
                            onChange={(e) => this.onChange(e.target.id, e.target.value)}/>

                        {/* <input 
                            type="text" 
                            id="max"
                            className="edit-class-form__content--form-max" 
                            placeholder="Maximum Class Size"
                            value={this.state.classPeriod.max}
                                ///saved for future form expansion///
                            // onChange={(e) => this.onChange("name", e.target.value)}/>
                            // onChange={(e) => this.onChange(e.target.value)}/>
                            onChange={(e) => this.onChange(e.target.id, e.target.value)}/> */}


            
                    <button onClick={(e)=> this.onSubmit(e)} className="edit-class-form__content--form-submit" >
                        <span className="edit-class-form__content--form-submit-test">Submit</span>
                    </button>




                    </form>
                </div>
            </div>

    ) 
        }
}





///////////////////////////////////////////////////////////////////////////////////////////


// import React from 'react';

// export default class EditClassForm extends React.Component {
    
//     constructor(props){
//         super(props);
//         this.state={
//             classPeriod:{
//                 id:'',
//                 level:'',
//                 period:'',
//                 subject:'',
//                 user_id:'',
//             }
//         }
//     }

//     componentDidMount(){
//         this.setState({
//             classPeriod:{
//                 id:this.props.classObject.id,
//                 level:this.props.classObject.level,
//                 period:this.props.classObject.period,
//                 subject:this.props.classObject.subject,
//                 user_id:this.props.classObject.user_id,
//             }
//         })
//     }

//     ///saved for future form expansion///

//     // onChange(state,value){
//     //     const newState = {...this.state.student, [state]:value}
//     //   this.setState({student: newState})
//     // }

//     onChange(newName){
//       this.setState({
//           classPeriod:{
//           ...this.state.classPeriod,
//           subject:newName
//             }
//         })
//     }

    
//     onSubmit = (e) =>{
//         e.preventDefault()
//         // let student = {name:this.state.name, id:this.props.student.id}
//         // this.props.patchStudent(student);
//         // this.props.handleEdit(student)
//         let classPeriod = this.state.classPeriod

//         this.props.patchClassPeriod(classPeriod)
//         this.setState({
//             classPeriod:{
//             ...this.state.classPeriod,
//             subject:"Change Successful"
//               }
//           })
//     }
    
//     postStudent = () => {
//         // let newStudent = this.state
//         // api.posts.postStudent(newStudent)
//         // .then(res => {this.resetForm(); this.props.reFetchStudentBody()})
//     }

//     resetForm = () => {
//         // let newState = {...this.state.student, name:''}
//         // this.setState({student: newState})
//     }
    
//     render(){
//         return(
//             <div className="edit-class-form">
//                 <input type="checkbox" id="edit-class-form__checkbox" className="edit-class-form__checkbox"/>
//                 <div className="edit-class-form__content">

//                     <label className="edit-class-form__content--form-toggle" for="edit-class-form__checkbox">
//                         <span className="edit-class-form__content--form-toggle">X</span>
//                     </label>



//                     <form  className="edit-class-form__content--form" onSubmit={(e)=> this.onSubmit(e)}>

//                         <div className="edit-class-form__content--form-existing-name">Edit Class</div>

//                         <input 
//                             type="text" 
//                             id="new_student-form__content--form-name"
//                             className="edit-class-form__content--form-name" 
//                             placeholder="name"
//                             value={this.state.classPeriod.subject}
//                                 ///saved for future form expansion///
//                             // onChange={(e) => this.onChange("name", e.target.value)}/>
//                             onChange={(e) => this.onChange(e.target.value)}/>

            
//                     <button onClick={(e)=> this.onSubmit(e)} className="edit-class-form__content--form-submit" >
//                         <span className="edit-class-form__content--form-submit-test">Submit</span>
//                     </button>




//                     </form>
//                 </div>
//             </div>

//     ) 
//         }
// }