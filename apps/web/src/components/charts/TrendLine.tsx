import React from 'react';
import ReactECharts from 'echarts-for-react';

export const TrendLine = ({ data, seriesName }: { data: any[], seriesName: string }) => {
  const options = {
    tooltip: { trigger: 'axis' },
    xAxis: { type: 'category', data: data.map(d => d.date) },
    yAxis: { type: 'value' },
    series: [{ name: seriesName, data: data.map(d => d.value), type: 'line', smooth: true, lineStyle: { color: '#3b82f6' } }]
  };
  return <ReactECharts option={options} style={{ height: '300px', width: '100%' }} />;
};
