import React from 'react';
import Icon from './Icon';

const StatCard = ({ title, value, icon, trend, trendUp, color, accent }) => (
  <div className='stat-card'>
    <div className="stat-bg-icon"><Icon name={icon} size={60} /></div>
    {trend && <span className={`stat-trend ${trendUp ? 'up' : 'down'}`}>{trendUp ? '↑' : '↓'} {trend}</span>}
    <div className="stat-icon"><Icon name={icon} size={18} /></div>
    <div className="stat-value">{value}</div>
    <div className="stat-label">{title}</div>
  </div>
);

export default StatCard;