import React from 'react';
import ReactECharts from 'echarts-for-react';

export const Epicurve = ({ data }: { data: any[] }) => {
  const options = {
    tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
    legend: { data: ['Suspected', 'Confirmed', 'Resolved'] },
    xAxis: { type: 'category', data: data.map(d => d.date) },
    yAxis: { type: 'value' },
    series: [
      { name: 'Suspected', type: 'bar', stack: 'total', data: data.map(d => d.suspected), itemStyle: { color: '#f59e0b' } },
      { name: 'Confirmed', type: 'bar', stack: 'total', data: data.map(d => d.confirmed), itemStyle: { color: '#dc2626' } },
      { name: 'Resolved', type: 'bar', stack: 'total', data: data.map(d => d.resolved), itemStyle: { color: '#10b981' } }
    ]
  };

  return <ReactECharts option={options} style={{ height: '300px', width: '100%' }} />;
};
