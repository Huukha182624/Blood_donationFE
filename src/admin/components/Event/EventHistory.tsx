// src/components/EventHistory.tsx
import React, { useState } from 'react';
import type { BloodDonationEvent } from '../../../types/Event';
import './EventManagement.css';

interface EventHistoryProps {
  events: BloodDonationEvent[];
  onViewDetails: (event: BloodDonationEvent) => void;
}

const EventHistory: React.FC<EventHistoryProps> = ({ events, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterYear, setFilterYear] = useState('all');

  const availableYears = Array.from(new Set(events.map(event => new Date(event.startTime).getFullYear().toString())))
    .sort((a, b) => parseInt(b) - parseInt(a)); // Sort descending

  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.locationName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesYear = filterYear === 'all' || new Date(event.startTime).getFullYear().toString() === filterYear;
    return matchesSearch && matchesYear;
  });

  return (
    <div>
      <div className={"searchAndFilter"}>
        <input
          type="text"
          placeholder="Tìm kiếm theo tên sự kiện, địa điểm..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={filterYear} onChange={(e) => setFilterYear(e.target.value)}>
          <option value="all">Tất cả năm</option>
          {availableYears.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>

      <table className={"table"}>
        <thead>
          <tr>
            <th>Tên sự kiện</th>
            <th>Thời gian</th>
            <th>Địa điểm</th>
            <th>Số đơn vị máu thực tế</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredEvents.length === 0 ? (
            <tr>
              <td colSpan={5} style={{ textAlign: 'center' }}>Không có sự kiện đã hoàn thành.</td>
            </tr>
          ) : (
            filteredEvents.map(event => (
              <tr key={event.id}>
                <td>{event.name}</td>
                <td>
                  {new Date(event.startTime).toLocaleString()} - {new Date(event.endTime).toLocaleString()}
                </td>
                <td>{event.locationName}</td>
                <td>{event.actualBloodUnits || 0}</td>
                <td className={"actionButtons"}>
                  <button className={"edit"} onClick={() => onViewDetails(event)}>Xem chi tiết</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default EventHistory;