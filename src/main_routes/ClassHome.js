import React from 'react';

import AssessClassContainer from '../containers/AssessClassContainer';
import ClassStatsContainer from '../containers/ClassStatsContainer';
import EditClassContainer from '../containers/EditClassContainer.js';
import HeaderContainer from '../containers/HeaderContainer';
import NavBarContainer from '../containers/NavBarContainer';
import StudentHomeContainer from '../containers/StudentHomeContainer';
import PhoneFooter from "../components/PhoneFooter"

import { api } from '../services/api'

import {BrowserRouter as Router, Switch, Route} from "react-router-dom";

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
      studentToUpdate:'',
      headerText:'Class Home Page',
    }
  }

  componentDidMount(){
    const {match} = this.props
    const id = (parseInt(match.params.id))
    this.fetchClass()
    this.checkUser(id)
    this.fetchStudents(id)
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
    .then(res => this.fetchClassesAssessments())
  }

  fetchStudents = (id) => {
    // api.get.fetchStudents()
    api.get.usersStudents({user_id:this.props.user.id})
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
    // .then(res => {this.setState({classAssessments:res}); this.testDate(res)})
    .then(res => {this.releventAssessments(res)})

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
    api.posts.postRegistration({class_period_id:id, student_id:e.id, user_id:this.props.user.id})
    .then(res => {this.fetchClass(); this.fetchClassRegistrations(id)})
  }

    //////////PATCH//////////

  patchStudent = (e) => {
    api.patch.patchStudent(e)
    .then(res => {this.fetchClass()})
  }

  patchClassPeriod = (classPeriod) => {
    let id =classPeriod.id

    api.patch.patchClassPeriod(classPeriod, id)
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

  ////////////////////////////////////////build graph data////////////////////////////////////////

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

//////////callbacks//////////

  callback = (e) => {
    console.log("test function")
  }

  setHeader = (e) => {
    this.setState({headerText:e})
  }

  releventAssessments = (assessments) => {
    let releventAssessments=[]
    assessments.forEach(assessment=>{this.state.roster.forEach(student=>{if(student.id===assessment.student_id){releventAssessments.push(assessment)}})})
    this.setState({classAssessments:releventAssessments})
    this.testDate(releventAssessments)
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
            <NavBarContainer  
              classAssessments={this.state.classAssessments} 
              classes={this.state.allclasses} 
              classPeriod={this.state.classPeriod} 
              match={match}
              reFetch={e => this.reFetchAssessments(e)}
              roster={this.state.roster} 
              setHeader={e => this.setHeader(e)} 
              studentBody={this.state.allStudents} 
              />
          </div> 
          <div className="class-home__header">
            <HeaderContainer 
              classes={this.state.allclasses} 
              classPeriod={this.state.classPeriod} 
              getUser={this.props.getUser} 
              headerText={this.state.headerText}
              history={this.props.history} 
              logOut={this.props.logOut} 
              match={match} 
              reFetch={e => this.reFetchAssessments(e)} 
              user={this.props.user} 
              />                
          </div> 

          <div className="class-home__phone-profile">
            <PhoneFooter />
          </div>
          <div className="class-home__content">
            <Switch>
              <Route exact path={`${match.url}`} render={props =>
                  <ClassStatsContainer 
                    {...props}
                    assessments={this.state.classAssessments} 
                    callback={this.callback}
                    classObject={this.state.classObject} 
                    classPeriod={this.state.classPeriod} 
                    dataObject={this.state.dataObject}
                    graphInfoData={this.state.data}
                    linkTo={true}
                    roster={this.state.roster} 
                    score={true} 
                    stateLables={this.state.stateLables}
                    url={`${match.url}/studenthome/`}
                  />
                }>
              </Route>

              <Route exact path={`${match.url}/assess`} render={props =>
                  <AssessClassContainer
                    all={e=>this.componentDidMount()}
                    assessments={this.state.classAssessments}
                    classObject={this.state.classObject}
                    classPeriod={this.state.classPeriod}
                    reFetch={e => this.reFetchAssessments(e)}
                    roster={this.state.roster}
                    user={this.props.user} 
                  />
                }>    
              </Route>

              <Route exact path={`${match.url}/edit`} render={props =>
                  <EditClassContainer
                    {...props}
                    allRegistrations={this.state.allRegistrations}
                    assessments={this.state.allAssessments}
                    classes={this.state.allclasses}
                    classObject={this.state.classObject} 
                    classPeriod={this.state.classPeriod}
                    deleteStudent={(student,registrations,assessments) => this.deleteStudentAssessments(student,registrations,assessments)}
                    deRegister={e => this.deleteRegistration(e)}
                    patchClassPeriod={e => this.patchClassPeriod(e)}
                    reFetchStudentBody={e => this.reFetchStudentBody(e)}
                    registrations={this.state.classRegistrations}
                    register={e => this.postRegistration(e)}
                    roster={this.state.roster}
                    studentBody={this.state.allStudents}
                    test={e => this.test(e)}
                    user={this.props.user}
                  />
                }>     
              </Route>

              <Route exact path={`${match.url}/studenthome/:id`} render={props =>
                  <StudentHomeContainer
                    {...props}
                    assessments={this.state.classAssessments} 
                    buildGraph={e => this.testDate(e)}
                    classPeriod={this.state.classPeriod}
                    deleteRegistration={e => this.deleteRegistration(e)}
                    deleteStudent={e => this.deleteStudent(e)}
                    fetchClass={e => this.reFetchAssessments(e)}
                    graphInfoData={this.state.data}
                    patchStudent={e => this.patchStudent(e)}
                    register={e => this.postRegistration(e)}
                    registrations={this.state.classRegistrations}
                    roster={this.state.roster}
                    setHeader={e => this.setHeader(e)}
                    stateLables={this.state.stateLables}
                    studentBody={this.state.allStudents}
                    test={e => this.test(e)}
                  />
                }>  
              </Route>
            </Switch>
          </div>
        </Router>
      </div>
    )
  }
} 
export default ClassHome