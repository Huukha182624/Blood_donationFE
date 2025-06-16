// src/types/index.ts

export interface Appointment {
  id: string;
  donorName: string;
  phoneNumber: string;
  email: string;
  campaignName: string;
  appointmentDate: string; // YYYY-MM-DD
  appointmentTime: string; // HH:MM
  location: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'unqualified' | 'no-show';
  registrationDate: string; // YYYY-MM-DDTHH:MM:SSZ (ISO string)
  notes?: string; // Ghi chú nội bộ của admin
}

export interface Campaign {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  location: string;
  availableTimeSlots: string[]; // ví dụ: ['08:00-09:00', '09:00-10:00']
}

export type AppointmentStatus = 'pending' | 'confirmed' | 'cancelled' | 'completed' | 'unqualified' | 'no-show';