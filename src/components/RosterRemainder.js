import React from 'react';
import Roster from "../components/Roster";

const  RosterRemainder = ({roster, user, studentBody, callback, registerAction}) => {

    const remainingStudents = () => {
        ///create array of enrolled student ID numbers///
        let rosterNumbers=[]
        roster.map(s=>{rosterNumbers.push(s.id)})
      
        ///create array of all student ID numbers///
        let allNumbers=[]
        studentBody.map(s=>{allNumbers.push(s.id)})
    
        ///create array of non enrolled student ID numbers///
        let registerNumbers=[]
        allNumbers.map(student=>{
          if (rosterNumbers.includes(student)==false)
          {registerNumbers.push(student)}
        }) 
    
        ///translate that array into list of non enrolled students who were created by the user///
        let registerFrom = [] 
        registerNumbers.map( number => {
          studentBody.map( student => {
            if(user){
              if((number == student.id)&&(student.user_id==user.id)){  
                registerFrom.push(student)
              }
            }
          })
        })
    
        return(         
           <Roster 
          roster={registerFrom} 
          callback={callback}
          registerAction={registerAction}/>
        ) 
      }

      return(
          <div>
              {remainingStudents()}
          </div>
      )
} 
export default RosterRemainder