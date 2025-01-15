import React from "react";
import ReactECharts from "echarts-for-react";

const LineChartP = ({ data }) => {
  const formattedData = data?.data?.map((value) =>
    parseFloat(value.toFixed(3))
  );
  // console.log(formattedData)
  const max = Math.max(...(formattedData ?? []));
  const option = {
    tooltip: {
      trigger: "axis",
    },

    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        // name: 'Date',
        boundaryGap: false,
        data: data.labels,
      },
    ],
    yAxis: [
      {
        type: "value",
        // name: 'Amount',
        min: 0,
        max: max * 1.5,
        axisLabel: {
          formatter: (value) => value.toFixed(0),
        },
      },
    ],
    series: [
      {
        name: "Amount",

        type: "line",
        stack: "total",

        smooth: true,

        areaStyle: {},
        data: formattedData,
      },
    ],
  };

  return <ReactECharts option={option} style={{ height: 400 }} />;
};

export default LineChartP;
