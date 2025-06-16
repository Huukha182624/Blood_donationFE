// src/types/Event.ts
export interface BloodDonationEvent {
  id: string;
  name: string;
  description: string;
  startTime: string; // ISO 8601 string, e.g., "2025-06-15T09:00"
  endTime: string;   // ISO 8601 string
  locationName: string;
  locationAddress: string;
  targetAudience: string;
  specialRequirements: string;
  imageUrl?: string;
  status: 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  registeredDonors: number;
  actualBloodUnits?: number; // For completed events
}