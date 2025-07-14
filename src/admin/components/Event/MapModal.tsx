// src/components/EventManagement/MapModal.tsx
import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
import type { BloodDonationEvent } from '../../../types/Event';
import type { IDonor } from '../../../types/donor';

// --- PROPS INTERFACE (Đã thêm onViewDonors từ các lần trước) ---
interface MapModalProps {
  event: BloodDonationEvent;
  donors: IDonor[];
  onClose: () => void;
  onViewDonors: (eventName: string) => void;
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

// --- CÁC HÀM HELPER ---
const calculateAge = (dob: string | undefined): number | null => {
    if (!dob) return null;
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
};

const getDirectionsUrl = (lat: number | string, lng: number | string) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`;
};

const formatEventStatus = (status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled') => {
    switch (status) {
        case 'upcoming': return 'Sắp diễn ra';
        case 'ongoing': return 'Đang diễn ra';
        case 'completed': return 'Đã kết thúc';
        case 'cancelled': return 'Đã hủy';
        default: return '';
    }
};


const MapModal: React.FC<MapModalProps> = ({ event, donors, onClose, onViewDonors }) => {
  // --- BỔ SUNG CÁC STATE VÀ HÀM BỊ THIẾU ---
  const [activeDonor, setActiveDonor] = useState<IDonor | null>(null);
  const [isEventInfoOpen, setIsEventInfoOpen] = useState(true); // State bị thiếu

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_Maps_API_KEY,
  });

  // Các hàm xử lý sự kiện click (bị thiếu)
  const handleDonorClick = (donor: IDonor) => {
      setActiveDonor(donor);
      setIsEventInfoOpen(false);
  };
  
  const handleEventClick = () => {
      setIsEventInfoOpen(true);
      setActiveDonor(null);
  };
  // ------------------------------------------

  if (loadError) return <div>Lỗi tải bản đồ. Vui lòng kiểm tra lại API Key.</div>;
  if (!isLoaded) return <div>Đang tải bản đồ...</div>;

  const eventPosition = {
    lat: Number(event.lat) || 0,
    lng: Number(event.lng) || 0,
  };

  const registrationPercentage = event.maxRegistrations > 0 ? (event.registeredDonors / event.maxRegistrations) * 100 : 0;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h3>Bản đồ sự kiện: {event.name}</h3>
        <div style={{ height: '500px', width: '100%', marginTop: '16px' }}>
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={eventPosition}
            zoom={13}
            onClick={() => {
                setActiveDonor(null);
                setIsEventInfoOpen(false);
            }}
          >
            {/* Marker cho sự kiện */}
            <MarkerF
              position={eventPosition}
              label={{ text: '🏥', fontSize: '24px' }}
              title={event.name}
              zIndex={10}
              onClick={handleEventClick} // Bây giờ hàm này đã tồn tại
            />

            {/* Markers cho người hiến máu */}
            {donors.map((donor) => {
              const donorPosition = { lat: Number(donor.lat) || 0, lng: Number(donor.lng) || 0 };
              if (donorPosition.lat === 0 && donorPosition.lng === 0) return null;

              const isSelected = activeDonor?.id === donor.id;
              
              return (
                <MarkerF
                  key={donor.id}
                  position={donorPosition}
                  onClick={() => handleDonorClick(donor)}
                  zIndex={isSelected ? 5 : 1}
                  icon={{
                      path: window.google.maps.SymbolPath.CIRCLE,
                      scale: isSelected ? 10 : 7,
                      fillColor: isSelected ? '#ff4500' : '#f44336',
                      fillOpacity: 1,
                      strokeWeight: 2,
                      strokeColor: 'white',
                  }}
                />
              );
            })}

            {/* --- BỔ SUNG KHỐI INFO WINDOW CỦA SỰ KIỆN BỊ THIẾU --- */}
            {isEventInfoOpen && (
                <InfoWindowF
                    position={eventPosition}
                    onCloseClick={() => setIsEventInfoOpen(false)}
                    options={{ pixelOffset: new window.google.maps.Size(0, -40) }}
                >
                    <div className="event-info-window">
                        <div className="event-info-image-container">
                             <img 
                                src={event.imageUrl || 'https://images.unsplash.com/photo-1599049285419-3f19b6267554?q=80&w=1974&auto=format&fit=crop'} 
                                alt={event.name}
                                className="event-info-image"
                            />
                            <div className="event-info-header">
                                <h4>{event.name}</h4>
                                <span className={`status-badge ${event.status}`}>{formatEventStatus(event.status)}</span>
                            </div>
                        </div>
                        <div className="event-info-body">
                            <p>🏥 <span>{event.hospital.name}</span></p>
                            <p>📍 <span>{event.locationName}</span></p>
                            <p>🗓️ <span>{new Date(event.startTime).toLocaleDateString('vi-VN')}</span></p>
                            {event.donateTime && (
                               <p>⏰ <span>Sáng: {event.donateTime.sang}, Chiều: {event.donateTime.chieu}</span></p>
                            )}
                            <div className="progress-section">
                                <div className="progress-labels">
                                    <span>Đã đăng ký</span>
                                    <span>{event.registeredDonors} / {event.maxRegistrations}</span>
                                </div>
                                <div className="progress-bar-container">
                                    <div className="progress-bar" style={{ width: `${registrationPercentage}%` }}></div>
                                </div>
                            </div>
                        </div>
                         <div className="info-window-actions-grid">
                            <a 
                              href={getDirectionsUrl(event.lat, event.lng)}
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="info-window-button"
                            >
                              Chỉ đường
                            </a>
                            <button onClick={() => onViewDonors(event.name)} className="info-window-button secondary">
                                Xem DS ĐK
                            </button>
                        </div>
                    </div>
                </InfoWindowF>
            )}

            {/* Cửa sổ thông tin (InfoWindow) của donor chi tiết */}
            {activeDonor && (
              <InfoWindowF
                position={{ lat: Number(activeDonor.lat) || 0, lng: Number(activeDonor.lng) || 0 }}
                onCloseClick={() => setActiveDonor(null)}
                options={{ pixelOffset: new window.google.maps.Size(0, -35) }}
              >
                <div className="donor-info-window">
                    <div className="info-window-header">
                       <img 
                        src={activeDonor.avatar_image || 'https://via.placeholder.com/50'} 
                        alt={activeDonor.name} 
                        className="info-window-avatar"
                      />
                      <div className="info-window-name-blood">
                          <h4>{activeDonor.name}</h4>
                          <p><strong>{activeDonor.bloodGroup}</strong> - {calculateAge(activeDonor.dob)} tuổi</p>
                      </div>
                    </div>
                    <div className="info-window-body">
                      <p>📞 <a href={`tel:${activeDonor.phone}`}>{activeDonor.phone}</a></p>
                      <p>📍 {activeDonor.address || 'Chưa cập nhật'}</p>
                      <div className="donation-stats">
                          <span>Lần hiến: <strong>{activeDonor.totalDonations || 0}</strong></span>
                          <span>Gần nhất: <strong>{activeDonor.lastDonationDate || 'Chưa có'}</strong></span>
                      </div>
                    </div>
                    <div className="info-window-actions">
                      <a 
                        href={getDirectionsUrl(activeDonor.lat, activeDonor.lng)}
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="info-window-button"
                      >
                        Chỉ đường
                      </a>
                    </div>
                </div>
              </InfoWindowF>
            )}
          </GoogleMap>
        </div>
      </div>
      <style>{`
        /* --- Toàn bộ CSS đã có từ lần trước --- */
        /* Bạn có thể giữ nguyên hoặc chuyển ra file CSS riêng */
        .modal-backdrop {
          position: fixed; top: 0; left: 0; width: 100vw; height: 100vh;
          background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 2000;
        }
        .modal-content {
          background: #fff; padding: 24px; border-radius: 12px;
          width: 90%; max-width: 800px; box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          position: relative; animation: modalIn 0.3s;
        }
        .close-button {
          position: absolute; top: 10px; right: 10px; background: none; border: none;
          font-size: 24px; cursor: pointer; color: #888; z-index: 10;
        }
        @keyframes modalIn {
          from { transform: translateY(-50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        .donor-info-window { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; min-width: 280px; max-width: 300px; padding: 4px; }
        .info-window-header { display: flex; align-items: center; }
        .info-window-avatar { width: 50px; height: 50px; border-radius: 50%; margin-right: 12px; object-fit: cover; border: 2px solid #eee; }
        .info-window-name-blood h4 { margin: 0; font-size: 16px; font-weight: 600; }
        .info-window-name-blood p { margin: 2px 0 0; font-size: 13px; color: #555; }
        .info-window-body { margin-top: 10px; border-top: 1px solid #f0f0f0; padding-top: 10px; }
        .info-window-body p { margin: 8px 0; font-size: 14px; display: flex; align-items: center; word-break: break-word; }
        .info-window-body p span { margin-left: 10px; }
        .info-window-body p a { color: #1a73e8; text-decoration: none; margin-left: 8px; }
        .info-window-body p a:hover { text-decoration: underline; }
        .donation-stats { display: flex; justify-content: space-between; background-color: #f7f7f7; border-radius: 6px; padding: 8px; margin-top: 8px; font-size: 13px; }
        .donation-stats span { flex: 1; text-align: center; }
        .donation-stats span:first-child { border-right: 1px solid #ddd; }
        .info-window-actions { margin-top: 12px; }
        .info-window-button { display: block; width: 100%; padding: 10px; border: none; border-radius: 6px; font-size: 14px; font-weight: bold; cursor: pointer; text-align: center; text-decoration: none; transition: all 0.2s; background-color: #1a73e8; color: white !important; }
        .info-window-button:hover { background-color: #1558b8; }
        .event-info-window { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; width: 320px; }
        .event-info-image-container { position: relative; height: 120px; }
        .event-info-image { width: 100%; height: 100%; object-fit: cover; border-radius: 8px; }
        .event-info-header { position: absolute; bottom: 0; left: 0; right: 0; padding: 8px; background: linear-gradient(to top, rgba(0,0,0,0.7), transparent); color: white; border-bottom-left-radius: 8px; border-bottom-right-radius: 8px; display: flex; justify-content: space-between; align-items: flex-end; }
        .event-info-header h4 { margin: 0; font-size: 16px; font-weight: 600; text-shadow: 1px 1px 3px rgba(0,0,0,0.5); }
        .status-badge { padding: 4px 10px; border-radius: 12px; font-size: 11px; font-weight: bold; color: white; white-space: nowrap; border: 1px solid rgba(255,255,255,0.5); }
        .status-badge.upcoming { background-color: #2196F3; }
        .status-badge.ongoing { background-color: #4CAF50; }
        .status-badge.completed { background-color: #757575; }
        .status-badge.cancelled { background-color: #f44336; }
        .event-info-body { padding: 12px 4px 0 4px; border-top: none; }
        .progress-section { margin-top: 12px; }
        .progress-labels { display: flex; justify-content: space-between; font-size: 12px; color: #666; margin-bottom: 4px; }
        .progress-bar-container { width: 100%; height: 6px; background-color: #e0e0e0; border-radius: 3px; overflow: hidden; }
        .progress-bar { height: 100%; background: linear-gradient(90deg, #4CAF50, #8BC34A); border-radius: 3px; transition: width 0.5s ease-in-out; }
        .info-window-actions-grid { margin-top: 16px; display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
        .info-window-button.secondary { background-color: #e8e8e8; color: #333; }
        .info-window-button.secondary:hover { background-color: #dcdcdc; }
      `}</style>
    </div>
  );
};

export default MapModal;