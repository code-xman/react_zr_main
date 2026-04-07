import { Column } from '@ant-design/plots';

const AntdChartsColumn = () => {
  const config = {
    data: {
      type: 'fetch',
      value:
        'https://gw.alipayobjects.com/os/antfincdn/iPY8JFnxdb/dodge-padding.json',
    },
    xField: '月份',
    yField: '月均降雨量',
    colorField: 'name',
    group: {
      padding: 0,
    },
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
      <Column {...config} />
    </div>
  );
};

export default AntdChartsColumn;
