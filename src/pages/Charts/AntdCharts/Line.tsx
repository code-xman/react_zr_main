import { Line } from '@ant-design/plots';

const AntdChartsLine = () => {
  const data = [
    { date: '2025/8/1', type: 'download', value: 1623 },
    { date: '2025/8/1', type: 'register', value: 2208 },
    { date: '2025/8/1', type: 'bill', value: 1182 },
    { date: '2025/8/2', type: 'download', value: 2145 },
    { date: '2025/8/2', type: 'register', value: 2016 },
    { date: '2025/8/2', type: 'bill', value: 3999 },
    { date: '2025/8/3', type: 'download', value: 4038 },
    { date: '2025/8/3', type: 'register', value: 2916 },
    { date: '2025/8/3', type: 'bill', value: 2013 },
    { date: '2025/8/4', type: 'download', value: 3571 },
    { date: '2025/8/4', type: 'register', value: 4011 },
    { date: '2025/8/4', type: 'bill', value: 1339 },
    { date: '2025/8/5', type: 'download', value: 1022 },
    { date: '2025/8/5', type: 'register', value: 3419 },
    { date: '2025/8/5', type: 'bill', value: 2659 },
    { date: '2025/8/6', type: 'download', value: 2136 },
    { date: '2025/8/6', type: 'register', value: 2652 },
    { date: '2025/8/6', type: 'bill', value: 3234 },
  ];

  const config = {
    data,
    xField: 'date',
    yField: 'value',
    shapeField: 'smooth',
    scale: {
      y: {
        domainMin: 0,
      },
    },
    point: {
      shapeField: 'circle',
      sizeField: 4,
    },
    interaction: {
      tooltip: {
        marker: false,
      },
    },
    style: {
      lineWidth: 2,
    },
    colorField: 'type',
  };

  return (
    <div
      className="line"
      style={{
        width: '100%',
        height: 'calc(100% - 10px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Line {...config} />
    </div>
  );
};

export default AntdChartsLine;
