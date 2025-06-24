// src/components/EventList.tsx
import React, { useState } from 'react';
import type { BloodDonationEvent } from '../../../types/Event';
import './EventManagement.css';

interface EventListProps {
  events: BloodDonationEvent[];
  onEdit: (event: BloodDonationEvent) => void;
  onDelete: (id: string) => void;
  onMarkAsCompleted: (id: string) => void;
  onViewDonors: (id: string) => void; // Placeholder for viewing registered donors
}

const EventList: React.FC<EventListProps> = ({ events, onEdit, onDelete, onMarkAsCompleted, onViewDonors }) => {
  return (
    <div >
      {/* Bỏ search/filter UI */}
      <div className="tableWrapper">
        <table className={"table"}>
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
              <tr>
                <td colSpan={6} style={{ textAlign: 'center' }}>Không có sự kiện nào.</td>
              </tr>
            ) : (
              events.map(event => (
                <tr key={event.id}>
                  <td>{event.name}</td>
                  <td>
                    {new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}
                  </td>
                  <td>{event.locationName}</td>
                  <td>
                        {event.status === 'upcoming' && 'Sắp diễn ra'}
                        {event.status === 'ongoing' && 'Đang diễn ra'}
                  </td>
                  <td>{event.registeredDonors}</td>
                  <td className={"actionButtons"}>
                    <button className={"edit"} onClick={() => onEdit(event)}>Chỉnh sửa</button>
                    <button className={"check"} onClick={() => onViewDonors(event.name)}>Xem người đăng ký</button>
                    {event.status !== 'completed' && (
                      <button className={"mark"} onClick={() => onMarkAsCompleted(event.id)}>Đánh dấu hoàn thành</button>
                    )}
                    <button className={"delete"} onClick={() => onDelete(event.id)}>Xóa</button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

    </div>
  );
};

export default EventList;