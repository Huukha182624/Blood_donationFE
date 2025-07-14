import React, { useState, useEffect } from 'react';
import type { BloodDonationEvent } from '../../../types/Event';
import './EventManagement.css';
import { createCampaign, updateCampaign } from '../../../services/blood-donation-campaign';
import { format, parse, isValid } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { getAllHospitals } from '../../../services/Hospital/hospitalService';
import { getCoordinatesFromAddress } from '../../../services/user.service';

// Interface for Hospital data
interface Hospital {
  id: number;
  name: string;
}

interface EventFormProps {
  event?: BloodDonationEvent | null;
  onSave: (event: any) => void; // Thay đổi thành 'any' để linh hoạt hơn
  onCancel: () => void;
}

const EventForm: React.FC<EventFormProps> = ({ event, onSave, onCancel }) => {
  const [hospitals, setHospitals] = useState<Hospital[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  // State của form, không thay đổi cấu trúc
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    activeTime: '', // Luôn lưu ở dạng 'dd/MM/yyyy' để hiển thị
    donateTime: {
      sang: { start: '07:30', end: '11:30' },
      chieu: { start: '13:30', end: '17:00' }
    },
    max: '100',
    hospitalId: '',
  });

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const hospitalData = await getAllHospitals();
        setHospitals(hospitalData);
      } catch (err) {
        console.error("Failed to fetch hospitals:", err);
      }
    };
    fetchHospitals();
  }, []);

  // Chuẩn hóa dữ liệu khi điền vào form ở chế độ sửa
  useEffect(() => {
    if (event) { // Chế độ Sửa
        let parsedDonateTime = { sang: { start: '', end: '' }, chieu: { start: '', end: '' } };
        try {
          // Backend trả về donateTime là một chuỗi JSON, cần parse nó
          if (event.donateTime && typeof event.donateTime === 'string') {
              const times = JSON.parse(event.donateTime);
              const sangTimes = times.sang ? times.sang.split('-') : ['', ''];
              const chieuTimes = times.chieu ? times.chieu.split('-') : ['', ''];
              parsedDonateTime = {
                  sang: { start: sangTimes[0] || '', end: sangTimes[1] || '' },
                  chieu: { start: chieuTimes[0] || '', end: chieuTimes[1] || '' }
              };
          }
        } catch (e) {
          console.error("Failed to parse donateTime JSON:", e);
        }

      setFormData({
        name: event.name || '',
        address: event.locationName || '',
        activeTime: event.startTime ? format(new Date(event.startTime), 'dd/MM/yyyy') : '',
        donateTime: parsedDonateTime,
        max: event.maxRegistrations?.toString() || '',
        hospitalId: event.hospital?.id?.toString() || '',
      });
    } else { // Chế độ Tạo mới
      // Reset form về trạng thái ban đầu
      setFormData({
        name: '',
        address: 'Trường Đại học Bách Khoa TP.HCM',
        activeTime: '',
        donateTime: { sang: { start: '07:30', end: '11:30' }, chieu: { start: '13:30', end: '17:00' } },
        max: '100',
        hospitalId: '',
      });
    }
  }, [event]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleDonateTimeChange = (session: 'sang' | 'chieu', type: 'start' | 'end', value: string) => {
    setFormData(prev => ({ ...prev, donateTime: { ...prev.donateTime, [session]: { ...prev.donateTime[session], [type]: value } } }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!formData.name || !formData.address || !formData.activeTime || !formData.max || !formData.hospitalId) {
      setError('Vui lòng nhập đầy đủ thông tin bắt buộc!');
      setIsSubmitting(false);
      return;
    }

    const coordinates = await getCoordinatesFromAddress(formData.address);
    
    // --- SỬA LỖI: Chuẩn bị payload cho API, khớp với DTO của backend ---
    const payload = {
      name: formData.name,
      address: formData.address,
      // Chuyển đổi ngày từ 'dd/MM/yyyy' sang định dạng ISO mà backend có thể hiểu
      activeTime: parse(formData.activeTime, 'dd/MM/yyyy', new Date()).toISOString(),
      // Chuyển đổi object thành chuỗi JSON
      donateTime: JSON.stringify({
        sang: `${formData.donateTime.sang.start}-${formData.donateTime.sang.end}`,
        chieu: `${formData.donateTime.chieu.start}-${formData.donateTime.chieu.end}`
      }),
      max: Number(formData.max),
      hospitalId: Number(formData.hospitalId),
      lat: coordinates?.lat || null,
      lng: coordinates?.lng || null,
    };

    try {
      let responseData;
      if (event) {
        responseData = await updateCampaign(event.id, payload);
        alert('Cập nhật sự kiện thành công!');
      } else {
        responseData = await createCampaign(payload);
        alert('Tạo sự kiện mới thành công!');
      }
      onSave(responseData);

    } catch (err: any) {
      console.error('Lỗi khi lưu sự kiện:', err);
      setError(err.message || 'Thao tác thất bại! Vui lòng kiểm tra lại thông tin hoặc thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSelectedDate = () => {
    if (!formData.activeTime) return null;
    const dateObj = parse(formData.activeTime, 'dd/MM/yyyy', new Date());
    return isValid(dateObj) ? dateObj : null;
  };

  return (
    <div className="form-container" style={{
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
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
        </div>
        <div className="formGroup" style={{ marginBottom: 20 }}>
          <label htmlFor="address" style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Địa điểm:</label>
          <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
        </div>
        <div className="formGroup" style={{ marginBottom: 20 }}>
          <label htmlFor="hospitalId" style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Bệnh viện phối hợp:</label>
          <select id="hospitalId" name="hospitalId" value={formData.hospitalId} onChange={handleChange} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, background: 'white' }}>
            <option value="" disabled>-- Chọn bệnh viện --</option>
            {hospitals.map(h => <option key={h.id} value={h.id}>{h.name}</option>)}
          </select>
        </div>
        <div className="formGroup" style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Ngày diễn ra:</label>
          <DatePicker
            selected={getSelectedDate()}
            onChange={(date: Date | null) => setFormData(prev => ({ ...prev, activeTime: date ? format(date, 'dd/MM/yyyy') : '' }))}
            dateFormat="dd/MM/yyyy"
            placeholderText="dd/MM/yyyy"
            wrapperClassName="date-picker-wrapper"
            customInput={<input style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16, cursor: 'pointer' }} />}
          />
        </div>
        <div className="formGroup" style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Thời gian hiến máu:</label>
          <div style={{ marginBottom: 12 }}>
            <label style={{ fontWeight: 500, marginBottom: 4, display: 'block', fontSize: 14 }}>Ca sáng:</label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="time" value={formData.donateTime.sang.start} onChange={(e) => handleDonateTimeChange('sang', 'start', e.target.value)} required style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
              <span>-</span>
              <input type="time" value={formData.donateTime.sang.end} onChange={(e) => handleDonateTimeChange('sang', 'end', e.target.value)} required style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
            </div>
          </div>
          <div>
            <label style={{ fontWeight: 500, marginBottom: 4, display: 'block', fontSize: 14 }}>Ca chiều:</label>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <input type="time" value={formData.donateTime.chieu.start} onChange={(e) => handleDonateTimeChange('chieu', 'start', e.target.value)} required style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
              <span>-</span>
              <input type="time" value={formData.donateTime.chieu.end} onChange={(e) => handleDonateTimeChange('chieu', 'end', e.target.value)} required style={{ flex: 1, padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
            </div>
          </div>
        </div>
        <div className="formGroup" style={{ marginBottom: 28 }}>
          <label htmlFor="max" style={{ fontWeight: 600, marginBottom: 6, display: 'block' }}>Số lượng tối đa:</label>
          <input type="number" id="max" name="max" value={formData.max} onChange={handleChange} min={1} required style={{ width: '100%', padding: 10, borderRadius: 6, border: '1px solid #ccc', fontSize: 16 }} />
        </div>
        <div className="formActions" style={{ display: 'flex', gap: 16, justifyContent: 'flex-end' }}>
          <button type="button" className="cancelButton" onClick={onCancel} disabled={isSubmitting} style={{ background: '#888', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 6, padding: '10px 28px', fontSize: 16, cursor: 'pointer' }}>Hủy</button>
          <button type="submit" className="submitButton" disabled={isSubmitting} style={{ background: '#d32f2f', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 6, padding: '10px 28px', fontSize: 16, cursor: 'pointer', opacity: isSubmitting ? 0.6 : 1 }}>
            {isSubmitting ? 'Đang xử lý...' : (event ? 'Cập nhật' : 'Tạo chiến dịch')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EventForm;
