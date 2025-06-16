// src/App.tsx
import React, { useState } from 'react';
import BloodOverviewTab from './BloodOverviewTab'; // Giả sử cùng cấp hoặc trong components/
import BloodDetailsTab from './BloodDetailsTab';   // Giả sử cùng cấp hoặc trong components/
import './BloodManage.css'; // Import CSS file đã cập nhật

const BloodManagePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'details'>('overview');

  return (
    // Sử dụng class CSS thuần thay vì Tailwind
    <div className="blood-manage-page">
      <main className="main-content-blood-mn">
        <div className="tab-navigation">
          <div className="tab-buttons-container">
            <button
              className={`tab-button ${activeTab === 'overview' ? 'active' : 'inactive'}`}
              onClick={(e) => { e.preventDefault(); setActiveTab('overview'); }}
            >
              Tổng quan Kho máu
            </button>
            <button
              className={`tab-button ${activeTab === 'details' ? 'active' : 'inactive'}`}
              onClick={(e) => { e.preventDefault(); setActiveTab('details'); }}
            >
              Chi tiết Đơn vị máu
            </button>
          </div>
        </div>

        
        <div className="tab-content">
          {activeTab === 'overview' && <BloodOverviewTab />}
          {activeTab === 'details' && <BloodDetailsTab />}
        </div>
      </main>
    </div>
  );
};

export default BloodManagePage;