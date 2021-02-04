import React from 'react';
import ClassListContainer from './ClassListContainer';
import NewClassListContainer from './NewClassListContainer';
import CreateAClass from './CreateAClass';
import ClassHome from '../ClassHome/ClassHome.js'
import { api } from '../services/api'
// const id = this.props.user.user.id
const DefaultButtons = [
  {Label:"Landing Page", Destination:'/'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"ClassHome", Destination:'/classhome'}]
class SelectClass extends React.Component {

  constructor(props) {
    super();
    this.state= {
      selectedClass: '',
      allclasses:'',
      id:''
    }
  }

  componentDidMount(){
    this.checkUser()
  }

  test = (e) => {
    e.preventDefault()
    const {match} = this.props
    console.log(match)
  }

  checkUser = () => {
    (api.get.fetchCurrentUser())
    .then (res => this.setState({id:res.id}))
    .then (res => this.gatherList())
  }

  gatherList = () => {
    return (api.get.filteredClasses({user_id:this.state.id}))
    .then (res => this.setState({allclasses:res}))
  }

  showList = () => {
    if (this.state.allclasses == ''){return <li>Welcome! Please create some classes.</li>}
    else
    {return <NewClassListContainer selected={this.props.selected} classes={this.state.allclasses}/>}
  }

  render(){
    return(
      <div>
         <button onClick={e=> this.test(e)}>Button for tests</button>
        {/* the select class page for {this.props.user.user.username} */}
        {this.showList()}

        <CreateAClass gatherList={this.gatherList} id={this.state.id}/>
        {/* <ClassListContainer classes={this.props.classes} teacher={this.props.loggedIn} selected={this.props.selected}/> */}
      </div>
    )
  }

} export default SelectClass