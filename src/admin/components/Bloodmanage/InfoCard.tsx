import React from 'react';
import './InfoCard.css'; // Thêm dòng này
import type { InfoCardProps } from '../../../types/types';

const InfoCard: React.FC<InfoCardProps> = ({ title, value, icon, color = 'gray', onClick }) => {
  return (
    <div className={`info-card ${color}`} onClick={onClick}>
      <div className="info-card-content">
        <h3>{title}</h3>
        <p>{value}</p>
      </div>
      {icon && <div className="info-card-icon">{icon}</div>}
    </div>
  );
};

export default InfoCard;
