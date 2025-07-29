import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Appointment, Campaign, AppointmentStatus } from '../../../types/appointment';
import '../Appointment/AppointmentManagement.css';
import api from '../../../services/api';

// --- CÁC HÀM HELPER ---

// Ánh xạ trạng thái từ API (PascalCase) sang trạng thái của frontend (lowercase)
const mapApiStatusToLocal = (apiStatus: string): AppointmentStatus => {
  switch (apiStatus) {
    case 'Confirmed': return 'confirmed';
    case 'Cancelled': return 'cancelled';
    case 'Completed': return 'completed';
    case 'NotEligible': return 'unqualified';
    case 'Absent': return 'no-show';
    default: return 'pending';
  }
};

// Ánh xạ trạng thái từ frontend sang trạng thái mà API mong đợi
const mapLocalStatusToApiValue = (localStatus: AppointmentStatus): string => {
  switch (localStatus) {
    case 'confirmed': return 'Confirmed';
    case 'cancelled': return 'Cancelled';
    case 'completed': return 'Completed';
    case 'unqualified': return 'NotEligible';
    case 'no-show': return 'Absent';
    default: return 'Pending';
  }
};

const mapBloodTypeToDisplay = (bloodType: string): string => {
  if (!bloodType || bloodType === 'None') return 'Chưa rõ';
  return bloodType.replace('_POS', '+').replace('_NEG', '-');
};
// =================================================================
// CÁC HÀM API SERVICE (Nên được chuyển vào file service riêng)
// =================================================================

const fetchAllRegistrations = async () => {
  const response = await api.get('/campaign-registrations');
  return response.data;
};

const fetchAllCampaigns = async () => {
  const response = await api.get('/blood-donation-campaigns');
  return response.data;
};

const updateRegistrationStatus = async (id: number, payload: any) => {
  const response = await api.patch(`/campaign-registrations/${id}`, payload);
  return response.data;
}

// =================================================================


const AppointmentManagement: React.FC = () => {
  const [searchParams] = useSearchParams();
  const campaignFromUrl = searchParams.get('campaign');

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCompleteModalOpen, setIsCompleteModalOpen] = useState(false);
  const [volume, setVolume] = useState('');
  const [newBloodType, setNewBloodType] = useState('');

  const [filterDate, setFilterDate] = useState<string>('');
  const [filterCampaign, setFilterCampaign] = useState<string>(campaignFromUrl || '');
  const [filterStatus, setFilterStatus] = useState<AppointmentStatus | ''>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // SỬA LỖI: Tối ưu hóa việc gọi API
      const [apiRegistrations, apiCampaigns] = await Promise.all([
        fetchAllRegistrations(),
        fetchAllCampaigns(),
      ]);

      const processedCampaigns: Campaign[] = apiCampaigns.map((camp: any) => ({
        id: camp.id,
        name: camp.name,
        // ... các trường khác nếu cần
      }));
      setCampaigns(processedCampaigns);

      // SỬA LỖI: Ánh xạ dữ liệu từ cấu trúc DTO của backend
      const processedAppointments: Appointment[] = apiRegistrations.map((reg: any) => ({
        id: reg.id,
        userId: reg.user.userId,
        campaignId: reg.campaign.campaignId,
        displayId: `HD-${reg.id.toString().padStart(3, '0')}`,
        donorName: reg.user.userName,
        phoneNumber: reg.user.phone,
        email: reg.user.email || 'Không có',
        campaignName: reg.campaign.campaignName,
        appointmentDate: reg.campaign.campaignDate,
        appointmentTime: 'N/A', // Cần logic để parse từ donateTime
        location: reg.campaign.address,
        status: mapApiStatusToLocal(reg.status),
        registrationDate: reg.registeredAt,
        notes: reg.note || '',
        donorBloodType: reg.user.bloodType || 'None',
        donationType: reg.productType || 'Toàn phần',

      }));
      setAppointments(processedAppointments);

    } catch (err: any) {
      setError(err.message || 'Đã có lỗi xảy ra.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const filteredAppointments = useMemo(() => {
    let filtered = appointments;

    if (filterDate) {
      const selectedDate = new Date(filterDate).setHours(0, 0, 0, 0);
      filtered = filtered.filter(app => new Date(app.appointmentDate).setHours(0, 0, 0, 0) === selectedDate);
    }
    if (filterCampaign) {
      filtered = filtered.filter(app => app.campaignName === filterCampaign);
    }
    if (filterStatus) {
      filtered = filtered.filter(app => app.status === filterStatus);
    }
    if (searchKeyword) {
      const lowercasedKeyword = searchKeyword.toLowerCase();
      filtered = filtered.filter(app =>
        app.donorName.toLowerCase().includes(lowercasedKeyword) ||
        app.phoneNumber.includes(lowercasedKeyword) ||
        app.displayId.toLowerCase().includes(lowercasedKeyword)
      );
    }
    return filtered;
  }, [appointments, filterDate, filterCampaign, filterStatus, searchKeyword]);

  const handleViewDetails = (appointment: Appointment) => {
    setSelectedAppointment(appointment);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedAppointment(null);
  };

  const handleUpdateStatus = async (appointmentId: number, data: Record<string, any>) => {
    const apiStatus = mapLocalStatusToApiValue(data.status);
    const payload = { ...data, status: apiStatus };

    console.log(`Đang gửi yêu cầu PATCH đến /campaign-registrations/${appointmentId} với payload:`, payload);

    try {
      // SỬA LỖI: Sử dụng hàm service đã được đồng bộ
      await updateRegistrationStatus(appointmentId, payload);
      alert('Cập nhật trạng thái thành công!');
      handleCloseModal();
      fetchData();
    } catch (err: any) {
      alert(`Lỗi: ${err.message}`);
    }
  };

  const renderCompleteDonationModal = () => {
    if (!isCompleteModalOpen || !selectedAppointment) return null;

    const isBloodTypeRequired = !selectedAppointment.donorBloodType || selectedAppointment.donorBloodType === 'None';

    const handleConfirmCompletion = () => {
      if (!volume || parseInt(volume) < 100) {
        alert('Vui lòng nhập lượng máu hợp lệ (tối thiểu 100ml).');
        return;
      }
      if (isBloodTypeRequired && !newBloodType) {
        alert('Vui lòng chọn nhóm máu cho người hiến.');
        return;
      }

      const completionData: Record<string, any> = {
        status: 'completed',
        volume: parseInt(volume),
        note: 'Đã hiến máu thành công.',
      };

      if (isBloodTypeRequired) {
        completionData.bloodType = newBloodType;
      }

      handleUpdateStatus(selectedAppointment.id, completionData);
      setIsCompleteModalOpen(false);
    };

    return (
      <div className="modal-overlay">
        <div className="modal-content-b">
          <h2>Xác nhận Hoàn thành Hiến máu</h2>
          <div className="form-group">
            <label htmlFor="volume">Lượng máu đã hiến (ml):</label>
            <input type="number" id="volume" value={volume} onChange={(e) => setVolume(e.target.value)} placeholder="Ví dụ: 350" min="100" />
          </div>
          {isBloodTypeRequired && (
            <div className="form-group">
              <label htmlFor="bloodType">Nhóm máu:</label>
              <select id="bloodType" value={newBloodType} onChange={(e) => setNewBloodType(e.target.value)}>
                <option value="">-- Chọn nhóm máu --</option>
                <option value="A_POS">A+</option>
                <option value="A_NEG">A-</option>
                <option value="B_POS">B+</option>
                <option value="B_NEG">B-</option>
                <option value="AB_POS">AB+</option>
                <option value="AB_NEG">AB-</option>
                <option value="O_POS">O+</option>
                <option value="O_NEG">O-</option>
              </select>
            </div>
          )}
          <div className="modal-actions">
            <button className="btn-cancel" onClick={() => setIsCompleteModalOpen(false)}>Hủy</button>
            <button className="btn-confirm" onClick={handleConfirmCompletion}>Xác nhận Hoàn thành</button>
          </div>
        </div>
      </div>
    );
  };

  if (loading) return <div className="loading-container"><h2>Đang tải dữ liệu...</h2></div>;
  if (error) return <div className="error-container"><h2>Lỗi: {error}</h2> <button onClick={fetchData}>Thử lại</button></div>;

  const getStatusClassName = (status: AppointmentStatus) => {
    switch (status) {
      case 'pending': return 'status-pending';
      case 'confirmed': return 'status-confirmed';
      case 'cancelled': return 'status-cancelled';
      case 'completed': return 'status-completed';
      case 'unqualified': return 'status-unqualified';
      case 'no-show': return 'status-no-show';
      default: return '';
    }
  };

  const getStatusText = (status: AppointmentStatus) => {
    switch (status) {
      case 'pending': return 'Chờ xác nhận';
      case 'confirmed': return 'Đã xác nhận';
      case 'cancelled': return 'Đã hủy';
      case 'completed': return 'Đã hiến máu';
      case 'unqualified': return 'Không đủ điều kiện';
      case 'no-show': return 'Vắng mặt';
      default: return status;
    }
  }

  const mapDonationTypeToVietnamese = (donationType: string): string => {
    switch (donationType) {
      case 'Plasma':
        return 'Huyết tương';
      case 'Platelets':
        return 'Tiểu cầu';
      case 'RedCells':
        return 'Hồng cầu';
      case 'WholeBlood':
        return 'Máu toàn phần';
      case 'Toàn phần': 
        return 'Máu toàn phần';
      default:
        return donationType; // Trả về giá trị gốc nếu không khớp
    }
  };

  return (
    <div className="appointment-management-container1">
      <div className="filters-section">
        <h2>Quản lý Lịch hẹn Hiến máu</h2>
        <div className="filters-grid">
          <div className="filter-item">
            <label htmlFor="filterDate">Ngày hẹn:</label>
            <input
              type="date"
              id="filterDate"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
          </div>
          <div className="filter-item">
            <label htmlFor="filterCampaign">Chiến dịch:</label>
            <select
              id="filterCampaign"
              value={filterCampaign}
              onChange={(e) => setFilterCampaign(e.target.value)}
            >
              <option value="">Tất cả chiến dịch</option>
              {campaigns.map(campaign => (
                <option key={campaign.id} value={campaign.name}>
                  {campaign.name}
                </option>
              ))}
            </select>
          </div>
          <div className="filter-item">
            <label htmlFor="filterStatus">Trạng thái:</label>
            <select
              id="filterStatus"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as AppointmentStatus | '')}
            >
              <option value="">Tất cả trạng thái</option>
              <option value="pending">Chờ xác nhận</option>
              <option value="confirmed">Đã xác nhận</option>
              <option value="cancelled">Đã hủy</option>
              <option value="completed">Đã hiến máu</option>
              <option value="unqualified">Không đủ điều kiện</option>
              <option value="no-show">Vắng mặt</option>
            </select>
          </div>
          <div className="filter-item search-item">
            <label htmlFor="searchKeyword">Tìm kiếm:</label>
            <input
              type="text"
              id="searchKeyword"
              placeholder="Tên, SĐT, Mã hẹn..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
          </div>
        </div>
        <button className="clear-filters-btn" onClick={() => {
          setFilterDate('');
          setFilterCampaign('');
          setFilterStatus('');
          setSearchKeyword('');
        }}>Xóa bộ lọc</button>
      </div>

      <div className="appointments-table-section">
        <h2>Danh sách Lịch hẹn</h2>
        {filteredAppointments.length === 0 ? (
          <p className="no-data-message">Không có lịch hẹn nào phù hợp.</p>
        ) : (
          <div className="table-responsive">
            <table>
              <thead>
                <tr>
                  <th>Mã hẹn</th>
                  <th>Tên người hiến</th>
                  <th>SĐT</th>
                  <th>Chiến dịch</th>
                  <th>Ngày hẹn</th>
                  <th>Địa điểm</th>
                  <th>Trạng thái</th>
                  <th>Ngày đăng ký</th>
                  <th>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {filteredAppointments.map(app => (
                  <tr key={app.id}>
                    <td>{app.displayId}</td>
                    <td>{app.donorName}</td>
                    <td>{app.phoneNumber}</td>
                    <td>{app.campaignName}</td>
                    <td>{new Date(app.appointmentDate).toLocaleDateString('vi-VN')}</td>
                    <td>{app.location}</td>
                    <td>
                      <span className={`status-badge ${getStatusClassName(app.status)}`}>
                        {getStatusText(app.status)}
                      </span>
                    </td>
                    <td>{new Date(app.registrationDate).toLocaleDateString('vi-VN')}</td>
                    <td>
                      <button className="btn-view" onClick={() => handleViewDetails(app)}>Chi tiết</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {isModalOpen && selectedAppointment && (
        <div className="modal-overlay">
          <div className="modal-content-a">
            <span className="close-button" onClick={handleCloseModal}>&times;</span>
            <h2>Chi tiết Lịch hẹn</h2>
            <div className="appointment-details">
              <p><strong>Mã hẹn:</strong> {selectedAppointment.displayId}</p>
              <p><strong>Tên người hiến:</strong> {selectedAppointment.donorName}</p>
              <p><strong>Số điện thoại:</strong> {selectedAppointment.phoneNumber}</p>
              <p><strong>Email:</strong> {selectedAppointment.email}</p>
              <p><strong>Nhóm máu:</strong> {mapBloodTypeToDisplay(selectedAppointment.donorBloodType)}</p>
              <p><strong>Thành phần hiến:</strong> {mapDonationTypeToVietnamese(selectedAppointment.donationType)}</p>
              <p><strong>Chiến dịch:</strong> {selectedAppointment.campaignName}</p>
              <p><strong>Ngày hẹn:</strong> {new Date(selectedAppointment.appointmentDate).toLocaleDateString('vi-VN')}</p>
              <p><strong>Giờ hẹn:</strong> {selectedAppointment.appointmentTime}</p>
              <p><strong>Địa điểm:</strong> {selectedAppointment.location}</p>
              <p><strong>Trạng thái:</strong> <span className={`status-badge ${getStatusClassName(selectedAppointment.status)}`}>{getStatusText(selectedAppointment.status)}</span></p>
              <p><strong>Ngày đăng ký:</strong> {new Date(selectedAppointment.registrationDate).toLocaleString('vi-VN')}</p>
              <p><strong>Ghi chú:</strong> {selectedAppointment.notes || 'Không có'}</p>
            </div>

            <div className="modal-actions">
              {selectedAppointment.status === 'pending' && (
                <button className="btn-confirm" onClick={() => handleUpdateStatus(selectedAppointment.id, { status: 'confirmed', note: 'Admin đã xác nhận lịch hẹn.' })}>
                  Xác nhận
                </button>
              )}
              {!['cancelled', 'completed'].includes(selectedAppointment.status) && (
                <>
                  <button className="btn-cancel" onClick={() => {
                    const reason = prompt('Nhập lý do hủy (nếu có):');
                    if (reason !== null) {
                      handleUpdateStatus(selectedAppointment.id, { status: 'cancelled', note: reason || 'Admin hủy lịch hẹn.' });
                    }
                  }}>Hủy</button>
                  <button className="btn-complete" onClick={() => setIsCompleteModalOpen(true)}>
                    Đã hiến máu
                  </button>
                  <button className="btn-unqualified" onClick={() => {
                    const reason = prompt('Nhập lý do không đủ điều kiện:');
                    if (reason !== null) {
                      handleUpdateStatus(selectedAppointment.id, { status: 'unqualified', note: reason || 'Không đủ điều kiện sức khỏe.' });
                    }
                  }}>Không đủ ĐK</button>
                  <button className="btn-no-show" onClick={() => {
                    const reason = prompt('Nhập lý do vắng mặt (nếu có):');
                    if (reason !== null) {
                      handleUpdateStatus(selectedAppointment.id, { status: 'no-show', note: reason || 'Người dùng vắng mặt không lý do.' });
                    }
                  }}>Vắng mặt</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {renderCompleteDonationModal()}
    </div>
  );
};

export default AppointmentManagement;
