// src/types/Event.ts

/**
 * @interface CampaignFromAPI
 * @description Đại diện cho cấu trúc dữ liệu thô của một chiến dịch
 * khi được trả về từ API backend.
 */
export interface CampaignFromAPI {
  id: number;
  name: string;
  address: string;
  activeTime: string; // Ví dụ: "2025-07-01"
  donateTime: {
    sang: string;   // Ví dụ: "08:00-11:30"
    chieu: string;  // Ví dụ: "13:30-16:00"
  };
  max: number;
  hospital: {
    id: number;
    name: string;
  };
  registeredCount: number;
  status: 'Đang diễn ra' | 'Sắp diễn ra' | 'Đã kết thúc';
  lat: number | string; // API có thể trả về string hoặc number
  lng: number | string;
}


/**
 * @interface BloodDonationEvent
 * @description Đại diện cho đối tượng sự kiện đã được xử lý và sử dụng
 * trong toàn bộ ứng dụng React. Đây là type "sạch" và nhất quán.
 */
export interface BloodDonationEvent {
  /** ID của sự kiện, đã được chuyển thành string. */
  id: string;

  /** Tên chính thức của sự kiện. */
  name: string;

  /** Mô tả chi tiết về sự kiện. */
  description?: string;

  /** Thời gian bắt đầu sự kiện, ở định dạng ISO 8601 đầy đủ. */
  startTime: string;

  /** Thời gian kết thúc sự kiện, ở định dạng ISO 8601 đầy đủ. */
  endTime: string;

  /** Tên của địa điểm tổ chức (ví dụ: "Trường Đại học Bách Khoa TP.HCM"). */
  locationName: string;

  /** Địa chỉ chi tiết của địa điểm. */
  locationAddress: string;

  /** Đối tượng mà chiến dịch nhắm đến (ví dụ: "Sinh viên và giảng viên"). */
  targetAudience?: string;

  /** Các yêu cầu đặc biệt cho người tham gia (ví dụ: "Cần mang theo CCCD"). */
  specialRequirements?: string;

  /** URL hình ảnh đại diện cho sự kiện. */
  imageUrl?: string;

  /** Trạng thái của sự kiện, được tính toán ở frontend. */
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';

  /** Số lượng người đã đăng ký. Được ánh xạ từ 'registeredCount' của API. */
  registeredDonors: number;

  /** Số lượng đơn vị máu thực tế nhận được (dành cho sự kiện đã hoàn thành). */
  actualBloodUnits?: number;

  /** Số lượng đăng ký tối đa cho phép. Được ánh xạ từ 'max' của API. */
  maxRegistrations: number;

  /** Thông tin bệnh viện tổ chức. */
  hospital: {
    id: string;
    name: string;
  };

  /** Tọa độ latitude của địa điểm. */
  lat: number;

  /** Tọa độ longitude của địa điểm. */
  lng: number;

  /** Thời gian có thể hiến máu trong ngày. */
  donateTime: string;
}