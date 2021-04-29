import React from 'react';
import ClassList from '../components/ClassList';
import NewClassForm from "../forms/NewClassForm"
import DeleteClassForm from "../forms/DeleteClassForm"
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
    .then (res => this.setState({allclasses:res}))
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
    if (this.state.allclasses == ''){return <div class="select-class__welcome">Welcome! Please create some classes.</div>}
    else
    {return <ClassList classNumber={this.props.classNumber} classes={this.state.allclasses}/>}
  }

  render(){
    return(
      <div className="select-class">
         {/* <button onClick={e=> this.test(e)}>Button for tests</button> */}
          <div className="select-class__sidebar">
            <div className="select-class__header select-class__sidebar--header">
              <MenuHeader/>
            </div>

            <div className="select-class__class-list select-class__sidebar--class-list">
              <div className="select-class__class-list select-class__sidebar--class-list-selection">
                {this.showList()}
              </div>
              <div className="select-class__header select-class__sidebar--class-list-create-class">

                {/* <input type="checkBox" className="select-class__sidebar--class-list-create-class-checkBox" id="new-class-form__checkbox" /> */}
                <label for="new-class-form__checkbox" className="select-class__sidebar--class-list-create-class-button class-list__class">
                  <span className="select-class__sidebar--class-list-create-class-button-span">Create a Class</span>
                </label>
                <label for="delete-class-form__checkbox" className="select-class__sidebar--class-list-create-class-button class-list__class">
                  <span className="select-class__sidebar--class-list-create-class-button-span">Delete a Class</span>
                </label>
                {/* <div className="select-class__sidebar--class-list-create-class-form">
                  form display
                </div> */}
              </div>
            </div>


            <div className="select-class__footer select-class__sidebar--footer">
              ©MattMilton 2021
              <br></br>
              {/* <MenuFooter/> */}
            </div>
          </div>

          {/* <embed src={logo_svg} alt="Logo" class="select-class__logo--box"/> */}

          {/* <CreateAClass  gatherList={this.gatherList} id={this.state.id}/> */}
          <NewClassForm  gatherList={this.gatherList} id={this.state.id}/>
          <DeleteClassForm classes={this.state.allclasses} gatherList={this.gatherList} deleteClass={e => this.deleteClassCycle(e)}/>

      </div>
    )
  }

} export default SelectClass