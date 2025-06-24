// src/App.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // 1. IMPORT useNavigate
import SubNavigation from './SubNavigation';
import EventList from './EventList';
import EventForm from './EventForm';
import EventHistory from './EventHistory';
import type { BloodDonationEvent } from '../../../types/Event';
import './EventManagement.css';
import './variables.css';
import { searchCampaignsByDate } from '../../../services/blood-donation-campaign';

const EventPage: React.FC = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<'current' | 'create' | 'history'>('current');
  const [events, setEvents] = useState<BloodDonationEvent[]>([]);
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<BloodDonationEvent | null>(null);
  useEffect(() => {
    async function fetchEvents() {
      try {
        const data = await searchCampaignsByDate();
        const mapped = data.map((item: any) => ({
          id: item.id,
          name: item.name,
          startTime: item.activeTime,
          endTime: item.activeTime,
          locationName: item.address,
          status: item.status === 'Sắp diễn ra' ? 'upcoming' : item.status === 'Đang diễn ra' ? 'ongoing' : item.status === 'Đã kết thúc' ? 'completed' : item.status,
          registeredDonors: item.registered,
        }));
        console.log('Mapped events:', mapped);
        setEvents(mapped);
      } catch {
        setEvents([]);
      }
    }
    fetchEvents();
  }, []);

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
    setShowEventForm(true);
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

  const handleViewDonors = (campaignName: string) => {
    const encodedCampaignName = encodeURIComponent(campaignName);
    const targetUrl = `/admin/lich-hen?campaign=${encodedCampaignName}`;
    console.log(`Navigating to: ${targetUrl}`);
    navigate(targetUrl);
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
            <button className="primaryButton" onClick={() => { setEditingEvent(null); setShowEventForm(true); }}>
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

      {/* Popup EventForm */}
      {showEventForm && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          background: 'rgba(0,0,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 2000
        }}
          onClick={() => { setShowEventForm(false); setEditingEvent(null); }}
        >
          <div
            style={{
              position: 'relative',
              zIndex: 2100,
              background: '#fff',
              borderRadius: 18,
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              padding: 36,
              minWidth: 480,
              maxWidth: 600,
              width: '100%',
              margin: '0 16px',
              animation: 'popupIn 0.2s'
            }}
            onClick={e => e.stopPropagation()}
          >
            <EventForm
              event={editingEvent}
              onSave={handleSaveEvent}
              onCancel={() => { setShowEventForm(false); setEditingEvent(null); }}
            />
          </div>
          <style>
            {`
              @keyframes popupIn {
                from { transform: scale(0.95); opacity: 0; }
                to { transform: scale(1); opacity: 1; }
              }
            `}
          </style>
        </div>
      )}

      {activeTab === 'history' && (
        <>
          <div className="header">
            <h2>Lịch sử sự kiện</h2>
          </div>
          <EventHistory
            events={completedEvents}
            onViewDetails={handleEditEvent}
            onViewDonors={handleViewDonors}
          />
        </>
      )}
    </div>
  );
};

export default EventPage;