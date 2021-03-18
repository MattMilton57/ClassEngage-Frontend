import React from 'react';
import AssessClassContainer from '../Containers/AssessClassContainer';
import EditClassContainer from '../Containers/EditClassContainer.js';
import ClassStatsContainer from '../Containers/ClassStatsContainer';
import StudentHome from '../StudentHome/StudentHome';
import NewClassListContainer from '../SelectClass/NewClassListContainer';
import MenuHeader from "../components/MenuHeader"
import MenuFooter from "../components/MenuFooter"
import NewStudentForm from "../components/NewStudentForm"

import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import { api } from '../services/api'
import { functions } from '../services/functions'

class ClassHome extends React.Component {

  constructor(props) {
    super(props);
    this.state= {
      classPeriod:'',
      roster:[],
      classAssessments:[],
      allStudents:[],
      registrations:'',
      masterList:[],
      allclasses:'',
      classScore:'',
      classObject:'',
      graphInfo:''
    }
  }

  componentDidMount(){
    const {match} = this.props
    const id = (parseInt(match.params.id))
    this.fetchClassesAssessments()
    this.fetchClass()
    this.checkUser(id)
    this.fetchStudents()
    this.fetchRegistrations(id)
    this.setState({
      classPeriod:id
    })

  }

  checkUser = (classID) => {
    (api.get.fetchCurrentUser())
    .then (res => this.fetchClasses(res.id, classID))
  }

  fetchClasses = (id, classID) => {
    api.get.filteredClasses({user_id:id})
    .then (res => {this.setState({allclasses:res}); this.findClassInfo(res, classID)})
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
    .then(res => {this.setState({classAssessments:res}); this.setParticipation(res); this.testDate(res)})
  }

  fetchClass = () => {
    const {match} = this.props
    const id = (parseInt(match.params.id))
    api.get.classList({class_period_id:id})
    .then(res => {this.setState({roster:res})})
  }

  findClassInfo = (classes, classID) => {
    classes.map(classPeriod => {
      if (classPeriod.id == classID)
      {this.setState({classObject:classPeriod})}
    }) 
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




  ////////////////////////////////////////Working////////////////////////////////////////

  setParticipation = (assessments) => {
    let totalScore=0
    let totalAssessments = this.state.classAssessments.length
    assessments.map( assessment => {if (assessment.participating == true) totalScore=(totalScore+1)})
    let rawScore=(totalScore/totalAssessments)
    let classScore = ((rawScore*100).toFixed(0))
    this.setState({classScore:classScore})
  }

  testDate = (assessments) => {
    let dateArray = []
    let fullArray = []
    assessments.map(assessment => {
      let date = assessment.created_at; 
      let split = date.split('T'); 
      let dateOnly=split[0]; 
      let dateSplit=dateOnly.split('-');
      let dateString = dateSplit.toString() 
      dateArray.push(dateString)
      fullArray.push([dateString, assessment])})
      // console.log(dateArray)
      this.makeArraysForDates(dateArray, fullArray)
  }

  makeArraysForDates = (dateArray, fullArray) => {
    let bigNewArray = []
    dateArray.map(item => {if (bigNewArray.includes(item) == false) {bigNewArray.push(item)}})
    let dateIndex = []
    bigNewArray.map(date => {dateIndex.push({date:date, assessments:[]})})
    // console.log(dateIndex)
    let assessmentArray = fullArray
    let finalArray = []
    dateIndex.map(date => {
      assessmentArray.map(assessment => {
        if (date.date == assessment[0])
        {date.assessments.push(assessment[1])}
      })
      finalArray.push(date)
    })
    this.buildFinalArray(dateIndex, finalArray)
  }

  buildFinalArray = (dateIndex, finalArray) => {
    let scoreIndex = []
    finalArray.map(data => {
      let totalDaysAssessments = data.assessments.length
      let totalScore = 0
      data.assessments.map( assessment => {if (assessment.participating == true) totalScore=(totalScore+1)})
      let rawScore=(totalScore/totalDaysAssessments)
      let daysScore = ((rawScore*100).toFixed(0))
      scoreIndex.push({date:data.date, totalDaysAssessments:totalDaysAssessments, positiveAssessments:totalScore, daysScore:daysScore})
     })
     this.setState({graphInfo:scoreIndex})
  }






////////////////////////////////////////Working ^////////////////////////////////////////
  callback = (e) => {
    console.log('testingCallback')
  }

  showList = () => {
    if (this.state.allclasses == ''){return <div class="select-class__welcome">Loading.</div>}
    else
    {return <NewClassListContainer listType="home" classes={this.state.allclasses}/>}
  }

  handleReFetch = (e) => {
    e.preventDefault(e)
    this.fetchClassesAssessments()
  }

  reFetchStudentBody = () => {
    // e.preventDefault(e)
    this.fetchStudents()
    this.fetchClass()
    // console.log(1)
    // console.log(2)
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
              <div  className="class-home__content--links">
                <div className="class-home__content--links-link" onClick={e => this.handleReFetch(e)}>
                  <div className="icon">Icon</div>
                  <Link to={`${match.url}`}><div>Class Home</div></Link>
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
                      roster={this.state.roster} 
                      callback={this.callback}
                      classPeriod={this.state.classPeriod} 
                      classObject={this.state.classObject} 
                      classScore={this.state.classScore} 
                      graphInfo={this.state.graphInfo}
                      linkTo={true}
                      url={`${match.url}/studenthome/`}/>
                  }>
                  </Route>
                  <Route exact path={`${match.url}/assess`} render={props =>
                    <AssessClassContainer
                    // <testContainer

                      {...props}
                      roster={this.state.roster}
                      assessments={this.state.classAssessments}
                      classPeriod={this.state.classPeriod}
                      // fetchAssessments={this.fetchClassesAssessments(this.state.classPeriod)} 
                      />
                  }>    
                  </Route>
                  <Route exact path={`${match.url}/edit`} render={props =>
                    <EditClassContainer
                      {...props}
                      roster={this.state.roster}
                      registrations={this.state.registrations}
                      studentBody={this.state.allStudents}
                      classPeriod={this.state.classPeriod}
                      // fetchClass={e => this.handleReFetch(e)}
                      register={e => this.postRegistration(e)}
                      deRegister={e => this.deleteRegistration(e)}
                      reFetchStudentBody={e => this.reFetchStudentBody(e)}
                      test={e => this.test(e)}
                      />
                  }>     
                  </Route>
                  <Route exact path={`${match.url}/studenthome/:id`} render={props =>
                    <StudentHome
                      {...props}
                      roster={this.state.roster}
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
        <NewStudentForm reFetchStudentBody={e => this.reFetchStudentBody(e)}/>
      </div>
    )
  }
} export default ClassHome