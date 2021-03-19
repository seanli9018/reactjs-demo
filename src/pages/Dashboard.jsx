import React, {useEffect} from 'react';

// import components
import ReactEcharts from "../components/ReactEcharts";


function Dashboard() {
  let option1 = {
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
      type: 'value'
    },
    series: [{
      data: [820, 932, 901, 934, 1290, 1330, 1320],
      type: 'line',
      smooth: true
    }]
  }

  let option2 = {
    legend: {
      top: 'bottom'
    },
    toolbox: {
      show: true,
      feature: {
        mark: {show: true},
        dataView: {show: true, readOnly: false},
        restore: {show: true},
        saveAsImage: {show: true}
      }
    },
    series: [
      {
        name: 'Pattern',
        type: 'pie',
        radius: [50, 100],
        center: ['50%', '50%'],
        roseType: 'area',
        itemStyle: {
          borderRadius: 8
        },
        data: [
          {value: 40, name: 'rose 1'},
          {value: 38, name: 'rose 2'},
          {value: 32, name: 'rose 3'},
          {value: 30, name: 'rose 4'},
          {value: 28, name: 'rose 5'},
          {value: 26, name: 'rose 6'},
          {value: 22, name: 'rose 7'},
          {value: 18, name: 'rose 8'}
        ]
      }
    ]
  }
  return (
    <div id="main-container" style={{display: 'flex', flexDirection: 'row'}}>
      <ReactEcharts option={option1} />
      <ReactEcharts option={option2} style={{"width": "500px", "height": "350px"}}/>
    </div>
  )
}

export default Dashboard;