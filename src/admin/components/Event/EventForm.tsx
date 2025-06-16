// src/components/EventForm.tsx
import React, { useState, useEffect } from 'react';
import type { BloodDonationEvent } from '../../../types/Event';
import './EventManagement.css'; // Updated import

interface EventFormProps {
  event?: BloodDonationEvent | null; // Null for new event, existing for edit
  onSave: (event: BloodDonationEvent) => void;
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSave, onCancel }) => {
  const [formData, setFormData] = useState<BloodDonationEvent>({
    id: event?.id || crypto.randomUUID(), // Tạo ID mới nếu không có
    name: event?.name || '',
    description: event?.description || '',
    startTime: event?.startTime || '',
    endTime: event?.endTime || '',
    locationName: event?.locationName || '',
    locationAddress: event?.locationAddress || '',
    targetAudience: event?.targetAudience || 'Công dân từ 18-60 tuổi, khỏe mạnh.',
    specialRequirements: event?.specialRequirements || 'Mang theo CMND/CCCD.',
    imageUrl: event?.imageUrl || '',
    status: event?.status || 'upcoming',
    registeredDonors: event?.registeredDonors || 0,
    actualBloodUnits: event?.actualBloodUnits || 0,
  });

  useEffect(() => {
    if (event) {
      setFormData(event);
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="form"> {/* Removed styles.form */}
      <h2>{event ? 'Chỉnh sửa sự kiện' : 'Tạo sự kiện mới'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="formGroup"> {/* Removed styles.formGroup */}
          <label htmlFor="name">Tên sự kiện:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup"> {/* Removed styles.formGroup */}
          <label htmlFor="description">Mô tả:</label>
          <textarea
            id="description"
            name="description"
            rows={4}
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div className="formGroup"> {/* Removed styles.formGroup */}
          <label htmlFor="startTime">Thời gian bắt đầu:</label>
          <input
            type="datetime-local"
            id="startTime"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup"> {/* Removed styles.formGroup */}
          <label htmlFor="endTime">Thời gian kết thúc:</label>
          <input
            type="datetime-local"
            id="endTime"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup"> {/* Removed styles.formGroup */}
          <label htmlFor="locationName">Tên địa điểm:</label>
          <input
            type="text"
            id="locationName"
            name="locationName"
            value={formData.locationName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup"> {/* Removed styles.formGroup */}
          <label htmlFor="locationAddress">Địa chỉ chi tiết:</label>
          <input
            type="text"
            id="locationAddress"
            name="locationAddress"
            value={formData.locationAddress}
            onChange={handleChange}
            required
          />
        </div>
        <div className="formGroup"> {/* Removed styles.formGroup */}
          <label htmlFor="targetAudience">Đối tượng tham gia:</label>
          <input
            type="text"
            id="targetAudience"
            name="targetAudience"
            value={formData.targetAudience}
            onChange={handleChange}
          />
        </div>
        <div className="formGroup"> {/* Removed styles.formGroup */}
          <label htmlFor="specialRequirements">Yêu cầu đặc biệt:</label>
          <input
            type="text"
            id="specialRequirements"
            name="specialRequirements"
            value={formData.specialRequirements}
            onChange={handleChange}
          />
        </div>
        <div className="formGroup"> {/* Removed styles.formGroup */}
          <label htmlFor="imageUrl">URL hình ảnh/Banner:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            placeholder="Tùy chọn"
          />
        </div>
        {event && ( // Only show status for existing events
          <div className="formGroup"> {/* Removed styles.formGroup */}
            <label htmlFor="status">Trạng thái:</label>
            <select id="status" name="status" value={formData.status} onChange={handleChange}>
              <option value="upcoming">Sắp diễn ra</option>
              <option value="ongoing">Đang diễn ra</option>
              <option value="completed">Đã kết thúc</option>
              <option value="cancelled">Đã hủy</option>
            </select>
          </div>
        )}
        {event && event.status === 'completed' && ( // Only show actual units for completed events
            <div className="formGroup"> {/* Removed styles.formGroup */}
            <label htmlFor="actualBloodUnits">Số đơn vị máu thực tế thu được:</label>
            <input
              type="number"
              id="actualBloodUnits"
              name="actualBloodUnits"
              value={formData.actualBloodUnits || 0}
              onChange={handleChange}
              min="0"
            />
          </div>
        )}
        <div className="formActions"> {/* Removed styles.formActions */}
          <button type="submit" className="submitButton"> {/* Removed styles.submitButton */}
            {event ? 'Cập nhật' : 'Tạo sự kiện'}
          </button>
          <button type="button" className="cancelButton" onClick={onCancel}> {/* Removed styles.cancelButton */}
            Hủy
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;