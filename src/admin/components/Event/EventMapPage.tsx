// src/pages/EventMapPage.tsx

import React, { useState, useEffect } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';

// Định nghĩa props component sẽ nhận
interface EventMapPageProps {
  eventId: string;
}

// Kiểu dữ liệu
interface IEvent { id: string; name: string; locationName: string; latitude: number; longitude: number; }
interface IDonor { id:string; name: string; latitude: number; longitude: number; }

const containerStyle = {
  width: '100%',
  height: '100%'
};

const EventMapPage: React.FC<EventMapPageProps> = ({ eventId }) => {
  const [event, setEvent] = useState<IEvent | null>(null);
  const [donors, setDonors] = useState<IDonor[]>([]);
  // 1. Cải tiến state: Chỉ lưu ID của marker đang active
  const [activeMarkerId, setActiveMarkerId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const { isLoaded, loadError } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_Maps_API_KEY,
    // 2. Thêm thư viện 'marker' để dùng Advanced Markers một cách chính thức
    libraries: ['marker'],
  });

  useEffect(() => {
    if (!eventId) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        // Thay thế bằng API thật của bạn
        const eventRes = await fetch(`/api/events/${eventId}`);
        if (!eventRes.ok) throw new Error('API sự kiện thất bại.');
        const eventData = await eventRes.json();
        
        const donorsRes = await fetch(`/api/events/${eventId}/nearby-donors`);
        if (!donorsRes.ok) throw new Error('API người hiến máu thất bại.');
        const donorsData = await donorsRes.json();
        
        setEvent(eventData);
        setDonors(donorsData);
        // Mặc định hiển thị InfoWindow của sự kiện chính khi tải xong
        setActiveMarkerId(eventData.id); 
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [eventId]);

  // Gộp tất cả các marker vào một mảng để dễ dàng render
  const allMarkers = event ? [event, ...donors] : donors;

  if (loading) return <div style={{ textAlign: 'center', padding: '2rem' }}>Đang tải dữ liệu bản đồ...</div>;
  if (error) return <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Lỗi: {error}</div>;
  if (loadError) return <div style={{ textAlign: 'center', padding: '2rem', color: 'red' }}>Lỗi khi tải Google Maps. Vui lòng kiểm tra API Key.</div>;
  if (!isLoaded || !event) return null;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={{ lat: event.latitude, lng: event.longitude }}
      zoom={14}
      // 3. Thêm mapId là một best practice khi dùng Advanced Markers
      // mapId="YOUR_MAP_ID_HERE" // Bạn có thể tạo Map ID trong Google Cloud Console
      onClick={() => setActiveMarkerId(null)} // Click vào bản đồ để đóng InfoWindow
    >
      {/* Render tất cả các marker */}
      {allMarkers.map(marker => (
        <Marker
          key={marker.id}
          position={{ lat: marker.latitude, lng: marker.longitude }}
          onClick={() => setActiveMarkerId(marker.id)}
        >
          {/* Tùy chỉnh icon bằng emoji hoặc thẻ <img>, <div> */}
          <span style={{ fontSize: '2rem', cursor: 'pointer' }}>
            {marker.id === event.id ? '📍' : '🩸'}
          </span>
        </Marker>
      ))}

      {/* 4. Cấu trúc render InfoWindow mới, ổn định hơn */}
      {allMarkers.map(marker => {
        if (marker.id === activeMarkerId) {
          return (
            <InfoWindow
              key={`info-${marker.id}`}
              position={{ lat: marker.latitude, lng: marker.longitude }}
              onCloseClick={() => setActiveMarkerId(null)}
            >
              <div style={{ padding: '5px' }}>
                <h4>{marker.name}</h4>
                {/* Có thể thêm các chi tiết khác */}
              </div>
            </InfoWindow>
          );
        }
        return null;
      })}
    </GoogleMap>
  );
};

export default EventMapPage;