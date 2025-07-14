// src/EventList.tsx
import React from 'react';
import type { BloodDonationEvent } from '../../../types/Event';
import './EventManagement.css';

interface EventListProps {
  events: BloodDonationEvent[];
  onEdit: (event: BloodDonationEvent) => void;
  onDelete: (id: string) => void;
  onViewDonors: (campaignName: string) => void;
  // Đổi tên prop để rõ ràng hơn
  onViewMap: (event: BloodDonationEvent) => void; 
}

const getStatusClassName = (status: string) => {
    if (status === 'ongoing') return 'status ongoing';
    if (status === 'upcoming') return 'status upcoming';
    return 'status completed';
};

const formatStatus = (status: string) => {
    if (status === 'ongoing') return 'Đang diễn ra';
    if (status === 'upcoming') return 'Sắp diễn ra';
    return 'Đã hoàn thành';
};

const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete, onViewDonors, onViewMap }) => {
  return (
    <div className="tableWrapper">
      <table className="table">
        <thead>
          <tr>
            <th>Tên sự kiện</th>
            <th>Thời gian</th>
            <th>Địa điểm</th>
            <th>Trạng thái</th>
            <th>Đã đăng ký</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {events.length === 0 ? (
            <tr><td colSpan={6} style={{ textAlign: 'center' }}>Không có sự kiện nào.</td></tr>
          ) : (
            events.map(event => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>{new Date(event.startTime).toLocaleDateString('vi-VN')}</td>
                <td>{event.locationName}</td>
                <td>
                  <span className={getStatusClassName(event.status)}>
                    {formatStatus(event.status)}
                  </span>
                </td>
                <td>{event.registeredDonors}</td>
                <td className="actionButtons">
                  <button className="edit" onClick={() => onEdit(event)}>Sửa</button>
                  <button className="check" onClick={() => onViewDonors(event.name)}>Xem DS Đăng ký</button>
                  {event.status !== 'completed' && (
                    // Truyền cả đối tượng event vào hàm xử lý
                    <button className="view-map" onClick={() => onViewMap(event)}>
                      Xem Bản đồ
                    </button>
                  )}
                  <button className="delete" onClick={() => onDelete(event.id)}>Xóa</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventList;