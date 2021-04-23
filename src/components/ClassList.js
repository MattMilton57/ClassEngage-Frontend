import React from 'react';
import  Class from './Class';

const ClassList = ({classes, listType, callback, classNumber}) => {
return(
    <div class="class-list" id='Teacher'>
        <ul class="class-list__container">
            {classes.map (aClass => {return <div><Class classNumber={classNumber} callback={callback} listType={listType} subject={aClass.subject} level={aClass.level} period={aClass.period} classObject={aClass}/></div>})}
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
        </ul>
    </div>
) 
}
export default ClassList;

// return this.props.enrollments.map(enrollment => {
//     if (enrollment.period_id == this.state.selectedClass){