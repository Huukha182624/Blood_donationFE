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
    {
        id: '1',
        name: 'Nguyễn Thanh Tùng',
        dob: '1990-03-25',
        gender: 'Nam',
        bloodGroup: 'O+',
        phone: '0901123456',
        totalDonations: 8,
        lastDonationDate: '2025-05-28',
        donationHistory: [
            { date: '2025-05-28', volume: 350, location: 'BV Chợ Rẫy' },
            { date: '2024-12-10', volume: 350, location: 'Trạm Y tế P.1' },
        ],
    },
    {
        id: '2',
        name: 'Phạm Thị Lan',
        dob: '1992-09-10',
        gender: 'Nữ',
        bloodGroup: 'A-',
        phone: '0912987654',
        totalDonations: 3,
        lastDonationDate: '2025-06-12',
        donationHistory: [
            { date: '2025-06-12', volume: 250, location: 'TT Huyết học' },
            { date: '2024-11-05', volume: 250, location: 'ĐH Y Dược TPHCM' },
        ],
    },
    {
        id: '3',
        name: 'Đặng Minh Khôi',
        dob: '1985-07-01',
        gender: 'Nam',
        bloodGroup: 'B+',
        phone: '0987112233',
        totalDonations: 12,
        lastDonationDate: '2025-06-01',
        donationHistory: [
            { date: '2025-06-01', volume: 450, location: 'BV Truyền máu Huyết học' },
            { date: '2024-12-15', volume: 450, location: 'Bệnh viện Thống Nhất' },
        ],
    },
    {
        id: '4',
        name: 'Trần Thanh Mai',
        dob: '1995-02-18',
        gender: 'Nữ',
        bloodGroup: 'AB+',
        phone: '0903445566',
        totalDonations: 4,
        lastDonationDate: '2025-04-20',
        donationHistory: [
            { date: '2025-04-20', volume: 300, location: 'Bệnh viện 115' },
            { date: '2024-10-01', volume: 300, location: 'Trạm Y tế P.5' },
        ],
    },
    {
        id: '5',
        name: 'Lê Hoàng Anh',
        dob: '1988-11-05',
        gender: 'Nam',
        bloodGroup: 'O-',
        phone: '0978998877',
        totalDonations: 9,
        lastDonationDate: '2025-05-03',
        donationHistory: [
            { date: '2025-05-03', volume: 400, location: 'Viện Pasteur TPHCM' },
            { date: '2024-11-20', volume: 400, location: 'BV Đa khoa Sài Gòn' },
        ],
    },
    {
        id: '6',
        name: 'Ngô Thị Kim',
        dob: '2000-01-01',
        gender: 'Nữ',
        bloodGroup: 'A+',
        phone: '0919123123',
        totalDonations: 2,
        lastDonationDate: '2025-03-15',
        donationHistory: [
            { date: '2025-03-15', volume: 250, location: 'Trung tâm hiến máu Q.1' },
        ],
    },
    {
        id: '7',
        name: 'Vũ Duy Khánh',
        dob: '1979-08-20',
        gender: 'Nam',
        bloodGroup: 'B-',
        phone: '0934112233',
        totalDonations: 18,
        lastDonationDate: '2025-06-10',
        donationHistory: [
            { date: '2025-06-10', volume: 450, location: 'Bệnh viện Y Dược TPHCM' },
            { date: '2024-12-25', volume: 450, location: 'Đại học Sư phạm Kỹ thuật' },
        ],
    },
    {
        id: '8',
        name: 'Nguyễn Thị Hương',
        dob: '1993-04-02',
        gender: 'Nữ',
        bloodGroup: 'O+',
        phone: '0965778899',
        totalDonations: 6,
        lastDonationDate: '2025-05-19',
        donationHistory: [
            { date: '2025-05-19', volume: 350, location: 'Trạm Y tế P.10' },
            { date: '2024-11-11', volume: 350, location: 'Học viện Hàng không Việt Nam' },
        ],
    },
    {
        id: '9',
        name: 'Hoàng Quốc Dũng',
        dob: '1982-10-14',
        gender: 'Nam',
        bloodGroup: 'A+',
        phone: '0987556644',
        totalDonations: 11,
        lastDonationDate: '2025-06-08',
        donationHistory: [
            { date: '2025-06-08', volume: 400, location: 'Bệnh viện FV' },
            { date: '2024-12-01', volume: 400, location: 'Trung tâm Hiến máu Tình nguyện Q.3' },
        ],
    },
    {
        id: '10',
        name: 'Bùi Thanh Thảo',
        dob: '1998-06-20',
        gender: 'Nữ',
        bloodGroup: 'AB-',
        phone: '0903112233',
        totalDonations: 1,
        lastDonationDate: '2025-06-14',
        donationHistory: [
            { date: '2025-06-14', volume: 250, location: 'Trung tâm Chữ thập đỏ TPHCM' },
        ],
    },
    {
        id: '11',
        name: 'Trần Văn Mạnh',
        dob: '1991-01-30',
        gender: 'Nam',
        bloodGroup: 'O+',
        phone: '0917223344',
        totalDonations: 7,
        lastDonationDate: '2025-04-01',
        donationHistory: [
            { date: '2025-04-01', volume: 350, location: 'Bệnh viện Quận 7' },
            { date: '2024-10-15', volume: 350, location: 'Cao đẳng Kinh tế đối ngoại' },
        ],
    },
    {
        id: '12',
        name: 'Lê Thị Diệu',
        dob: '1997-05-12',
        gender: 'Nữ',
        bloodGroup: 'B+',
        phone: '0908556677',
        totalDonations: 3,
        lastDonationDate: '2025-06-09',
        donationHistory: [
            { date: '2025-06-09', volume: 300, location: 'Trường Đại học Bách Khoa TPHCM' },
        ],
    },
    {
        id: '13',
        name: 'Võ Minh Nhật',
        dob: '1980-03-08',
        gender: 'Nam',
        bloodGroup: 'A-',
        phone: '0902998877',
        totalDonations: 14,
        lastDonationDate: '2025-06-13',
        donationHistory: [
            { date: '2025-06-13', volume: 450, location: 'Trung tâm hiến máu Q.Tân Bình' },
            { date: '2024-11-29', volume: 450, location: 'ĐH Sài Gòn' },
        ],
    },
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