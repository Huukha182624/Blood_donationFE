import React from 'react';

// --- CÁC KIỂU DỮ LIỆU CHUNG ---

// Trạng thái của một đơn vị máu ở phía frontend
export type BloodUnitFrontendStatus = 'available' | 'issued' | 'expired' | 'disposed' | 'pending_qa' | 'testing_failed' | 'cancelled';

// Trạng thái kiểm định chất lượng
export type QAStatus = 'passed' | 'pending' | 'failed';

// --- CÁC INTERFACE CHÍNH ---

/**
 * Interface đại diện cho một đơn vị máu đã được ánh xạ để hiển thị trên giao diện.
 */
export interface BloodUnit {
  id: string;                      // Mã đơn vị máu
  bloodGroup: string;              // Nhóm máu (e.g., 'A_POS', 'O_NEG')
  productType: string;             // <-- THÊM: Loại sản phẩm máu (e.g., 'WholeBlood')
  collectionDate: string;          // Ngày thu thập (đã định dạng)
  expiryDate: string;              // Ngày hết hạn (đã định dạng)
  volume: number;                  // Thể tích (ml)
  status: BloodUnitFrontendStatus; // Trạng thái đã được ánh xạ
  storageLocation: string;         // Tên bệnh viện lưu trữ
  qaStatus: QAStatus;              // Trạng thái kiểm định
  issueDate: string | null;        // Ngày xuất kho (đã định dạng hoặc null)
  
  // Thông tin liên quan (có thể là null)
  donorName?: string;
  verifierName?: string;
  hospital?: { id: number; name: string; };
}

/**
 * Interface cho các bộ lọc trên tab chi tiết kho máu.
 */
export interface BloodDetailsFilters {
  searchTerm: string;
  bloodGroup: string;
  status: string;
  expiryRange: string;
}

/**
 * Interface cho các props của component InfoCard.
 */
export interface InfoCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode; 
  color?: string; 
  onClick?: () => void;
}
