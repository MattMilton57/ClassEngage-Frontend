import React from 'react';
import  NewClass from './NewClass';

const NewClassListContainer = ({classes, selected}) => {
return(
    <div id='Teacher'>
        <div>
            I am testing my props. my teacher is some dude, Here are some classes:
        </div>
            <br></br>
        <div>
            {classes.map (aClass => {return <div><NewClass subject={aClass.subject} level={aClass.level} period={aClass.period} classObject={aClass} selected={selected}/></div>})}
            {/* {classes.map(aClass => {if (aClass.teacher_id == teacher)
                return <div>
                            <Class 
                                subject={aClass.subject} 
                                id={aClass.id}
                                level={aClass.level} 
                                period={aClass.period} 
                                selected={selected} 
                                classObject={aClass}
                                thisClass={aClass.id}/>
                                
                        </div>})} */}
        </div>
    </div>
) 
}
export default NewClassListContainer;
// return this.props.enrollments.map(enrollment => {
//     if (enrollment.period_id == this.state.selectedClass){