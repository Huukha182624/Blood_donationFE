// src/components/donor/DonorTable.tsx
import React from 'react';
import { type IDonor } from '../../../types/donor';
import './DonorTable.css'; // Import file CSS

interface DonorTableProps {
  donors: IDonor[];
  onViewDetails: (donor: IDonor) => void;
  onEdit: (donor: IDonor) => void;
  onDelete: (donorId: string) => void;
}

const DonorTable: React.FC<DonorTableProps> = ({ donors, onViewDetails, onEdit, onDelete }) => {
  return (
    <div className="donor-table-container"> {/* Thay đổi class Tailwind sang class CSS thuần */}
      <table className="donor-table">
        <thead>
          <tr>
            <th>Họ và Tên</th>
            <th>Nhóm Máu</th>
            <th>SĐT</th>
            <th>Lần hiến gần nhất</th>
            <th>Tổng số lần</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {donors.length > 0 ? (
            donors.map((donor) => (
              <tr key={donor.id}>
                <td><p>{donor.name}</p></td>
                <td><p>{donor.bloodGroup}</p></td>
                <td><p>{donor.phone}</p></td>
                <td><p>{donor.lastDonationDate || 'N/A'}</p></td>
                <td><p>{donor.totalDonations}</p></td>
                <td className="actions"> {/* Thêm class cho các nút hành động */}
                  <button onClick={() => onViewDetails(donor)} className="btn-view">
                    Xem
                  </button>
                  <button onClick={() => onEdit(donor)} className="btn-edit">
                    Sửa
                  </button>
                  <button onClick={() => onDelete(donor.id)} className="btn-delete">
                    Xóa
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6} className="no-data-message">
                Không có dữ liệu người hiến máu.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DonorTable;