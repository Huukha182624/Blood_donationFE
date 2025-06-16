// src/types.ts

export interface BloodUnit {
  id: string; // Mã đơn vị máu
  bloodGroup: string; // Nhóm máu (e.g., 'A+', 'O-')
  componentType: string; // Loại thành phần (e.g., 'Hồng cầu lắng', 'Huyết tương')
  collectionDate: string; // Ngày thu thập (ISO string or 'YYYY-MM-DD')
  expiryDate: string; // Ngày hết hạn (ISO string or 'YYYY-MM-DD')
  status: 'available' | 'issued' | 'cancelled' | 'pending_qa'; // Trạng thái
  storageLocation: string; // Vị trí lưu trữ (e.g., 'Kệ A-01, Ngăn 3')
  qaStatus: 'passed' | 'pending' | 'failed'; // Trạng thái kiểm định
}

// Props cho InfoCard
export interface InfoCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode; // Icon hoặc biểu tượng
  color?: string; // Màu sắc cho thẻ
  onClick?: () => void;
}

// Props cho BloodDetailsTabFilters
export interface BloodDetailsFilters {
  searchTerm: string;
  bloodGroup: string;
  componentType: string;
  status: string;
  expiryRange: string;
}