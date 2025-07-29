export interface IDonationRecord {
    date: string;
    volume: number;
    location: string;
}

export interface IDonor {
    id: string;
    name: string;
    dob: string;
    gender: 'Nam' | 'Nữ' | 'Khác';
    idCard: string;
    address: string;
    role: string;
    bloodGroup: string;
    phone: string;
    email: string;
    totalVolume: number,
    totalDonations: number;
    lastDonationDate: string;
    donationHistory: IDonationRecord[];
    lat?: number | null;
    lng?: number | null;
    avatar_image?: string; // URL ảnh đại diện
    isAvailable: boolean;

}