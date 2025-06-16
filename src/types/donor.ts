// src/types/donor.ts

export interface IDonationRecord {
  date: string; // Ngày hiến máu (ví dụ: "2023-01-15")
  volume: number; // Thể tích máu hiến (ml)
  location: string; // Địa điểm hiến máu
  notes?: string; // Ghi chú thêm cho lần hiến này
  // Thêm các trường khác nếu cần, ví dụ: 'result': 'Đạt' | 'Không đạt'
}

export interface IDonor {
  id: string; // ID duy nhất của người hiến máu
  name: string; // Họ và tên
  dob: string; // Ngày sinh (ví dụ: "1990-05-20")
  gender: 'Nam' | 'Nữ' | 'Khác';
  idCard?: string; // CMND/CCCD (tùy chọn)
  address?: string; // Địa chỉ
  bloodGroup: string; // Nhóm máu (ví dụ: "A+", "O-")
  phone: string; // Số điện thoại
  email?: string; // Email (tùy chọn)
  totalDonations: number; // Tổng số lần hiến máu
  lastDonationDate?: string; // Ngày của lần hiến máu gần nhất (ví dụ: "2024-03-10")
  donationHistory?: IDonationRecord[]; // Mảng chi tiết các lần hiến máu
  // Thêm các trường khác theo yêu cầu nghiệp vụ
}