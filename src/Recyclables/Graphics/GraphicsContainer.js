import React from 'react';
import  PieChart from './PieContainer';
import  TrendGraph from './TrendContainer';

const GraphicsContainer = ({thisPeriod}) => {
return(
    <div id='Roster'>
        <div>
            I am several fancy Graphics
            <PieChart id={thisPeriod}/>
            <TrendGraph id={thisPeriod}/>
        </div>
    </div>
) 
}
export default GraphicsContainer;
// return this.props.enrollments.map(enrollment => {
//     if (enrollment.period_id == this.state.selectedClass){