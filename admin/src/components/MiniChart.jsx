import React from 'react';

const MiniChart = ({ data, active }) => {
  const max = Math.max(...data);
  return (
    <div className="mini-chart">
      {data.map((v, i) => (
        <div key={i} className={`bar${i === active ? ' active' : ''}`} style={{ height: `${(v / max) * 100}%` }} title={v} />
      ))}
    </div>
  );
};

export default MiniChart;
