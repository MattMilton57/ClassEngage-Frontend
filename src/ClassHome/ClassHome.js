import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch
} from "react-router-dom";
import Graphics from '../Recyclables/Graphics/GraphicsContainer'
import AssessClass from '../AssessClass/AssessClass';
import EditClass from '../EditClass/EditClass2.js';
import ShowRoster from '../ShowRoster/ShowRoster';
import StudentHome from '../StudentHome/StudentHome';
import { api } from '../services/api'
class ClassHome extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      classPeriod:'',
      classRoster:[],
      classAssessments:[],
      allStudents:[],
      registrations:''
    }
  }

  componentDidMount(){
    const {match} = this.props
    const id = (parseInt(match.params.id))
    this.fetchClassesAssessments()
    this.fetchClass()
    this.fetchStudents()
    this.fetchRegistrations(id)
    this.setState({
      classPeriod:id
    })

  }

  fetchRegistrations = (id) => {
    // const {match} = this.props
    // const id = (parseInt(match.params.id))
    (api.get.filteredRegistrations({class_period_id:id}))
    .then(res => this.setState({registrations:res}))
  }

  fetchStudents = () => {
    api.get.fetchStudents()
    .then(res => this.setState({allStudents:res}))
  }

  fetchClassesAssessments = () => {
    const {match} = this.props
    const id = (parseInt(match.params.id))
    api.get.classesAssessments({class_period_id:id})
    .then(res => this.setState({classAssessments:res}))
    // .then(res => console.log(res))
  }

  fetchClass = () => {
    const {match} = this.props
    const id = (parseInt(match.params.id))
    api.get.classList({class_period_id:id})
    .then(res => this.setState({classRoster:res}))
  }

  postRegistration = (e) => {
    const {match} = this.props
    const id = (parseInt(match.params.id))
    api.posts.postRegistration({class_period_id:id, student_id:e.id})
    .then(res => {this.fetchClass(); this.fetchRegistrations(id)})
  }

  deleteRegistration = (e) => {
    const {match} = this.props
    const id = (parseInt(match.params.id))
    // let registrations = this.state.registrations
    // registrations.map( r => {if (r.student_id == e.id)
    //   {api.delete.deleteRegistration(r.id)
    //   .then(res => this.fetchClass(res))}})
    api.delete.deleteRegistration(e)
    // .then (res => res.json())

    .then(res =>{if (res){this.fetchRegistrations(id); this.fetchClass() }})
    // .then(res => this.fetchRegistrations(id))
    // .then(res => this.fetchClass())
  }

  classParticipation = () => {
    let totalScore=0
    let totalAssessments = this.state.classAssessments.length
    if (totalAssessments>0){
    this.state.classAssessments.map( assessment => {if (assessment.participating == true) totalScore=(totalScore+1)})
    let classScore=(totalScore/totalAssessments)
    return <div>This class is at {(classScore*100).toFixed(0)} % participation </div>
    }else{
      return(<div>No assessments yet</div>)
    }
  }

  // sendClass = () => {
  //   this.props.setClass(this.state.classRoster)   
  // }

  callback = (e) => {
    console.log('testingCallback')
  }

  test = (e) => {
    this.fetchStudents()
  }

  handleReFetch = (e) => {
    this.fetchStudents()
    console.log("handle reFetch")
  }

  render(){
    const {match} = this.props
    return(
      <div>
              <button onClick={e=> this.test(e)}>Button for tests</button>

        Class Home Page
        {this.classParticipation()}
        <Router>
            <br/>
          <l1>
            <Link to={`${match.url}/roster`}>Class Home</Link>
          </l1>
            <br/>
          <l1>
            <Link to={`${match.url}/assess`}>Assess class</Link>
          </l1>
            <br/>
          <l1>
            <Link to={`${match.url}/edit`}>Edit class</Link>
          </l1>

          <hr />

          <Switch>
            <Route exact path={`${match.url}/roster`} render={props =>
              <ShowRoster
                {...props}
                assessments={this.state.classAssessments} 
                score={true} 
                students={this.state.classRoster} 
                callback={this.callback}
                classPeriod={this.state.classPeriod} 
                linkTo={true}
                url={`${match.url}/studenthome/`}
              />
            }>
            </Route>
            <Route exact path={`${match.url}/assess`} render={props =>
              <AssessClass
                {...props}
                roster={this.state.classRoster}
                assessments={this.state.classAssessments}
                classPeriod={this.state.classPeriod}
                fetchAssessments={this.fetchClassesAssessments(this.state.classPeriod)} 
                // fetchAssessments={console.log('what the hell')} 

                />
            }>    
            </Route>
            <Route exact path={`${match.url}/edit`} render={props =>
              <EditClass
                {...props}
                roster={this.state.classRoster}
                registrations={this.state.registrations}
                studentBody={this.state.allStudents}
                classPeriod={this.state.classPeriod}
                fetchClass={e => this.handleReFetch(e)}
                register={e => this.postRegistration(e)}
                deRegister={e => this.deleteRegistration(e)}
                test={e => this.test(e)}
                // fetchClass={console.log('?')}

                />
            }>     
            </Route>
            <Route exact path={`${match.url}/studenthome/:id`} render={props =>
              <StudentHome
                {...props}
                roster={this.state.classRoster}
                registrations={this.state.registrations}
                studentBody={this.state.allStudents}
                classPeriod={this.state.classPeriod}
                fetchClass={e => this.handleReFetch(e)}
                register={e => this.postRegistration(e)}
                deRegister={e => this.deleteRegistration(e)}
                test={e => this.test(e)}
                // fetchClass={console.log('?')}

                />
            }>  
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