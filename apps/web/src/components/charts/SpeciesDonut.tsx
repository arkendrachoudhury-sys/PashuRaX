import React from 'react';
import ReactECharts from 'echarts-for-react';

export const SpeciesDonut = ({ data }: { data: { name: string; value: number }[] }) => {
  const options = {
    tooltip: { trigger: 'item' },
    legend: { top: '5%', left: 'center' },
    series: [{
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: { borderRadius: 10, borderColor: '#fff', borderWidth: 2 },
      label: { show: false, position: 'center' },
      emphasis: { label: { show: true, fontSize: 20, fontWeight: 'bold' } },
      labelLine: { show: false },
      data: data
    }]
  };
  return <ReactECharts option={options} style={{ height: '300px', width: '100%' }} />;
};
