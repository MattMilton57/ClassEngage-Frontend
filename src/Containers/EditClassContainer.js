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
          <div className="edit-class__current-roster">
                Current class
            <Roster roster={roster} callback={findReg}/>
          </div>
          <div className="edit-class__student-body">
                Student Body
            <RosterRemainder roster={roster} studentBody={studentBody} callback={handleAdd}/>
          </div>

      </div>
    )

} 
export default EditClassContainer