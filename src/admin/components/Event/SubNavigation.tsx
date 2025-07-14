import React from 'react';
import  './EventManagement.css';

interface SubNavigationProps {
  // Thêm 'hospitals' vào các giá trị có thể có của activeTab
  activeTab: 'current' | 'history' | 'hospitals';
  onTabChange: (tab: 'current' | 'history' | 'hospitals') => void;
}

const SubNavigation: React.FC<SubNavigationProps> = ({ activeTab, onTabChange }) => {
  return (
    <div className={"subNavigation"}>
      <button
        className={activeTab === 'current' ? "active" : ''}
        onClick={() => onTabChange('current')}
      >
        Sự kiện hiện tại/sắp tới
      </button>
      <button
        className={activeTab === 'history' ? "active" : ''}
        onClick={() => onTabChange('history')}
      >
        Lịch sử sự kiện
      </button>
      {/* NÚT MỚI CHO TAB BỆNH VIỆN */}
      <button
        className={activeTab === 'hospitals' ? "active" : ''}
        onClick={() => onTabChange('hospitals')}
      >
        Bệnh viện phối hợp
      </button>
    </div>
  );
};

export default SubNavigation;
