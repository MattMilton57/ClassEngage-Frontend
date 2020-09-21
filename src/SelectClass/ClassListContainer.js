import React from 'react';
import  Class from './Class';

const ClassListContainer = ({teacher, classes, selected}) => {
return(
    <div id='Teacher'>
        <div>
            I am testing my props. my teacher is {teacher}, Here are some classes:
        </div>
            <br></br>
        <div>
            {classes.map(aClass => {if (aClass.teacher_id == teacher)
                return <div>
                            <Class 
                                subject={aClass.subject} 
                                id={aClass.id}
                                level={aClass.level} 
                                period={aClass.period} 
                                selected={selected} 
                                classObject={aClass}
                                thisClass={aClass.id}/>
                                
                        </div>})}
        </div>
    </div>
) 
}
export default ClassListContainer;
// return this.props.enrollments.map(enrollment => {
//     if (enrollment.period_id == this.state.selectedClass){