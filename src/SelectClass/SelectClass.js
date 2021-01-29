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
      id:props.user.user.id
    }
  }

  componentDidMount(){
    const id = this.props.user.user.id
    this.gatherList(id)
  }

  gatherList = (id) => {
    // const teacher = this.state.user.user.id
    (api.get.filteredClasses({user_id:id}))
        // .then(res => console.log(res))

    .then (res => this.setState({allclasses:res}))
    // return(<h1>hats!</h1>)
  }

  showList = () => {
    if (this.state.allclasses == ''){return <li>Welcome! Please create some classes.</li>}
    else
    {return <NewClassListContainer selected={this.props.selected} classes={this.state.allclasses}/>}
  }

  render(){
    return(
      <div>
        the select class page for {this.props.user.user.username}
        {this.showList()}

        <CreateAClass props={this.props}/>
        {/* <ClassListContainer classes={this.props.classes} teacher={this.props.loggedIn} selected={this.props.selected}/> */}
      </div>
    )
  }

} export default SelectClass