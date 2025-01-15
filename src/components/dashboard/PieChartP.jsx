import React from 'react';
import ReactECharts from 'echarts-for-react';
const PieChartP = ({ data }) => {
    
    const transformedData = data.map((item) => ({ value: item.total, name: item.name }));
    const options = {
        tooltip: {
        trigger: 'item',
        // formatter: ' {b}', // Show name, value, and percentage

        },
        legend: {
          // top: '5%',
          bottom: '0%',
          left: 'center'

        },
        series: [
            {
            
            name: 'Sessions',
            type: 'pie',
            radius: ['40%', '70%'],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: '#fff',
              borderWidth: 2
            },
            label: {
              show: false,
              position: 'center',
              formatter: '{d}%', // Display name and percentage

            },
            emphasis: {
              label: {
                show: true,
                fontSize: 40,
                fontWeight: 'bold'
              }
            },
            labelLine: {
              show: false
            },
                data:transformedData
         
          }
        ]
      };
    
      return <ReactECharts option={options} />;
}

export default PieChartP