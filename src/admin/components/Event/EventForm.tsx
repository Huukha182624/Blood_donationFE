// src/components/EventForm.tsx
import React, { useState, useEffect } from 'react';
import type { BloodDonationEvent } from '../../../types/Event';
import './EventManagement.css'; // Updated import
import { createCampaign } from '../../../services/blood-donation-campaign';
import { format, parse } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface EventFormProps {
  event?: BloodDonationEvent | null; // Null for new event, existing for edit
  onSave: (event: BloodDonationEvent) => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: event?.name || '',
    address: event?.locationName || 'Nguyễn Xiển, Long Thạnh Mỹ , Quận 9',
    activeTime: event?.startTime || '',
    donateTime: (event && typeof (event as any).donateTime !== 'undefined') ? (event as any).donateTime : { start: '', end: '' },
    max: (event && typeof (event as any).max !== 'undefined') ? (event as any).max : 0,
  });

  useEffect(() => {
    if (event) {
      setFormData({
        name: event.name || '',
        address: event.locationName || 'Nguyễn Xiển, Long Thạnh Mỹ , Quận 9',
        activeTime: event.startTime || '',
        donateTime: (typeof (event as any).donateTime !== 'undefined') ? (event as any).donateTime : { start: '', end: '' },
        max: (typeof (event as any).max !== 'undefined') ? (event as any).max : 0,
      });
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDonateTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      donateTime: {
        ...prev.donateTime,
        [name]: value
      }
    }));
  };

  const parseDateForSubmit = (dateStr: string) => {
    if (!dateStr) return '';
    // Nếu là dd/MM/yyyy thì chuyển sang yyyy-MM-dd
    if (/^\d{2}\/\d{2}\/\d{4}$/.test(dateStr)) {
      const [day, month, year] = dateStr.split('/');
      return `${year}-${month}-${day}`;
    }
    return dateStr;
  };

  const parseDate = (str) => parse(str, 'dd/mm/yyyy', new Date());

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Validate all required fields
    if (!formData.name || !formData.address || !formData.activeTime || !formData.donateTime.start || !formData.donateTime.end || !formData.max) {
      alert('Vui lòng nhập đầy đủ thông tin!');
      return;
    }
    try {
      await createCampaign({
        name: formData.name,
        address: formData.address,
        activeTime: parseDateForSubmit(formData.activeTime),
        donateTime: formData.donateTime,
        max: Number(formData.max)
      });
      alert('Tạo chiến dịch thành công!');
      onCancel();
    } catch (err) {
      alert('Tạo chiến dịch thất bại!');
    }
  };

  return (
    <div className="form" style={{
      background: '#fff',
      borderRadius: 12,
      boxShadow: '0 2px 16px #eee',
      padding: 32,
      maxWidth: 600,
      margin: '32px auto',
    }}>
      <h2 style={{ fontWeight: 700, color: '#d32f2f', marginBottom: 24 }}>{event ? 'Chỉnh sửa sự kiện' : 'Tạo sự kiện mới'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup" style={{ marginBottom: 20 }}>
          <label htmlFor="name" style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Tên chiến dịch:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
          />
        </div>
        <div className="formGroup" style={{ marginBottom: 20 }}>
          <label htmlFor="address" style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Địa điểm:</label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
          />
        </div>
        <div className="formGroup" style={{ marginBottom: 20 }}>
          <label htmlFor="activeTime" style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Ngày diễn ra:</label>
          <DatePicker
            selected={formData.activeTime ? parseDate(formData.activeTime) : null}
            onChange={(date: Date | null) => {
              setFormData(prev => ({
                ...prev,
                activeTime: date ? format(date, 'dd/mm/yyyy') : ''
              }));
            }}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/MM/yyyy"
            className="your-input-class"
          />
        </div>
        <div className="formGroup" style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Thời gian hiến máu:</label>
          <div style={{ display: 'flex', gap: 8 }}>
            <input
              type="time"
              name="start"
              value={formData.donateTime.start}
              onChange={handleDonateTimeChange}
              required
              style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
            />
            <span style={{ alignSelf: 'center' }}>-</span>
            <input
              type="time"
              name="end"
              value={formData.donateTime.end}
              onChange={handleDonateTimeChange}
              required
              style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
            />
          </div>
        </div>
        <div className="formGroup" style={{ marginBottom: 28 }}>
          <label htmlFor="max" style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Số lượng tối đa:</label>
          <input
            type="number"
            id="max"
            name="max"
            value={formData.max}
            onChange={handleChange}
            min={1}
            required
            style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }}
          />
        </div>
        <div className="formActions" style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
          <button type="submit" className="submitButton" style={{ background: '#d32f2f', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 6, padding: '10px 28px', fontSize: 16, cursor: 'pointer' }}>
            {event ? 'Cập nhật' : 'Tạo chiến dịch'}
          </button>
          <button type="button" className="cancelButton" onClick={onCancel} style={{ background: '#888', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 6, padding: '10px 28px', fontSize: 16, cursor: 'pointer' }}>
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;