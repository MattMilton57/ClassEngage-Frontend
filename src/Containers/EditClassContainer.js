import React from 'react';
import Roster from "../components/Roster";
import RosterRemainder from "../components/RosterRemainder";

const  EditClassContainer = ({roster, studentBody, deRegister, register, registrations }) => {

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
        registrations.map( r => {
          if (r.student_id == e.id)
          {handleRemove(r.id, e)}
        })
      }

    return(
      <div className="edit-class">
          <div className="edit-class__headline--roster">
            <div className="edit-class__headline--title">Roster</div>
          </div>
          <div className="edit-class__roster-container">

            <Roster roster={roster} callback={findReg} registerAction="Remove"/>
          </div>

          <div className="edit-class__headline--student-body">
            <div className="edit-class__headline--title">Student Body</div>
          </div>
          <div className="edit-class__student-body-container">
            <RosterRemainder roster={roster} studentBody={studentBody} callback={handleAdd} registerAction="Register"/>
          </div>
          <div className="edit-class__new-student">
              NS
          </div>

      </div>
    )

} 
export default EditClassContainer