// src/App.tsx
import React, { useState, useEffect } from 'react'; // Import useEffect
import SubNavigation from './SubNavigation'; // Đảm bảo đường dẫn đúng
import EventList from './EventList';       // Đảm bảo đường dẫn đúng
import EventForm from './EventForm';       // Đảm bảo đường dẫn đúng
import EventHistory from './EventHistory'; // Đảm bảo đường dẫn đúng
import type { BloodDonationEvent } from '../../../types/Event'; // Đảm bảo đường dẫn đúng
// Đảm bảo đường dẫn đúng
import './EventManagement.css'; // Đảm bảo đường dẫn đúng
import './variables.css';                       // Đảm bảo đường dẫn đúng

const EventPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'current' | 'create' | 'history'>('current');
  const [events, setEvents] = useState<BloodDonationEvent[]>([]);
  const [editingEvent, setEditingEvent] = useState<BloodDonationEvent | null>(null);

  // Dữ liệu giả định để test
  // Sử dụng useEffect để khởi tạo dữ liệu một lần khi component mount
  useEffect(() => {
    const initialEvents: BloodDonationEvent[] = [
      {
        id: '1',
        name: 'Ngày hội Hiến máu Tình nguyện 2025',
        description: 'Sự kiện thường niên lớn nhất của chúng ta.',
        startTime: '2025-07-20T08:00',
        endTime: '2025-07-20T17:00',
        locationName: 'Trung tâm Văn hóa TP.HCM',
        locationAddress: 'Số 01 Đường Đinh Tiên Hoàng, Quận 1, TP.HCM',
        targetAudience: 'Công dân từ 18-60 tuổi, khỏe mạnh.',
        specialRequirements: 'Mang theo CMND/CCCD, ăn sáng đầy đủ.',
        status: 'upcoming',
        registeredDonors: 150,
      },
      {
        id: '2',
        name: 'Hiến máu Cộng đồng Quận 3',
        description: 'Chương trình hiến máu tại địa phương.',
        startTime: '2025-06-15T09:00',
        endTime: '2025-06-15T16:00',
        locationName: 'Nhà Văn hóa Thiếu nhi Quận 3',
        locationAddress: '123 Đường Nam Kỳ Khởi Nghĩa, Quận 3, TP.HCM',
        targetAudience: 'Người dân trong khu vực Quận 3.',
        specialRequirements: 'Có giấy tờ tùy thân.',
        status: 'ongoing',
        registeredDonors: 80,
      },
      {
        id: '3',
        name: 'Hiến máu vì Bệnh nhân Ung thư',
        description: 'Sự kiện đặc biệt hỗ trợ bệnh nhân ung thư.',
        startTime: '2024-11-10T08:30',
        endTime: '2024-11-10T15:00',
        locationName: 'Bệnh viện Ung Bướu TP.HCM',
        locationAddress: 'Số 47 Nguyễn Bỉnh Khiêm, Quận Bình Thạnh, TP.HCM',
        targetAudience: 'Công dân từ 18-60 tuổi.',
        specialRequirements: 'Kiểm tra sức khỏe kỹ càng.',
        status: 'completed',
        registeredDonors: 120,
        actualBloodUnits: 95,
      },
      {
        id: '4',
        name: 'Ngày hội Hiến máu Sinh viên',
        description: 'Chương trình dành cho sinh viên các trường đại học.',
        startTime: '2024-03-25T07:30',
        endTime: '2024-03-25T14:00',
        locationName: 'Đại học Quốc gia TP.HCM',
        locationAddress: 'Khu phố 6, P.Linh Trung, Q.Thủ Đức, TP.HCM',
        targetAudience: 'Sinh viên, giảng viên.',
        specialRequirements: 'Có thẻ sinh viên.',
        status: 'completed',
        registeredDonors: 250,
        actualBloodUnits: 200,
      },
      {
        id: '5',
        name: 'Ngày hội Hiến máu Sinh viên',
        description: 'Chương trình dành cho sinh viên các trường đại học.',
        startTime: '2024-03-25T07:30',
        endTime: '2024-03-25T14:00',
        locationName: 'Đại học Quốc gia TP.HCM',
        locationAddress: 'Khu phố 6, P.Linh Trung, Q.Thủ Đức, TP.HCM',
        targetAudience: 'Sinh viên, giảng viên.',
        specialRequirements: 'Có thẻ sinh viên.',
        status: 'completed',
        registeredDonors: 250,
        actualBloodUnits: 200,
      },
    ];
    setEvents(initialEvents);
  }, []); // [] đảm bảo useEffect chỉ chạy một lần sau khi render ban đầu


  const handleSaveEvent = (eventToSave: BloodDonationEvent) => {
    if (editingEvent) {
      // Cập nhật sự kiện hiện có
      setEvents(events.map(e => (e.id === eventToSave.id ? eventToSave : e)));
      setEditingEvent(null);
    } else {
      // Thêm sự kiện mới
      setEvents([...events, eventToSave]);
    }
    setActiveTab('current'); // Quay lại danh sách sau khi lưu
  };

  const handleCancelForm = () => {
    setEditingEvent(null);
    setActiveTab('current');
  };

  const handleEditEvent = (event: BloodDonationEvent) => {
    setEditingEvent(event);
    setActiveTab('create'); // Chuyển sang form với dữ liệu để chỉnh sửa
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sự kiện này không?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const handleMarkAsCompleted = (id: string) => {
    setEvents(events.map(e =>
      e.id === id ? { ...e, status: 'completed', actualBloodUnits: e.registeredDonors * 0.75 } : e // Giả định 75% người đăng ký đến hiến máu
    ));
    alert('Sự kiện đã được đánh dấu là hoàn thành.');
  };

  const handleViewDonors = (id: string) => {
    // Đây là nơi bạn sẽ điều hướng đến trang/modal hiển thị danh sách người đăng ký
    alert(`Xem danh sách người đăng ký cho sự kiện ID: ${id}. (Chức năng này cần được phát triển thêm)`);
  };

  const currentEvents = events.filter(e => e.status === 'upcoming' || e.status === 'ongoing');
  const completedEvents = events.filter(e => e.status === 'completed');

  return (
    <div className="container">
      <SubNavigation activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === 'current' && (
        <>
          <div className="header">
            <h2>Các sự kiện hiện tại/sắp tới</h2>
            <button className="primaryButton" onClick={() => { setEditingEvent(null); setActiveTab('create'); }}>
              + Tạo sự kiện mới
            </button>
          </div>
          <EventList
            events={currentEvents}
            onEdit={handleEditEvent}
            onDelete={handleDeleteEvent}
            onMarkAsCompleted={handleMarkAsCompleted}
            onViewDonors={handleViewDonors}
          />
        </>
      )}

      {activeTab === 'create' && (
        <EventForm
          event={editingEvent}
          onSave={handleSaveEvent}
          onCancel={handleCancelForm}
        />
      )}

      {activeTab === 'history' && (
        <>
          <div className="header">
            <h2>Lịch sử sự kiện</h2>
          </div>
          <EventHistory
            events={completedEvents}
            onViewDetails={handleEditEvent} // Dùng lại form chỉnh sửa để xem chi tiết
          />
        </>
      )}
    </div>
  );
};

export default EventPage;