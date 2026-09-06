import React from 'react';
import ReactECharts from 'echarts-for-react';

export const VaccinationRadar = ({ data }: { data: any }) => {
  const options = {
    tooltip: {},
    radar: { indicator: data.indicators },
    series: [{
      type: 'radar',
      data: [{ value: data.values, name: 'Coverage %' }],
      itemStyle: { color: '#15803d' },
      areaStyle: { color: 'rgba(21, 128, 61, 0.2)' }
    }]
  };
  return <ReactECharts option={options} style={{ height: '300px', width: '100%' }} />;
};
