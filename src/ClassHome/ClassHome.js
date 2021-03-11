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
import AssessClassContainer from '../Containers/AssessClassContainer';
// import testContainer from '../Containers/testContainer';
import EditClass from '../EditClass/EditClass2.js';
import ClassStatsContainer from '../Containers/ClassStatsContainer';
// import ShowRoster from '../ShowRoster/ShowRoster';
import StudentHome from '../StudentHome/StudentHome';
import { api } from '../services/api'
import { functions } from '../services/functions'
import NewClassListContainer from '../SelectClass/NewClassListContainer';

import MenuHeader from "../components/MenuHeader"
import MenuFooter from "../components/MenuFooter"
class ClassHome extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      classPeriod:'',
      classRoster:[],
      classAssessments:[],
      allStudents:[],
      registrations:'',
      masterList:[],
      allclasses:'',
      score:''
    }
  }

  componentDidMount(){
    const {match} = this.props
    const id = (parseInt(match.params.id))
    this.fetchClassesAssessments()
    this.fetchClass()
    this.checkUser()
    this.fetchStudents()
    this.fetchRegistrations(id)
    this.setState({
      classPeriod:id
    })

  }

  checkUser = () => {
    (api.get.fetchCurrentUser())
    .then (res => this.fetchClasses(res.id))
  }

  fetchClasses = (id) => {
    api.get.filteredClasses({user_id:id})
    .then (res => this.setState({allclasses:res}))
  }

  fetchRegistrations = (id) => {
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
  }

  fetchClass = () => {
    const {match} = this.props
    const id = (parseInt(match.params.id))
    api.get.classList({class_period_id:id})
    .then(res => {this.setState({classRoster:res}); this.buildMastList()})
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
    api.delete.deleteRegistration(e)
    .then(res =>{if (res){this.fetchRegistrations(id); this.fetchClass() }})
  }

  // classParticipation = () => {
  //   let totalAssessments = this.state.classAssessments.length
  //   if (totalAssessments>0){
  //   return <div>This class is at {this.totalPar()} % participation </div>
  //   }else{
  //     return(<div>No assessments yet</div>)
  //   }
  // }

  totalPar = () => {
    let masterList = this.state.masterList
    let score = 0
    masterList.map(student => {score = (score + parseInt(student[2])); console.log(score)})
    return (((score/masterList.length)*100).toFixed(0))
  }

  callback = (e) => {
    console.log('testingCallback')
  }

  buildMastList = (e) => {
   let masterList = (functions.build.buildList(
      this.state.classRoster,
      this.state.classAssessments
      )
    )
    this.setState({masterList:masterList})
  }

  showList = () => {
    if (this.state.allclasses == ''){return <div class="select-class__welcome">Loading.</div>}
    else
    {return <NewClassListContainer listType="home" classes={this.state.allclasses}/>}
  }

  handleReFetch = (e) => {
    this.fetchStudents()
    console.log("handle reFetch")
  }

  render(){
    const {match} = this.props
    return(
      <div className="class-home">

            <div className="class-home__sidebar">
              <div className="select-class__header class-home__sidebar--header">
                <MenuHeader/>
              </div>

              <div className="select-class__class-list class-home__sidebar--class-list">
              {this.showList()}
              </div>

              <div className="select-class__footer class-home__sidebar--footer">
              <MenuFooter listType="home"/>
              </div>
            </div>

          <div className="class-home__content">
            <Router>
              <div className="class-home__content--links">
                <div className="class-home__content--links-link">
                  <div className="icon">Icon</div>
                  <Link to={`${match.url}`}>Class Home</Link>
                </div>
                <div className="class-home__content--links-link">
                  <div className="icon">Icon</div>
                  <Link to={`${match.url}/assess`}>Assess class</Link>
                </div>
                <div className="class-home__content--links-link">
                  <div className="icon">Icon</div>
                  <Link to={`${match.url}/edit`}>Edit class</Link>
                </div>
              </div>

              <div className="class-home__content--display">
                <Switch>
                  <Route exact path={`${match.url}`} render={props =>
                    <ClassStatsContainer 
                                          {...props}
                      assessments={this.state.classAssessments} 
                      score={true} 
                      students={this.state.classRoster} 
                      callback={this.callback}
                      classPeriod={this.state.classPeriod} 
                      linkTo={true}
                      url={`${match.url}/studenthome/`}/>
                  }>
                  </Route>
                  <Route exact path={`${match.url}/assess`} render={props =>
                    <AssessClassContainer
                    // <testContainer

                      {...props}
                      roster={this.state.classRoster}
                      assessments={this.state.classAssessments}
                      classPeriod={this.state.classPeriod}
                      // fetchAssessments={this.fetchClassesAssessments(this.state.classPeriod)} 
                      />
                  }>    
                  </Route>
                  {/* <Route exact path={`${match.url}/edit`} render={props =>
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
                      />
                  }>     
                  </Route> */}
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
                      />
                  }>  
                  </Route>
                </Switch>
              </div>
            </Router>
        </div>
      </div>
    )
  }
} export default ClassHome