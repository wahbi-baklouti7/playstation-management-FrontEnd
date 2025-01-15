import React from 'react'
import ReactECharts from 'echarts-for-react';

const BarChart = ({ data }) => {
  const max = parseInt(Math.max(...data?.data||[])); 
   const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: [
      {
        type: 'category',
        data: data.labels || [],
        
        axisTick: {
          alignWithLabel: true
        },
        axisLabel: {
          interval: 0,
          rotate: 45
        }

      }
    ],
    yAxis: [
      {
        type: 'value',
        max: max*1.5
      }
    ],
    series: [
      {
        name: 'Amount',
        type: 'bar',
        barWidth: '40%',
        
        data:data.data || []
      }
    ]
      };
    return <ReactECharts
    option={option}
    style={{ height: 400 }}
  />;
}

export default BarChart