// import from react
import React, {useEffect} from 'react';
import PropTypes from 'prop-types';

// import from echarts
import * as echarts from 'echarts/core';
import {
  GridComponent,
  ToolboxComponent,
  LegendComponent
} from 'echarts/components';
import {
  LineChart,
  PieChart
} from 'echarts/charts';
import {
  CanvasRenderer
} from 'echarts/renderers';

function ReactEcharts(props) {
  echarts.use(
    [GridComponent, LineChart, CanvasRenderer, ToolboxComponent,
      LegendComponent, PieChart]
  );
  const echartsInstance = echarts; //echarts object
  let echartsDOMElement = null; //echarts dom
  let { option, style, className } = props // get props

  // get real dom on didMount
  useEffect(() => {
    //get dom element instance, if no instance then init one
    let echartObj = echartsInstance.getInstanceByDom(echartsDOMElement) ||
      echartsInstance.init(echartsDOMElement);

    //set echarts option
    echartObj.setOption(option);

    // Destory the element on WillUnmount
    return function destroyEchartElement() {
      echartObj.dispose();
    }
  }, [option])

  return (
    <div
      ref={(e) => {echartsDOMElement = e}}
      style={style}
      className={className}
    >Echarts</div>
  )
}

// specify propTypes for component
ReactEcharts.propTypes = {
  option: PropTypes.object.isRequired,
  style: PropTypes.object,
  className: PropTypes.string
}

ReactEcharts.defaultProps = {
  style: {height: "300px", width: "500px"},
  className: ""
}

export default ReactEcharts;