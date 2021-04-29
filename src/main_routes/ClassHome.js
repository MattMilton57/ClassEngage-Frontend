import React from 'react';
import NavBarContainer from '../containers/NavBarContainer';
import AssessClassContainer from '../containers/AssessClassContainer';
import EditClassContainer from '../containers/EditClassContainer.js';
import ClassStatsContainer from '../containers/ClassStatsContainer';
import StudentHomeContainer from '../containers/StudentHomeContainer';
import MenuHeader from "../components/MenuHeader"
import MenuFooter from "../components/MenuFooter"
import EditStudentForm from "../forms/EditStudentForm"
import NewStudentForm from "../forms/NewStudentForm"
import DeleteStudentForm from "../forms/DeleteStudentForm"

import sprite from "../img/sprite.svg"

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
      allAssessments:[],
      classRegistrations:'',
      allRegistrations:'',
      masterList:[],
      allclasses:'',
      classScore:'',
      classObject:'',
      graphInfo:'',
      stateLables:[],
      studentToUpdate:''
    }
  }

  componentDidMount(){
    const {match} = this.props
    const id = (parseInt(match.params.id))
    // console.log(match, id)
    this.fetchClassesAssessments()
    this.fetchClass()
    this.checkUser(id)
    this.fetchStudents()
    this.fetchAssessments()
    this.fetchRegistrations()
    this.fetchClassRegistrations(id)
    this.setState({
      classPeriod:id
    })

  }

    ////////////////////////////////////////fetches////////////////////////////////////////

    //////////GET//////////

  checkUser = (classID) => {
    (api.get.fetchCurrentUser())
    .then (res => this.fetchClasses(res.id, classID))
  }

  fetchClasses = (id, classID) => {
    api.get.filteredClasses({user_id:id})
    .then (res => {this.setState({allclasses:res}); this.findClassInfo(res, classID)})
  }

  fetchClassRegistrations = (id) => {
    (api.get.filteredRegistrations({class_period_id:id}))
    .then(res => this.setState({classRegistrations:res}))
  }

  fetchStudents = () => {
    api.get.fetchStudents()
    .then(res => this.setState({allStudents:res}))
  }

  fetchRegistrations = () => {
    api.get.fetchRegistrations()
    .then(res => this.setState({allRegistrations:res}))
  }

  fetchAssessments = () => {
    api.get.fetchAssessments()
    .then(res => this.setState({allAssessments:res}))
  }

  fetchClassesAssessments = () => {
    const {match} = this.props
    const id = (parseInt(match.params.id))
    api.get.classesAssessments({class_period_id:id})
    .then(res => {this.setState({classAssessments:res}); this.testDate(res)})
  }

  fetchClass = () => {
    const {match} = this.props
    const id = (parseInt(match.params.id))
    api.get.classList({class_period_id:id})
    .then(res => {this.setState({roster:res})})
  }

    //////////POST//////////

  postRegistration = (e) => {
    const {match} = this.props
    const id = (parseInt(match.params.id))
    api.posts.postRegistration({class_period_id:id, student_id:e.id})
    .then(res => {this.fetchClass(); this.fetchClassRegistrations(id)})
  }

    //////////PATCH//////////

  patchStudent = (e) => {
    api.patch.patchStudent(e)
    .then(res => {this.fetchClass()})
  }

  patchClassPeriod = (e) => {
    // console.log(e)
    api.patch.patchClassPeriod(e)
    .then(res => {this.componentDidMount()})
  }

    //////////DELETE//////////

  deleteRegistration = (e) => {
    const {match} = this.props
    const id = (parseInt(match.params.id))
    api.delete.deleteRegistration(e)
    .then(res =>{if (res){this.fetchClassRegistrations(id); this.fetchClass() }})
  }

  deleteStudentAssessments = (student, registrations, assessments) => {
    const id = {student_id:student}
    api.delete.deleteStudentAssessments(id)
    .then(res => {this.deleteStudentRegistrations(id)})
  }

  deleteStudentRegistrations = (id) => {
    api.delete.deleteStudentRegistrations(id)
    .then(res => this.deleteStudent(id))
  }

  deleteStudent = (id) => {
    api.delete.deleteStudent(id.student_id)
    .then(res => this.componentDidMount())
  }



  ////////////////////////////////////////graph data////////////////////////////////////////

  testDate = (assessments) => {
    let dateArray = []
    let fullArray = []
    assessments.map(assessment => {
      let date = assessment.created_at; 
      let split = date.split('T'); 
      let dateOnly=split[0]; 
      let dateSplit=dateOnly.split('-');
      let monthDay = (dateSplit[1]+ ","+dateSplit[2])
      dateArray.push(monthDay)
      fullArray.push([monthDay, assessment])})
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
      this.cumulativeGraphScore(scoreIndex, dateIndex)
  }

  cumulativeGraphScore = (scoreIndex, dateIndex) => {
    var loops=scoreIndex.length
    var i
    var assessmentScore = [0]
    var totalAssessments = [0]
    var totalScore = [0]
    var date =[]
    for (i=0; i < loops; i++) {
      var newScore=(assessmentScore[i]+scoreIndex[i].positiveAssessments)
      var newAssessmentNum=(totalAssessments[i]+scoreIndex[i].totalDaysAssessments)
      var rawDaysScore=(newScore/newAssessmentNum)
      let daysScore = ((rawDaysScore*100).toFixed(0))
      let parsedScore = parseInt(daysScore)
      date.push(dateIndex[i].date)
      assessmentScore.push(newScore)
      totalAssessments.push(newAssessmentNum)
      totalScore.push(parsedScore)

    }
    assessmentScore.shift()
    totalAssessments.shift()
    totalScore.shift()
    const dates = dateIndex
    this.setState({
      stateLables:date,
      data:totalScore,
      dataObject:{
        stateLables:dates,
        data:totalScore,
      }
    })
  }

  callback = (e) => {
    
  }

  reFetchAssessments = (e) => {
    this.fetchClassesAssessments()
  }

  reFetchStudentBody = () => {
    this.fetchStudents()
    this.fetchClass()
  }

  findClassInfo = (classes, classID) => {
    classes.map(classPeriod => {
      if (classPeriod.id == classID)
      {this.setState({classObject:classPeriod})}
    }) 
  }

  render(){
    const {match} = this.props
    return(
      <div className="class-home">

            <Router>
            <div className="class-home__nav">
              <NavBarContainer classes={this.state.allclasses} classPeriod={this.state.classPeriod} reFetch={e => this.reFetchAssessments(e)} match={match} />
          </div> 
              <div className="class-home__content">
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
                      graphInfoData={this.state.data}
                      stateLables={this.state.stateLables}
                      dataObject={this.state.dataObject}
                      linkTo={true}
                      url={`${match.url}/studenthome/`}/>
                      }>
                  </Route>

                  <Route exact path={`${match.url}/assess`} render={props =>
                      <AssessClassContainer
                      {...props}
                      roster={this.state.roster}
                      assessments={this.state.classAssessments}
                      classPeriod={this.state.classPeriod}
                      />
                      }>    
                  </Route>

                  <Route exact path={`${match.url}/edit`} render={props =>
                    <EditClassContainer
                      {...props}
                      classObject={this.state.classObject} 
                      roster={this.state.roster}
                      registrations={this.state.classRegistrations}
                      studentBody={this.state.allStudents}
                      classPeriod={this.state.classPeriod}
                      register={e => this.postRegistration(e)}
                      deRegister={e => this.deleteRegistration(e)}
                      reFetchStudentBody={e => this.reFetchStudentBody(e)}
                      patchClassPeriod={e => this.patchClassPeriod(e)}
                      test={e => this.test(e)}
                      />
                  }>     
                  </Route>

                  <Route exact path={`${match.url}/studenthome/:id`} render={props =>
                    <StudentHomeContainer
                      {...props}
                      roster={this.state.roster}
                      registrations={this.state.classRegistrations}
                      studentBody={this.state.allStudents}
                      classPeriod={this.state.classPeriod}
                      graphInfoData={this.state.data}
                      stateLables={this.state.stateLables}
                      buildGraph={e => this.testDate(e)}
                      fetchClass={e => this.reFetchAssessments(e)}
                      register={e => this.postRegistration(e)}
                      patchStudent={e => this.patchStudent(e)}
                      deleteStudent={e => this.deleteStudent(e)}
                      deleteRegistration={e => this.deleteRegistration(e)}
                      test={e => this.test(e)}
                      />
                  }>  
                  </Route>
                </Switch>
              </div>
            </Router>

        {/* <EditStudentForm 
          reFetchStudentBody={e => this.reFetchStudentBody(e)}
          roster={this.state.roster} /> */}

        <NewStudentForm 
          reFetchStudentBody={e => this.reFetchStudentBody(e)}/>

        <DeleteStudentForm 
          roster={this.state.roster}
          studentBody={this.state.allStudents}
          assessments={this.state.allAssessments}
          classes={this.state.allclasses}
          registrations={this.state.allRegistrations}
          callback={e => this.callback(e)}
          deleteStudent={(student,registrations,assessments) => this.deleteStudentAssessments(student,registrations,assessments)}
          user={this.props.user}/>
      </div>
    )
  }
} export default ClassHome