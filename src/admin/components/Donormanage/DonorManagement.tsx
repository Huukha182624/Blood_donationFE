// src/pages/DonorManagement/index.tsx
import React, { useState, useEffect } from 'react';
import DonorTable from './DonorTable';
import { type IDonor } from '../../../types/donor';
import './DonorManagement.css';


const DonorManagementPage: React.FC = () => {
  const [donors, setDonors] = useState<IDonor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDonors = async () => {
    setLoading(true);
    setError(null);
    try {
      const dummyData: IDonor[] = [
        { id: '1', name: 'Nguyễn Văn A', dob: '1990-01-15', gender: 'Nam', bloodGroup: 'O+', phone: '0901234567', totalDonations: 5, lastDonationDate: '2024-03-10', donationHistory: [{ date: '2024-03-10', volume: 350, location: 'BV Chợ Rẫy' }] },
        { id: '2', name: 'Trần Thị B', dob: '1992-07-22', gender: 'Nữ', bloodGroup: 'A-', phone: '0912345678', totalDonations: 2, lastDonationDate: '2023-11-01', donationHistory: [{ date: '2023-11-01', volume: 250, location: 'TT Huyết học' }] },
        { id: '3', name: 'Lê Văn C', dob: '1985-03-01', gender: 'Nam', bloodGroup: 'AB+', phone: '0987654321', totalDonations: 10, lastDonationDate: '2024-05-20', donationHistory: [{ date: '2024-05-20', volume: 450, location: 'BV Truyền máu Huyết học' }] },
        { id: '4', name: 'Phạm Thu Hằng', dob: '1995-09-08', gender: 'Nữ', bloodGroup: 'B+', phone: '0909876543', totalDonations: 3, lastDonationDate: '2024-04-05', donationHistory: [{ date: '2024-04-05', volume: 300, location: 'Bệnh viện 115' }] },
        { id: '5', name: 'Hoàng Quốc Việt', dob: '1988-04-25', gender: 'Nam', bloodGroup: 'O-', phone: '0978112233', totalDonations: 7, lastDonationDate: '2024-02-18', donationHistory: [{ date: '2024-02-18', volume: 400, location: 'Viện Pasteur' }] },
        { id: '6', name: 'Đỗ Thị Minh', dob: '2000-11-30', gender: 'Nữ', bloodGroup: 'AB-', phone: '0919223344', totalDonations: 1, lastDonationDate: '2024-06-01', donationHistory: [{ date: '2024-06-01', volume: 250, location: 'Trung tâm hiến máu Q.1' }] },
        { id: '7', name: 'Võ Minh Quân', dob: '1979-06-12', gender: 'Nam', bloodGroup: 'A+', phone: '0934567890', totalDonations: 15, lastDonationDate: '2024-05-15', donationHistory: [{ date: '2024-05-15', volume: 450, location: 'Bệnh viện Y Dược' }] },
        { id: '8', name: 'Ngô Ngọc Ánh', dob: '1993-02-10', gender: 'Nữ', bloodGroup: 'O+', phone: '0965432109', totalDonations: 4, lastDonationDate: '2023-12-25', donationHistory: [{ date: '2023-12-25', volume: 350, location: 'Trạm Y tế P.3' }] },
        { id: '9', name: 'Đặng Tuấn Kiệt', dob: '1982-08-03', gender: 'Nam', bloodGroup: 'B-', phone: '0987123456', totalDonations: 8, lastDonationDate: '2024-01-30', donationHistory: [{ date: '2024-01-30', volume: 400, location: 'Bệnh viện FV' }] },
        { id: '10', name: 'Bùi Thanh Trúc', dob: '1998-01-20', gender: 'Nữ', bloodGroup: 'A-', phone: '0903987654', totalDonations: 2, lastDonationDate: '2024-03-01', donationHistory: [{ date: '2024-03-01', volume: 250, location: 'Trung tâm Chữ thập đỏ' }] },
        { id: '11', name: 'Trần Văn Đạt', dob: '1991-05-05', gender: 'Nam', bloodGroup: 'AB+', phone: '0917654321', totalDonations: 6, lastDonationDate: '2024-04-22', donationHistory: [{ date: '2024-04-22', volume: 350, location: 'Bệnh viện Quận 7' }] },
        { id: '12', name: 'Lê Thùy Dung', dob: '1997-10-17', gender: 'Nữ', bloodGroup: 'O+', phone: '0908123456', totalDonations: 3, lastDonationDate: '2024-05-12', donationHistory: [{ date: '2024-05-12', volume: 300, location: 'Trường Đại học Bách Khoa' }] },
        { id: '13', name: 'Nguyễn Quang Huy', dob: '1980-12-01', gender: 'Nam', bloodGroup: 'A+', phone: '0902345678', totalDonations: 12, lastDonationDate: '2024-06-05', donationHistory: [{ date: '2024-06-05', volume: 450, location: 'Trung tâm hiến máu Q.Tân Bình' }] },
      ];
      setDonors(dummyData);
    } catch (err) {
      console.error("Lỗi khi tải dữ liệu người hiến máu:", err);
      setError("Không thể tải dữ liệu người hiến máu. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDonors();
  }, []);

  const handleViewDetails = (donor: IDonor) => { console.log('Xem chi tiết người hiến máu:', donor); };
  const handleEditDonor = (donor: IDonor) => { console.log('Sửa người hiến máu:', donor); };
  const handleDeleteDonor = (donorId: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa người hiến máu này không?')) {
      console.log('Xóa người hiến máu với ID:', donorId);
      setDonors(donors.filter(donor => donor.id !== donorId));
    }
  };

  return (
    <div className="admin-layout"> {/* Áp dụng layout tổng thể */}

      <div className="main-content-donor">

        <div className="donor-management-page">
          <div className="page-header">
            <h2>Danh sách Người Hiến Máu</h2>
            <button className="add-button-dm">Thêm Người Hiến Máu</button>
          </div>

          <div className="search-filter-section">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên, SĐT, Email..."
              className="search-input"
            />
          </div>

          {loading && (<div className="loading-message">Đang tải dữ liệu...</div>)}
          {error && (<div className="error-message">Lỗi: {error}</div>)}
          {!loading && !error && (
            <DonorTable
              donors={donors}
              onViewDetails={handleViewDetails}
              onEdit={handleEditDonor}
              onDelete={handleDeleteDonor}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorManagementPage;