import React from 'react';
import Roster from "../components/Roster";
import RosterRemainder from "../components/RosterRemainder";
import InfoBox from "../components/InfoBox";
import EditClassForm from "../forms/EditClassForm"
import TitleBox from "../components/TitleBox"


const  EditClassContainer = ({roster, studentBody, deRegister, register, registrations, classObject, patchClassPeriod, reFetchStudentBody }) => {

    // const register = (student) => {
    //     console.log(student)
    // }

    // const deRegister = (student) => {
    //     console.log(student)
    // }

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

    return(
      <div className="edit-class">

          <div className="edit-class__roster-container">
            <div className="edit-class__headline--roster">
              <div className="edit-class__headline--title">Roster</div>
            </div>
              <Roster roster={roster} callback={findReg} registerAction="-"/>
          </div>

          <div className="edit-class__student-body-container">
            <div className="edit-class__headline--student-body">
              <div className="edit-class__headline--title">Student Body</div>
            </div>
              <RosterRemainder roster={roster} studentBody={studentBody} callback={handleAdd} registerAction="+"/>
          </div>

          <div className="edit-class__class-name">
            {classObject.subject}
        </div>

          <div className="edit-class__message-center">
            message center
          </div>

          <div className="edit-class__class-count">
            <InfoBox text={"class size"} data={roster.length}/>
          </div>

          {/* <div className="edit-class__new-student">
            <label className="edit-class__new-student-toggle" for="new-student-form__checkbox">
                              <span className="edit-class__new-student-toggle-content">New Student</span>
                          </label>
          </div> */}

          <div className="edit-class__controll">

            {/* <input type="checkbox" class="edit-class__controll-toggle" id="new-student-toggle"/> */}
            <label for="new-student-form__checkbox" className="edit-class__controll-btn edit-class__controll-new-student">Add student</label>

            {/* <input type="checkbox" class="edit-class__controll-toggle" id="delete-student-toggle"/> */}
            <label for="delete-student-form__checkbox" className="edit-class__controll-btn edit-class__controll-delete-student">Delete student</label>

            <input type="checkbox" class="edit-class__controll-toggle" id="rename-class-toggle"/>
            <label for="edit-class-form__checkbox" className="edit-class__controll-btn edit-class__controll-rename-class">Edit class</label>

            {/* <label for="edit-student-form__checkbox" className="edit-class__controll-btn edit-class__controll-new-student">edit student</label> */}
            <EditClassForm 
            classObject={classObject}
            patchClassPeriod={patchClassPeriod}
          // reFetchStudentBody={e => this.reFetchStudentBody(e)}
          // student={this.state.thisStudent}
          // patchStudent={this.props.patchStudent}
          // handleEdit={e => this.handleEdit(e)} 
          />

            {/* <input type="checkbox" class="edit-class__controll-toggle" id="delete-class-toggle"/>
            <label for="delete-class-toggle" className="edit-class__controll-btn edit-class__controll-delete-class">Delete class</label> */}

          </div>

      </div>
    )

} 
export default EditClassContainer