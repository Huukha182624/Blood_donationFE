import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// Import các components và types
import SubNavigation from './SubNavigation';
import EventList from './EventList';
import EventForm from './EventForm';
import EventHistory from './EventHistory';
import MapModal from './MapModal';
import type { BloodDonationEvent } from '../../../types/Event';
import type { IDonor } from '../../../types/donor';

// --- SỬA LỖI: Import các hàm từ các file service đã được tách biệt ---
import { getAllCampaigns, createCampaign, updateCampaign } from '../../../services/Campaign/campaignService';
import { getAllHospitals, createHospital } from '../../../services/Hospital/hospitalService';
import { fetchAllUsersWithHistory } from '../../../services/userService';

// Import CSS
import './EventManagement.css';
import './variables.css';

// --- Định nghĩa các Type ---
interface Hospital {
  id: number;
  name: string;
  address: string;
  contactInfo: string; // Đổi tên thuộc tính cho khớp với backend
}

// --- COMPONENT FORM THÊM BỆNH VIỆN ---
interface HospitalFormProps {
    onSave: (data: Omit<Hospital, 'id'>) => void;
    onCancel: () => void;
}

const HospitalForm: React.FC<HospitalFormProps> = ({ onSave, onCancel }) => {
    const [formData, setFormData] = useState({ name: '', address: '', contactInfo: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.address) {
            alert('Vui lòng nhập tên và địa chỉ bệnh viện.');
            return;
        }
        setIsSubmitting(true);
        await onSave(formData);
        setIsSubmitting(false);
    };

    return (
        <div className="form-container">
            <h2>Thêm bệnh viện mới</h2>
            <form onSubmit={handleSubmit}>
                <div className="formGroup">
                    <label htmlFor="name">Tên Bệnh viện:</label>
                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="formGroup">
                    <label htmlFor="address">Địa chỉ:</label>
                    <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="formGroup">
                    <label htmlFor="contactInfo">Thông tin liên hệ:</label>
                    <input type="text" id="contactInfo" name="contactInfo" value={formData.contactInfo} onChange={handleChange} />
                </div>
                <div className="formActions">
                    <button type="button" className="cancelButton" onClick={onCancel} disabled={isSubmitting}>Hủy</button>
                    <button type="submit" className="submitButton" disabled={isSubmitting}>
                        {isSubmitting ? 'Đang lưu...' : 'Lưu'}
                    </button>
                </div>
            </form>
        </div>
    );
};


const EventPage: React.FC = () => {
  const navigate = useNavigate();
  
  const [activeTab, setActiveTab] = useState<'current' | 'history' | 'hospitals'>('current');
  
  const [events, setEvents] = useState<BloodDonationEvent[]>([]);
  const [allDonors, setAllDonors] = useState<IDonor[]>([]);
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  
  const [showEventForm, setShowEventForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<BloodDonationEvent | null>(null);
  const [selectedEventForMap, setSelectedEventForMap] = useState<BloodDonationEvent | null>(null);
  const [showHospitalForm, setShowHospitalForm] = useState(false);

  // Hàm fetch dữ liệu ban đầu
  const fetchAllData = async () => {
    try {
        // SỬA LỖI: Gọi đến các hàm service đã được cập nhật
        const [eventData, userData, hospitalData] = await Promise.all([
            getAllCampaigns(),
            fetchAllUsersWithHistory(),
            getAllHospitals()
        ]);

        // SỬA LỖI: Ánh xạ dữ liệu từ backend .NET
        const mappedEvents = eventData.map((item: any) => {
            // --- BẮT ĐẦU PHẦN SỬA LỖI ---
            // Đồng bộ hóa trạng thái từ backend ('finished') với frontend ('completed')
            let status = item.status.toLowerCase();
            if (status === 'finished') {
                status = 'completed';
            }
            // --- KẾT THÚC PHẦN SỬA LỖI ---
            
            return {
                id: item.id.toString(),
                name: item.name,
                startTime: item.activeTime,
                endTime: item.activeTime,
                locationName: item.address,
                lat: parseFloat(item.lat) || 0,
                lng: parseFloat(item.lng) || 0,
                status: status, // Sử dụng status đã được đồng bộ
                registeredDonors: item.registeredCount,
                donateTime: item.donateTime,
                maxRegistrations: item.max,
                hospital: item.hospital ? { id: item.hospital.id.toString(), name: item.hospital.name } : { id: '', name: 'Không xác định' },
                hospitalId: item.hospital?.id.toString() || '',
            };
        });
        
        setEvents(mappedEvents);
        setAllDonors(userData);
        setHospitals(hospitalData);

    } catch (error) {
      console.error("Failed to fetch initial data:", error);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  const handleTabChange = (tab: 'current' | 'history' | 'hospitals') => {
    setActiveTab(tab);
  };
  
  const handleSaveEvent = async (eventToSave: BloodDonationEvent) => {
    try {
        // SỬA LỖI: Gọi đến các hàm service đã được cập nhật
      if (editingEvent) {
        await updateCampaign(eventToSave.id, eventToSave);
      } else {
        await createCampaign(eventToSave);
      }
      await fetchAllData(); // Tải lại toàn bộ dữ liệu
    } catch (error) {
      console.error("Lỗi khi lưu sự kiện:", error);
    } finally {
      setShowEventForm(false);
      setEditingEvent(null);
    }
  };

  // Hàm mới để lưu bệnh viện
  const handleSaveHospital = async (hospitalData: Omit<Hospital, 'id'>) => {
    try {
        // SỬA LỖI: Gọi đến các hàm service đã được cập nhật
        await createHospital(hospitalData);
        alert('Thêm bệnh viện thành công!');
        const updatedHospitals = await getAllHospitals(); // Tải lại danh sách bệnh viện
        setHospitals(updatedHospitals);
    } catch (error) {
      console.error("Lỗi khi thêm bệnh viện:", error);
      alert('Thêm bệnh viện thất bại!');
    } finally {
      setShowHospitalForm(false);
    }
  };

  const handleEditEvent = (event: BloodDonationEvent) => {
    setEditingEvent(event);
    setShowEventForm(true);
  };

  const handleCancelForm = () => {
    setShowEventForm(false);
    setEditingEvent(null);
  };

  const handleDeleteEvent = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa sự kiện này không?')) {
      setEvents(events.filter(e => e.id !== id));
    }
  };

  const handleViewDonors = (campaignName: string) => {
    navigate(`/admin/lich-hen?campaign=${encodeURIComponent(campaignName)}`);
  };

  const handleOpenMap = (event: BloodDonationEvent) => {
    setSelectedEventForMap(event);
  };

  const handleCloseMap = () => {
    setSelectedEventForMap(null);
  };

  const currentEvents = useMemo(() => events.filter(e => e.status === 'upcoming' || e.status === 'ongoing'), [events]);
  // --- SỬA LỖI: Lọc theo trạng thái 'completed' đã được đồng bộ ---
  const completedEvents = useMemo(() => events.filter(e => e.status === 'completed'), [events]);

  return (
    <div className="container">
      <SubNavigation activeTab={activeTab} onTabChange={handleTabChange} />

      {activeTab === 'current' && (
        <>
          <div className="header">
            <h2>Các sự kiện hiện tại/sắp tới</h2>
            <button className="primaryButton" onClick={() => { setEditingEvent(null); setShowEventForm(true); }}>
              + Tạo sự kiện mới
            </button>
          </div>
          <EventList events={currentEvents} onEdit={handleEditEvent} onDelete={handleDeleteEvent} onViewDonors={handleViewDonors} onViewMap={handleOpenMap} />
        </>
      )}

      {activeTab === 'history' && (
        <>
          <div className="header">
            <h2>Lịch sử sự kiện</h2>
          </div>
          <EventHistory events={completedEvents} onViewDetails={handleEditEvent} onViewDonors={handleViewDonors} />
        </>
      )}

      {activeTab === 'hospitals' && (
        <>
          <div className="header">
            <h2>Danh sách Bệnh viện phối hợp</h2>
            <button className="primaryButton" onClick={() => setShowHospitalForm(true)}>
              + Thêm bệnh viện
            </button>
          </div>
          <div className="tableWrapper">
            <table className="table">
              <thead>
                <tr>
                  <th>Tên Bệnh viện</th>
                  <th>Địa chỉ</th>
                  <th>Thông tin liên hệ</th>
                </tr>
              </thead>
              <tbody>
                {hospitals.length > 0 ? (
                  hospitals.map(hospital => (
                    <tr key={hospital.id}>
                      <td>{hospital.name}</td>
                      <td>{hospital.address}</td>
                      <td>{hospital.contactInfo}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={3} style={{ textAlign: 'center' }}>Không có dữ liệu bệnh viện.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}

      {showEventForm && (
        <div className="modal-backdrop-form" onClick={handleCancelForm}>
          <div className="modal-content-form" onClick={e => e.stopPropagation()}>
            <EventForm event={editingEvent} onSave={handleSaveEvent} onCancel={handleCancelForm} />
          </div>
        </div>
      )}

      {showHospitalForm && (
        <div className="modal-backdrop-form" onClick={() => setShowHospitalForm(false)}>
            <div className="modal-content-form" onClick={e => e.stopPropagation()}>
                <HospitalForm
                    onSave={handleSaveHospital}
                    onCancel={() => setShowHospitalForm(false)}
                />
            </div>
        </div>
      )}

      {selectedEventForMap && (
        <MapModal event={selectedEventForMap} donors={allDonors} onClose={handleCloseMap} onViewDonors={handleViewDonors} />
      )}

      <style>{`
        .modal-backdrop-form {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0, 0, 0, 0.4); display: flex; align-items: center;
          justify-content: center; z-index: 2000; 
        }
        .modal-content-form {
          background: white; padding: 32px; border-radius: 12px;
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15); width: 90%;
          max-width: 600px; animation: formPopupIn 0.3s ease-out;
        }
        @keyframes formPopupIn {
          from { transform: scale(0.95) translateY(15px); opacity: 0; }
          to { transform: scale(1) translateY(0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default EventPage;
