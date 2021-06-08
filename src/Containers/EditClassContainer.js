import React from 'react';
import InfoBox from "../components/InfoBox";
import Roster from "../components/Roster";
import RosterRemainder from "../components/RosterRemainder";
import DeleteStudentForm from "../forms/DeleteStudentForm"
import EditClassForm from "../forms/EditClassForm";
import NewStudentForm from "../forms/NewStudentForm";

const  EditClassContainer = ({ 
  allRegistrations, 
  assessments, 
  classes, 
  classObject, 
  deRegister, 
  deleteStudent, 
  patchClassPeriod, 
  reFetchStudentBody, 
  register, 
  registrations, 
  roster,
  studentBody, 
  user 
}) => {

  const handleAdd = (e) => {
      register(e)
    }
  
  const handleRemove = (r,s) => {
      deRegister(r)
    }
  
  const findReg= (e) => {
      registrations.forEach( r => {
        if (r.student_id === e.id)
        {handleRemove(r.id, e)}
      })
    }
  const maxSize = (e) => {
    if(classObject){return roster.length}
  }
  const messageCenter = () => {
    if (studentBody.length === 0) 
      {return(
        <div>
          <div className="edit-class__message-center--text">
            Welcome to the edit class page
          </div>
          <div className="edit-class__message-center--text">
            please use the student preferences meuu to create some students
          </div>
        </div>)}
    else if
      (roster.length === 0)
        {return(
          <div className="edit-class__message-center--text">
            Click on a student to register them into this class
          </div>
        )}
    else
      {return(
        <div className="edit-class__message-center--text">
          click on a student in your roster to remove them from this class
        </div>
      )}
  }
  return(
    <div className="edit-class">

      <div className="edit-class__roster-container">
        <div className="edit-class__roster-container-shell">
          <Roster 
            label={"Registered Students"} 
            roster={roster} 
            callback={findReg} 
            registerAction="-"
          />
        </div>
      </div>

      <div className="edit-class__student-body-container">
        <div className="edit-class__student-body-container-shell">
          <RosterRemainder 
            label={"Remaining Students"} 
            user={user} 
            roster={roster} 
            studentBody={studentBody} 
            callback={handleAdd} 
            registerAction="+"
          />
        </div>
      </div>

      <div className="edit-class__class-name">
        {classObject.subject}
      </div>

      <div className="edit-class__message-center">
        {messageCenter()}
      </div>

      <div className="edit-class__class-count">
        <InfoBox 
          text={"class size"} 
          data={maxSize()}
        />
      </div>

      <div className="edit-class__controll">
        <label for="new-student-form__checkbox" className="edit-class__controll-btn edit-class__controll-new-student">Add A Student</label>
        <label for="delete-student-form__checkbox" className="edit-class__controll-btn edit-class__controll-delete-student">Delete A Student</label>
        <label for="edit-class-form__checkbox" className="edit-class__controll-btn edit-class__controll-rename-class"><div>Edit Class Preferences</div></label>
      </div>

      <div className="edit-class__forms">
        <EditClassForm 
          classObject={classObject}
          patchClassPeriod={patchClassPeriod}
        />

        <NewStudentForm 
          reFetchStudentBody={reFetchStudentBody}
          user={user}
        />

        <DeleteStudentForm 
          roster={roster}
          studentBody={studentBody}
          assessments={assessments}
          classes={classes}
          registrations={allRegistrations}
          deleteStudent={deleteStudent}
          user={user}
        />
      </div>
    </div>
  )
} 
export default EditClassContainer