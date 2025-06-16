// src/pages/AppointmentManagement.tsx
import React, { useState, useEffect, useMemo } from 'react';
import type { Appointment, Campaign, AppointmentStatus } from '../../../types/appointment';
import '../Appointment/AppointmentManagement.css';

const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: 'HD20250609-001',
    donorName: 'Nguyễn Văn A',
    phoneNumber: '0901234567',
    email: 'nva@example.com',
    campaignName: 'Hiến máu Tình nguyện ĐH Bách Khoa',
    appointmentDate: '2025-06-15',
    appointmentTime: '09:00',
    location: 'Cơ sở 1, ĐH Bách Khoa TP.HCM',
    status: 'pending',
    registrationDate: '2025-06-09T10:00:00Z',
    notes: ''
  },
  {
    id: 'HD20250609-002',
    donorName: 'Trần Thị B',
    phoneNumber: '0902345678',
    email: 'ttb@example.com',
    campaignName: 'Hiến máu Chữ thập đỏ Quận 1',
    appointmentDate: '2025-06-12',
    appointmentTime: '14:00',
    location: 'Trung tâm Y tế Quận 1',
    status: 'confirmed',
    registrationDate: '2025-06-08T15:30:00Z',
    notes: 'Đã gọi điện xác nhận, người hiến máu rất nhiệt tình.'
  },
  {
    id: 'HD20250609-003',
    donorName: 'Lê Văn C',
    phoneNumber: '0903456789',
    email: 'lvc@example.com',
    campaignName: 'Hiến máu Tình nguyện ĐH Bách Khoa',
    appointmentDate: '2025-06-15',
    appointmentTime: '10:00',
    location: 'Cơ sở 1, ĐH Bách Khoa TP.HCM',
    status: 'cancelled',
    registrationDate: '2025-06-07T08:00:00Z',
    notes: 'Người hiến máu báo bị ốm đột xuất, không thể tham gia.'
  },
  {
    id: 'HD20250609-004',
    donorName: 'Phạm Thị D',
    phoneNumber: '0904567890',
    email: 'ptd@example.com',
    campaignName: 'Hiến máu Bệnh viện Truyền máu Huyết học',
    appointmentDate: '2025-06-10',
    appointmentTime: '08:30',
    location: 'Bệnh viện Truyền máu Huyết học TP.HCM',
    status: 'completed',
    registrationDate: '2025-06-05T11:45:00Z',
    notes: 'Đã hiến 350ml máu, sức khỏe tốt.'
  },
  {
    id: 'HD20250609-005',
    donorName: 'Nguyễn Văn E',
    phoneNumber: '0905678901',
    email: 'nve@example.com',
    campaignName: 'Hiến máu Tình nguyện ĐH Bách Khoa',
    appointmentDate: '2025-06-15',
    appointmentTime: '09:00',
    location: 'Cơ sở 1, ĐH Bách Khoa TP.HCM',
    status: 'no-show',
    registrationDate: '2025-06-09T11:00:00Z',
    notes: 'Không đến theo lịch hẹn.'
  },
  {
    id: 'HD20250609-006',
    donorName: 'Hoàng Văn F',
    phoneNumber: '0906789012',
    email: 'hvf@example.com',
    campaignName: 'Hiến máu Tình nguyện ĐH Bách Khoa',
    appointmentDate: '2025-06-15',
    appointmentTime: '09:00',
    location: 'Cơ sở 1, ĐH Bách Khoa TP.HCM',
    status: 'unqualified',
    registrationDate: '2025-06-09T12:00:00Z',
    notes: 'Không đủ cân nặng.'
  },
  {
    id: 'HD20250609-007',
    donorName: 'Hoàng Trung Lưu',
    phoneNumber: '0906789012',
    email: 'hvf@example.com',
    campaignName: 'Hiến máu Tình nguyện ĐH Bách Khoa',
    appointmentDate: '2025-06-20',
    appointmentTime: '09:00',
    location: 'Cơ sở 1, ĐH Bách Khoa TP.HCM',
    status: 'confirmed',
    registrationDate: '2025-06-09T12:00:00Z',
    notes: 'Đã gọi điện xác nhận, người hiến máu rất nhiệt tình.'
  }
];

const MOCK_CAMPAIGNS: Campaign[] = [
  {
    id: 'BK_HM_2025',
    name: 'Hiến máu Tình nguyện ĐH Bách Khoa',
    startDate: '2025-06-15',
    endDate: '2025-06-15',
    location: 'Cơ sở 1, ĐH Bách Khoa TP.HCM',
    availableTimeSlots: ['08:00-09:00', '09:00-10:00', '10:00-11:00']
  },
  {
    id: 'CTD_Q1_2025',
    name: 'Hiến máu Chữ thập đỏ Quận 1',
    startDate: '2025-06-12',
    endDate: '2025-06-12',
    location: 'Trung tâm Y tế Quận 1',
    availableTimeSlots: ['13:00-14:00', '14:00-15:00']
  },
  {
    id: 'BV_TMHH_2025',
    name: 'Hiến máu Bệnh viện Truyền máu Huyết học',
    startDate: '2025-06-10',
    endDate: '2025-06-30',
    location: 'Bệnh viện Truyền máu Huyết học TP.HCM',
    availableTimeSlots: ['08:00-08:30', '08:30-09:00', '09:00-09:30']
  }
];

const AppointmentManagement: React.FC = () => {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filter states
  const [filterDate, setFilterDate] = useState<string>('');
  const [filterCampaign, setFilterCampaign] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<AppointmentStatus | ''>('');
  const [searchKeyword, setSearchKeyword] = useState<string>('');

  useEffect(() => {
    // Simulate fetching data from an API
    setAppointments(MOCK_APPOINTMENTS);
    setCampaigns(MOCK_CAMPAIGNS);
  }, []);

  // Filtered and searched appointments
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
        app.id.toLowerCase().includes(lowercasedKeyword)
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

  const handleUpdateStatus = (
    id: string,
    newStatus: AppointmentStatus,
    notes?: string
  ) => {
    setAppointments(prevApps =>
      prevApps.map(app =>
        app.id === id ? { ...app, status: newStatus, notes: notes || app.notes } : app
      )
    );
    // In a real application, you'd send this update to your backend API
    console.log(`Updated appointment ${id} to status: ${newStatus}`);
    handleCloseModal(); // Close modal after update
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


  return (
    <div className="appointment-management-container1">
      {/* <h1 className="page-title">Quản lý Lịch hẹn Hiến máu</h1> */}

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
                    <td>{app.id}</td>
                    <td>{app.donorName}</td>
                    <td>{app.phoneNumber}</td>
                    <td>{app.campaignName}</td>
                    <td>{app.appointmentDate}</td>
                    <td>{app.appointmentTime}</td>
                    <td>{app.location}</td>
                    <td>
                      <span className={`status-badge ${getStatusClassName(app.status)}`}>
                        {getStatusText(app.status)}
                      </span>
                    </td>
                    <td>{new Date(app.registrationDate).toLocaleDateString()}</td>
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
              <p><strong>Mã hẹn:</strong> {selectedAppointment.id}</p>
              <p><strong>Tên người hiến:</strong> {selectedAppointment.donorName}</p>
              <p><strong>Số điện thoại:</strong> {selectedAppointment.phoneNumber}</p>
              <p><strong>Email:</strong> {selectedAppointment.email}</p>
              <p><strong>Chiến dịch:</strong> {selectedAppointment.campaignName}</p>
              <p><strong>Ngày hẹn:</strong> {selectedAppointment.appointmentDate}</p>
              <p><strong>Giờ hẹn:</strong> {selectedAppointment.appointmentTime}</p>
              <p><strong>Địa điểm:</strong> {selectedAppointment.location}</p>
              <p><strong>Trạng thái:</strong> <span className={`status-badge ${getStatusClassName(selectedAppointment.status)}`}>{getStatusText(selectedAppointment.status)}</span></p>
              <p><strong>Ngày đăng ký:</strong> {new Date(selectedAppointment.registrationDate).toLocaleString()}</p>
              <p><strong>Ghi chú:</strong> {selectedAppointment.notes || 'Không có'}</p>
            </div>
            <div className="modal-actions">
              {selectedAppointment.status === 'pending' && (
                <button className="btn-confirm" onClick={() => handleUpdateStatus(selectedAppointment.id, 'confirmed')}>Xác nhận</button>
              )}
              {selectedAppointment.status !== 'cancelled' && selectedAppointment.status !== 'completed' && (
                <>
                  <button className="btn-cancel" onClick={() => {
                    const reason = prompt('Nhập lý do hủy (nếu có):');
                    handleUpdateStatus(selectedAppointment.id, 'cancelled', reason || 'Admin hủy');
                  }}>Hủy</button>
                  <button className="btn-complete" onClick={() => handleUpdateStatus(selectedAppointment.id, 'completed')}>Đã hiến máu</button>
                  <button className="btn-unqualified" onClick={() => {
                    const reason = prompt('Nhập lý do không đủ điều kiện:');
                    handleUpdateStatus(selectedAppointment.id, 'unqualified', reason || 'Không đủ điều kiện');
                  }}>Không đủ ĐK</button>
                  <button className="btn-no-show" onClick={() => {
                    const reason = prompt('Nhập lý do vắng mặt (nếu có):'); // Thêm dòng này
                    handleUpdateStatus(selectedAppointment.id, 'no-show', reason || 'Người dùng vắng mặt'); // Điều chỉnh dòng này
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