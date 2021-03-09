import React from 'react';
import NewClassListContainer from './NewClassListContainer';
import CreateAClass from './CreateAClass';
import MenuHeader from "../components/MenuHeader"
import MenuFooter from "../components/MenuFooter"
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
    if (this.state.allclasses == ''){return <div class="select-class__welcome">Welcome! Please create some classes.</div>}
    else
    {return <NewClassListContainer classes={this.state.allclasses}/>}
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
              {this.showList()}
            </div>

            <div className="select-class__footer select-class__sidebar--footer">
            <MenuFooter/>
            </div>
          </div>

          <CreateAClass gatherList={this.gatherList} id={this.state.id}/>
      </div>
    )
  }

} export default SelectClass