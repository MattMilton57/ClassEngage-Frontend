import { render } from '@testing-library/react';
import React from 'react';
import {Bar, Line, Pie} from 'react-chartjs-2'


const Graphics = (props) => { 
    const checkData = (props.graphData)
    const checkLables = (props.stateLables)


    console.log(checkLables)

const data = {
    labels: checkLables,
    datasets: [
      {
        label: 'Class Participation Rate',
        data: checkData,
        fill: false,
        backgroundColor: 'rgb(212, 120, 92)',
        borderColor: 'rgb(212, 120, 92,.6)',
      },
    ],
  }
  
  const options = {
      
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: false,
          },
        },
      ],
    },
  }
  
  return (
    <div classname="graph">
      <Line data={data} options={options}   width={600}
        height={200}
        options={{ maintainAspectRatio: false }}/>
    </div>
  )

  }
export default Graphics

