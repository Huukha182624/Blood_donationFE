import React, { useState } from 'react';
import { GoogleMap, useJsApiLoader, MarkerF, InfoWindowF } from '@react-google-maps/api';
// Giả sử bạn đã định nghĩa các kiểu này trong một file
import { type IDonor, type IDonationRecord } from '../../../types/donor';
import './DonorMapModal.css';

interface DonorMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDonor: IDonor | null;
  allDonors: IDonor[];
}

const containerStyle = {
  width: '100%',
  height: '100%',
};

const mapBloodTypeToDisplay = (bloodType: string): string => {
    if (!bloodType || bloodType === 'None') return 'Chưa rõ';
    return bloodType.replace('_POS', '+').replace('_NEG', '-');
};


const DonorMapModal: React.FC<DonorMapModalProps> = ({ isOpen, onClose, selectedDonor, allDonors }) => {
  const [activeMarker, setActiveMarker] = useState<IDonor | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_Maps_API_KEY,
  });

  React.useEffect(() => {
    if (isOpen && selectedDonor) {
      setActiveMarker(selectedDonor);
    } else {
      setActiveMarker(null);
    }
  }, [isOpen, selectedDonor]);

  if (!isOpen || !selectedDonor || !selectedDonor.lat || !selectedDonor.lng) {
    return null;
  }

  const center = {
    lat: selectedDonor.lat,
    lng: selectedDonor.lng,
  };

  const handleMarkerClick = (donor: IDonor) => {
    setActiveMarker(donor);
  };

  const calculateAge = (dob: string): number | null => {
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

  const renderMap = () => {
    if (loadError) return <div>Lỗi tải bản đồ. Vui lòng kiểm tra lại API Key.</div>;
    if (!isLoaded) return <div>Đang tải bản đồ...</div>;

    return (
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onClick={() => setActiveMarker(null)}
      >
        {allDonors.map(donor =>
          donor.lat && donor.lng ? (
            <MarkerF
              key={donor.id}
              position={{ lat: donor.lat, lng: donor.lng }}
              onClick={() => handleMarkerClick(donor)}
              icon={{
                url: donor.id === selectedDonor.id
                  ? 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
                  : 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
              }}
            />
          ) : null
        )}

        {activeMarker && activeMarker.lat && activeMarker.lng && (
          <InfoWindowF
            position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
            onCloseClick={() => setActiveMarker(null)}
          >
            {/* ---- NỘI DUNG INFO WINDOW ĐƯỢC MỞ RỘNG ---- */}
            <div className="donor-info-window">
              <h4>{activeMarker.name}</h4>
              {activeMarker.dob && (
                <p><strong>Tuổi:</strong> {calculateAge(activeMarker.dob)}</p>
              )}
              <p><strong>Giới tính:</strong> {activeMarker.gender}</p>
              <p><strong>Nhóm máu:</strong> {mapBloodTypeToDisplay(activeMarker.bloodGroup)}</p>
              <p><strong>SĐT:</strong> {activeMarker.phone}</p>
              {activeMarker.email && (
                <p><strong>Email:</strong> {activeMarker.email}</p>
              )}
              <p><strong>Địa chỉ:</strong> {activeMarker.address}</p>

              <p className="donation-history-title">Thông tin hiến máu</p>
              <p><strong>Tổng số lần hiến:</strong> {activeMarker.totalDonations}</p>
              <p><strong>Lần hiến gần nhất:</strong> {activeMarker.lastDonationDate}</p>

              {/* Hiển thị chi tiết lần hiến máu gần nhất từ mảng history */}
              {activeMarker.donationHistory && activeMarker.donationHistory.length > 0 && (
                <>
                  <p><strong>Địa điểm gần nhất:</strong> {activeMarker.donationHistory[0].location}</p>
                  <p><strong>Lượng máu hiến gần nhất:</strong> {activeMarker.donationHistory[0].volume} ml</p>
                  <p><strong>Tổng lượng máu đã hiến:</strong> {activeMarker.totalVolume} ml</p>
                </>
              )}
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    );
  };

  return (
    <div className="map-modal-overlay" onClick={onClose}>
      <div className="map-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>×</button>
        <h3>Bản đồ vị trí người hiến máu</h3>
        {renderMap()}
      </div>
    </div>
  );
};

export default DonorMapModal;