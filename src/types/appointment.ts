// types/appointment.ts (Gợi ý cập nhật)

// Trạng thái dùng trong frontend (tiếng Anh để nhất quán)
export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'unqualified' | 'no-show';

// Dữ liệu cuộc hẹn đã được xử lý để hiển thị
export interface Appointment {
  id: number; // ID gốc từ API
  displayId: string; // ID dùng để hiển thị (ví dụ: HD-1)
  donorName: string;
  phoneNumber: string;
  email: string;
  campaignName: string;
  appointmentDate: string;

  location: string;
  status: AppointmentStatus;
  registrationDate: string;
  notes: string;
  appointmentTime: string;
  donorBloodType: string;
  userId: number;
  campaignId: number;
  productType:string;
  donationType: string;
}

// Dữ liệu chiến dịch đã được xử lý
export interface Campaign {
  id: number; // ID gốc từ API
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  donateTime: {
    start: string;
    end: string;
  };
}