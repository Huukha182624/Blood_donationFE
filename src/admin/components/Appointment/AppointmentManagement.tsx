import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import type { Appointment, Campaign, AppointmentStatus } from '../../../types/appointment';
import '../Appointment/AppointmentManagement.css';

const API_BASE_URL = 'http://localhost:3123';

const mapApiStatusToLocal = (apiStatus: string): AppointmentStatus => {
  switch (apiStatus) {
    case 'Đã xác nhận': return 'confirmed';
    case 'Đã hủy': return 'cancelled';
    case 'Đã hiến máu': return 'completed';
    case 'Không đủ điều kiện': return 'unqualified';
    case 'Vắng mặt': return 'no-show';
    case 'Chờ xác nhận':
    default:
      return 'pending';
  }
};

const mapLocalStatusToApi = (localStatus: AppointmentStatus): string => {
  switch (localStatus) {
    case 'confirmed': return 'Đã xác nhận';
    case 'cancelled': return 'Đã hủy';
    case 'completed': return 'Đã hiến máu';
    case 'unqualified': return 'Không đủ điều kiện';
    case 'no-show': return 'Vắng mặt';
    case 'pending':
    default:
      return 'Chờ xác nhận';
  }
}


const AppointmentManagement: React.FC = () => {
  const [searchParams] = useSearchParams();
  const campaignFromUrl = searchParams.get('campaign');

  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  // Filter states
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterCampaign, setFilterCampaign] = useState<string>(campaignFromUrl || '');
  const [filterStatus, setFilterStatus] = useState<AppointmentStatus | ''>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [registrationsRes, campaignsRes, usersRes] = await Promise.all([
        fetch(`${API_BASE_URL}/campaign-registration`),
        fetch(`${API_BASE_URL}/blood-donation-campaign/search`),
        fetch(`${API_BASE_URL}/user`),
      ]);

      if (!registrationsRes.ok || !campaignsRes.ok || !usersRes.ok) {
        throw new Error('Không thể tải dữ liệu từ máy chủ.');
      }

      const apiRegistrations = await registrationsRes.json();
      const apiCampaigns = await campaignsRes.json();
      const apiUsers = await usersRes.json();

      // Xử lý và tạo map cho các chiến dịch (giữ nguyên)
      const campaignsMap = new Map<number, any>();
      const processedCampaigns: Campaign[] = apiCampaigns.map((camp: any) => {
        campaignsMap.set(camp.id, camp);
        return {
          id: camp.id,
          name: camp.name,
          startDate: camp.activeTime,
          endDate: camp.activeTime,
          location: camp.address,
          donateTime: camp.donateTime,
        };
      });
      setCampaigns(processedCampaigns);

      const usersMap = new Map<number, any>();
      apiUsers.forEach((user: any) => {
        usersMap.set(user.user_id, user);
      });

      // Xử lý dữ liệu đăng ký và kết hợp với thông tin chiến dịch VÀ người dùng
      const processedAppointments: Appointment[] = apiRegistrations.map((reg: any) => {
        const campaignDetails = campaignsMap.get(reg.campaignId);
        // 3. TRA CỨU THÔNG TIN NGƯỜI DÙNG TỪ MAP
        const userDetails = usersMap.get(reg.userId);

        return {
          id: reg.id,
          displayId: `HD-${reg.id.toString().padStart(3, '0')}`,
          donorName: reg.userName,
          phoneNumber: reg.phone,
          email: userDetails?.email || 'Không tìm thấy',
          campaignName: reg.campaignName,
          appointmentDate: reg.campaignDate,
          appointmentTime: campaignDetails?.donateTime?.start || 'N/A',
          location: reg.address,
          status: mapApiStatusToLocal(reg.status),
          registrationDate: reg.registeredAt,
          notes: reg.note || '',
        };
      });
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
      filtered = filtered.filter(app => app.appointmentDate === filterDate);
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

  // File: src/pages/AppointmentManagement.tsx

  const handleUpdateStatus = async (
    id: number,
    newStatus: AppointmentStatus,
    notes?: string
  ) => {

    const currentAppointment = appointments.find(app => app.id === id);
    if (!currentAppointment) {
      console.error("Không tìm thấy cuộc hẹn để cập nhật!");
      return;
    }

    const payload = {
      status: mapLocalStatusToApi(newStatus),
      note: notes !== undefined ? notes : currentAppointment.notes,
    };

    const url = `${API_BASE_URL}/campaign-registration/${id}/status`;

    console.log(`Đang gửi yêu cầu PUT đến ${url}`);
    console.log("Payload:", payload);

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${your_auth_token}`
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Cập nhật trạng thái thất bại.');
      }

      const updatedData = await response.json();
      console.log('Cập nhật thành công:', updatedData);

      handleCloseModal();
      fetchData();

    } catch (err: any) {
      alert(`Lỗi: ${err.message}`);
      console.error("Lỗi khi cập nhật trạng thái:", err);
    }
  };


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

  // --- RENDER ---
  if (loading) {
    return <div className="loading-container"><h2>Đang tải dữ liệu...</h2></div>;
  }

  if (error) {
    return <div className="error-container"><h2>Lỗi: {error}</h2> <button onClick={fetchData}>Thử lại</button></div>;
  }

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
                  <th>Giờ hẹn</th>
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
                    <td>{app.appointmentTime}</td>
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
                <button className="btn-confirm" onClick={() => handleUpdateStatus(selectedAppointment.id, 'confirmed')}>Xác nhận</button>
              )}
              {!['cancelled', 'completed'].includes(selectedAppointment.status) && (
                <>
                  <button className="btn-cancel" onClick={() => {
                    const reason = prompt('Nhập lý do hủy (nếu có):');
                    handleUpdateStatus(selectedAppointment.id, 'cancelled', reason || 'Admin hủy');
                  }}>Hủy</button>
                  <button className="btn-complete" onClick={() => handleUpdateStatus(selectedAppointment.id, 'completed', 'Đã hiến máu thành công')}>Đã hiến máu</button>
                  <button className="btn-unqualified" onClick={() => {
                    const reason = prompt('Nhập lý do không đủ điều kiện:');
                    handleUpdateStatus(selectedAppointment.id, 'unqualified', reason || 'Không đủ điều kiện');
                  }}>Không đủ ĐK</button>
                  <button className="btn-no-show" onClick={() => {
                    const reason = prompt('Nhập lý do vắng mặt (nếu có):');
                    handleUpdateStatus(selectedAppointment.id, 'no-show', reason || 'Người dùng vắng mặt');
                  }}>Vắng mặt</button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;