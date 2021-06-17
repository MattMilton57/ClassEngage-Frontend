import React from 'react';
import  Class from './Class';

const ClassList = ({classes, listType, callback, classNumber}) => {
    return(
        <div class="class-list" id='Teacher'>
            <ul class="class-list__container">
                {classes.map(aClass => {return <div><Class classNumber={classNumber} callback={callback} listType={listType} subject={aClass.subject} level={aClass.level} period={aClass.period} classObject={aClass}/></div>})}
            </ul>
        </div>
    ) 
}
export default ClassList;