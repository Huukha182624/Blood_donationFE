// src/components/SubNavigation.tsx
import React from 'react';
import  './EventManagement.css';

interface SubNavigationProps {
  activeTab: 'current' | 'create' | 'history';
  onTabChange: (tab: 'current' | 'create' | 'history') => void;
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
      <button
        className={activeTab === 'create' ? "active" : ''}
        onClick={() => onTabChange('create')}
      >
        Tạo sự kiện mới
      </button>
    </div>
  );
};

export default SubNavigation;