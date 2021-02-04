import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import RosterContainer from '../Recyclables/Roster/RosterContainer';
import Graphics from '../Recyclables/Graphics/GraphicsContainer'
import SelectClass from '../SelectClass/SelectClass';
import AssessClass from '../AssessClass/AssessClass';
import { api } from '../services/api'
const homeButtons = [
  {Label:"Landing Page", Destination:'/'},
  {Label:"Edit Class", Destination:'/editclass'},
  {Label:"Class Menu", Destination:'/selectClass'},
  {Label:"Assess Students", Destination:'/assess'}]

class ClassHome extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      thisPeriod:props.thisPeriod,
      studentBody:props.studentBody,
      registrations:'',
      assessments:props.assessments,
      classRoster:[],
      classAssessments:[],
      classScore:'',
      allStudents:'',
      fetchedRoster:[]
    }
  }

  componentDidMount(){
    const {match} = this.props
    // console.log(parseInt(match.params.id))
    const id = (parseInt(match.params.id))
    // const id = this.props.thisPeriod
    console.log(id)
    this.props.navButtons(homeButtons)
    // this.fetchRegistrations(id)
    this.fetchClassesAssessments(id)
    this.fetchClass(id)

  }

  fetchRegistrations = (id) => {
    (api.get.filteredRegistrations({class_period_id:id}))
    .then(res => this.setState({registrations:res}))
    .then(this.fetchStudents)
  }

  fetchStudents = () => {
    api.get.fetchStudents()
    .then(res => this.setState({allStudents:res}))
    // .then(console.log(this.state.allStudents))
    // .then(console.log(res))

    .then(res => this.buildClassList())
  }

  fetchClassesAssessments = (id) => {
    api.get.classesAssessments({class_period_id:id})
    .then(res => this.setState({classAssessments:res}))
    // .then(res => (this.setState({classesAssessments:res})))
  }

  fetchClass = (id) => {
    api.get.classList({class_period_id:id})
    .then(res => this.setState({classRoster:res}))
  }

  buildClassList = () => {
    // console.log(this.state.allStudents)
    // return this.state.registrations.map (registration => {
    //   return this.state.allStudents.map (student => {
    //     if (student.id == registration.student_id){
    //       let roster = this.state.classRoster
    //       roster.push(student)
    //       this.setState({
    //         classRoster:roster
    //       })
    //     }
    //   })
    // })
  }

  classParticipation = () => {
    let totalScore=0
    let totalAssessments = this.state.classAssessments.length
    if (totalAssessments>0){
    this.state.classAssessments.map( assessment => {if (assessment.participating == true) totalScore=(totalScore+1)})
    let classScore=(totalScore/totalAssessments)
    return <div>This class is at {(classScore*100)} % participation </div>
    }else{
      return(<div>No assessments yet</div>)
    }
  }

  sendClass = () => {
    this.props.setClass(this.state.classRoster)   
  }

  callback = (e) => {
    this.props.setStudent(e)
  }

  test = (e) => {
    e.preventDefault()
    const {match} = this.props
    console.log(match.url)
  }

  render(){
    const {match} = this.props
    return(
      <div>
              <button onClick={e=> this.test(e)}>Button for tests</button>

        Class Home Page
        {/* {this.classParticipation()} */}
        <Router>
          <l1>
            <Link to={`${match.url}/roster`}>Class Home</Link>
          </l1>
          <l1>
            <Link to={`${match.url}/assess`}>Assess class</Link>
          </l1>

          <hr />

          <Switch>
            <Route exact path={`${match.url}/roster`}>
            {this.classParticipation()}
                <RosterContainer 
              assessments={this.state.classAssessments} 
              score={true} 
              students={this.state.classRoster} 
              callback={this.callback}
              classPeriod={this.props.thisPeriod} 
              linkTo={true}/>
            </Route>
            <Route exact path={`${match.url}/assess`}>
              <AssessClass/>
            </Route>
          </Switch>
        </Router>


      </div>
    )
  }

  // render(){
  //   return(
  //     <div>
  //             <button onClick={e=> this.test(e)}>Button for tests</button>

  //       Class Home Page
  //       {this.classParticipation()}
  //       <RosterContainer 
  //         assessments={this.state.classAssessments} 
  //         score={true} 
  //         students={this.state.classRoster} 
  //         callback={this.callback}
  //         classPeriod={this.props.thisPeriod} 
  //         linkTo={true}/>
  //     </div>
  //   )
  // }

} export default ClassHome