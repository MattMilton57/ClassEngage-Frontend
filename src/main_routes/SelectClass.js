import React from 'react';
import ClassList from '../components/ClassList';
import NewClassForm from "../forms/NewClassForm"
import DeleteClassForm from "../forms/DeleteClassForm"
import HeaderContainer from '../containers/HeaderContainer';
import MenuHeader from "../components/MenuHeader"
import MenuFooter from "../components/MenuFooter"
import logo_svg from "../img/logo-hand.svg";
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { api } from '../services/api'

class SelectClass extends React.Component {

  constructor(props) {
    super();
    this.state= {
      allclasses:'',
      id:''
    }
  }

  componentDidMount(){
    this.checkUser()
    console.log('Select Class mounted')
  }

  test = (e) => {
    e.preventDefault()
    console.log('test')
  }

  checkUser = () => {
    (api.get.fetchCurrentUser())
    .then (res => this.setState({id:res.id}))
    .then (res => this.gatherList())
  }

  gatherList = () => {
    api.get.filteredClasses({user_id:this.state.id})
    .then (res => this.sortClassList(res))

    // .then (res => this.setState({allclasses:res}))
  }

  sortClassList = (classList) => {
    classList.sort((a, b) => (a.period - b.period))
    this.setState({allclasses:classList})

  }

  deleteClassCycle = (classPeriod) => {
    const id = {class_period_id:classPeriod}
    console.log(id)
    api.delete.deleteClassPeriodRegistrations(id)
    .then(res => this.deleteClassAssessments(classPeriod))
  }

  deleteClassAssessments = (classPeriod) => {
    const id = {class_period_id:classPeriod}
    api.delete.deleteClassPeriodAssessments(id)
    .then(res => this.deleteClassPeriod(classPeriod))
  }

  deleteClassPeriod = (classPeriod) => {
    const id = classPeriod
    console.log(id)
    // const id = {class_period_id:classPeriod.id}
    api.delete.deleteClassPeriod(id)
    // .then(res => console.log("class successfully deleted"), this.gatherList())
    .then(res => this.gatherList())

  }

  showList = () => {
    if (this.state.allclasses == ''){return <div class="select-class__welcome"></div>}
    else
    {return <ClassList classNumber={this.props.classNumber} classes={this.state.allclasses}/>}
  }

  hilight = () => {
    if (this.state.allclasses == '')
    {return "select-class__sidebar--class-list-create-class-button class-list__class class-list__class-highlighted"}
    else
    {return "select-class__sidebar--class-list-create-class-button class-list__class"}
    
  }

  render(){
    return(
      <div className="select-class">

        <div className="select-class__header">
          <HeaderContainer 
            getUser={this.props.getUser} 
            logOut={this.props.logOut} 
            history={this.props.history} 
            user={this.props.user} 
            headerText={""}/>
        </div>
        

        <div className="select-class__nav">
          <div className=" navBar__header menu-header select-class__nav--header">
             <div className="navBar__header-logo--box">
                <embed src={logo_svg} alt="Logo" className="select-class__nav--header-logo"/>
            </div>
          </div>

           <div className="select-class__class-list select-class__nav--class-list">
             <div className="select-class__class-list select-class__nav--class-list-selection">
               {this.showList()}
             </div>

             <div className="select-class__header select-class__nav--class-list-create-class">
               <label for="new-class-form__checkbox" className="select-class__nav--class-list-create-class-button class-list__class">
                 <span className="select-class__nav--class-list-create-class-button-span">New Class</span>
              </label>
               <label for="delete-class-form__checkbox" className="select-class__nav--class-list-create-class-button class-list__class">
                 <span className="select-class__nav--class-list-create-class-button-span">Delete Class</span>
               </label>
            </div>
          </div>

           <div className="select-class__footer select-class__nav--footer">
             ©MattMilton 2021
             <br></br>
           </div>
        </div>

        <div className="select-class__content">

        </div>

          <NewClassForm  gatherList={this.gatherList} id={this.state.id}/>
          <DeleteClassForm classes={this.state.allclasses} gatherList={this.gatherList} deleteClass={e => this.deleteClassCycle(e)}/>

      </div>
    )
  }

} export default SelectClass