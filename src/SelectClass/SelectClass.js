import React from 'react';
import NewClassListContainer from './NewClassListContainer';
import CreateAClass from './CreateAClass';
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

  showList = () => {
    if (this.state.allclasses == ''){return <li>Welcome! Please create some classes.</li>}
    else
    {return <NewClassListContainer selected={this.props.selected} classes={this.state.allclasses}/>}
  }

  render(){
    return(
      <div>
         <button onClick={e=> this.test(e)}>Button for tests</button>
        {this.showList()}

        <CreateAClass gatherList={this.gatherList} id={this.state.id}/>
      </div>
    )
  }

} export default SelectClass