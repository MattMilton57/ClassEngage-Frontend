import React from 'react';
import {Line} from 'react-chartjs-2'


const Graphics = (props) => { 
    const checkData = (props.graphData)
    const checkLables = (props.stateLables)

  const data = {
    labels: checkLables,
    datasets: [
      {
        data: checkData,
        fill:{value: 25},
        backgroundColor: 'rgb(212, 120, 92, .4)',
        borderColor: 'rgb(212, 120, 92,.6)',
      },
    ],
  }
  
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  }
  
  return (
    <div className="graph">
      <Line data={data} options={options}   width={500}
        height={200}
        options={{ maintainAspectRatio: false }}/>
    </div>
  )

}
export default Graphics

