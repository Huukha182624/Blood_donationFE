// src/components/BloodDetailsTab.tsx
import React, { useState, useMemo } from 'react';
import type { BloodUnit, BloodDetailsFilters } from '../../../types/types';
import './BloodDetailsTab.css'; // Import the CSS file

// Mock data (thực tế sẽ lấy từ API)
const mockBloodUnits: BloodUnit[] = [
  { id: 'BU001', bloodGroup: 'A+', componentType: 'Hồng cầu lắng', collectionDate: '2025-05-01', expiryDate: '2025-06-15', status: 'available', storageLocation: 'Kệ A-01, Ngăn 1', qaStatus: 'passed' },
  { id: 'BU002', bloodGroup: 'O-', componentType: 'Huyết tương', collectionDate: '2025-05-10', expiryDate: '2025-06-08', status: 'available', storageLocation: 'Kệ B-02, Ngăn 2', qaStatus: 'passed' },
  { id: 'BU003', bloodGroup: 'B+', componentType: 'Tiểu cầu', collectionDate: '2025-05-20', expiryDate: '2025-06-12', status: 'available', storageLocation: 'Kệ C-03, Ngăn 3', qaStatus: 'passed' },
  { id: 'BU004', bloodGroup: 'A+', componentType: 'Hồng cầu lắng', collectionDate: '2025-05-15', expiryDate: '2025-06-20', status: 'issued', storageLocation: 'Kệ A-01, Ngăn 2', qaStatus: 'passed' },
  { id: 'BU005', bloodGroup: 'O-', componentType: 'Hồng cầu lắng', collectionDate: '2025-05-25', expiryDate: '2025-06-05', status: 'available', storageLocation: 'Kệ B-02, Ngăn 3', qaStatus: 'passed' },
  { id: 'BU006', bloodGroup: 'AB+', componentType: 'Máu toàn phần', collectionDate: '2025-05-28', expiryDate: '2025-06-10', status: 'available', storageLocation: 'Kệ D-04, Ngăn 1', qaStatus: 'passed' },
  { id: 'BU007', bloodGroup: 'O-', componentType: 'Huyết tương', collectionDate: '2025-05-05', expiryDate: '2025-06-01', status: 'available', storageLocation: 'Kệ B-02, Ngăn 4', qaStatus: 'passed' },
  { id: 'BU008', bloodGroup: 'A-', componentType: 'Hồng cầu lắng', collectionDate: '2025-04-20', expiryDate: '2025-06-07', status: 'available', storageLocation: 'Kệ A-01, Ngăn 5', qaStatus: 'passed' },
  { id: 'BU009', bloodGroup: 'B+', componentType: 'Tiểu cầu', collectionDate: '2025-03-10', expiryDate: '2025-05-30', status: 'cancelled', storageLocation: 'Kệ C-03, Ngăn 4', qaStatus: 'failed' },
  { id: 'BU010', bloodGroup: 'A+', componentType: 'Hồng cầu lắng', collectionDate: '2025-05-15', expiryDate: '2025-06-20', status: 'issued', storageLocation: 'Kệ A-01, Ngăn 2', qaStatus: 'passed' },
  { id: 'BU011', bloodGroup: 'A-', componentType: 'Hồng cầu lắng', collectionDate: '2025-05-15', expiryDate: '2025-06-20', status: 'issued', storageLocation: 'Kệ A-01, Ngăn 2', qaStatus: 'passed' },
  { id: 'BU012', bloodGroup: 'A+', componentType: 'Hồng cầu lắng', collectionDate: '2025-05-15', expiryDate: '2025-06-20', status: 'issued', storageLocation: 'Kệ A-01, Ngăn 2', qaStatus: 'passed' },
  { id: 'BU013', bloodGroup: 'A+', componentType: 'Hồng cầu lắng', collectionDate: '2025-05-15', expiryDate: '2025-06-20', status: 'issued', storageLocation: 'Kệ A-01, Ngăn 2', qaStatus: 'passed' },
];


const BloodDetailsTab: React.FC = () => {
  const [bloodUnits, setBloodUnits] = useState<BloodUnit[]>(mockBloodUnits);
  const [filters, setFilters] = useState<BloodDetailsFilters>({
    searchTerm: '',
    bloodGroup: '',
    componentType: '',
    status: '',
    expiryRange: '',
  });
  const [sortBy, setSortBy] = useState<keyof BloodUnit | null>('expiryDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const handleSort = (column: keyof BloodUnit) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(column);
      setSortOrder('asc');
    }
  };

  const filteredAndSortedUnits = useMemo(() => {
    let filteredUnits = [...bloodUnits];

    // Apply search term
    if (filters.searchTerm) {
      filteredUnits = filteredUnits.filter(unit =>
        unit.id.toLowerCase().includes(filters.searchTerm.toLowerCase())
      );
    }

    // Apply other filters
    if (filters.bloodGroup) {
      filteredUnits = filteredUnits.filter(unit => unit.bloodGroup === filters.bloodGroup);
    }
    if (filters.componentType) {
      filteredUnits = filteredUnits.filter(unit => unit.componentType === filters.componentType);
    }
    if (filters.status) {
      filteredUnits = filteredUnits.filter(unit => unit.status === filters.status);
    }
    if (filters.expiryRange) {
      const today = new Date();
      filteredUnits = filteredUnits.filter(unit => {
        const expiry = new Date(unit.expiryDate);
        if (filters.expiryRange === 'expired') {
          return expiry < today;
        } else if (filters.expiryRange === '7days') {
          const sevenDaysLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
          return expiry > today && expiry <= sevenDaysLater;
        } else if (filters.expiryRange === '30days') {
          const thirtyDaysLater = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000);
          return expiry > today && expiry <= thirtyDaysLater;
        }
        return true;
      });
    }

    // Apply sorting
    if (sortBy) {
      filteredUnits.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }
        // Handle Date objects specifically for sorting
        if (sortBy === 'expiryDate' || sortBy === 'collectionDate') {
          const dateA = new Date(aValue as string).getTime();
          const dateB = new Date(bValue as string).getTime();
          return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
        }
        return 0;
      });
    }

    return filteredUnits;
  }, [bloodUnits, filters, sortBy, sortOrder]);

  const getExpiryColor = (expiryDate: string, status: BloodUnit['status']) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const sevenDaysLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    if (status === 'cancelled' || status === 'pending_qa') return 'text-gray';
    if (expiry < today) return 'text-red font-semibold'; // Đã hết hạn
    if (expiry <= sevenDaysLater) return 'text-orange font-medium'; // Sắp hết hạn (dưới 7 ngày)
    return 'text-green'; // Còn hạn
  };

  const handleAddUnit = () => {
    // Logic để hiển thị form thêm đơn vị máu mới (ví dụ: mở modal)
    alert('Chức năng thêm đơn vị máu mới');
  };

  const handleEditUnit = (unit: BloodUnit) => {
    // Logic để hiển thị form chỉnh sửa đơn vị máu
    alert(`Chỉnh sửa đơn vị: ${unit.id}`);
  };

  const handleDeleteUnit = (id: string) => {
    if (confirm(`Bạn có chắc chắn muốn xóa đơn vị máu ${id}?`)) {
      setBloodUnits(prevUnits => prevUnits.filter(unit => unit.id !== id));
      alert(`Đã xóa đơn vị: ${id}`);
    }
  };

  return (
    <div className="blood-details-tab">
      <h2 className="blood-details-title">Chi tiết Đơn vị máu</h2>

      {/* Filter and Search Controls */}
      <div className="filter-controls">
        <div className="filter-grid">
          <input
            type="text"
            name="searchTerm"
            placeholder="Tìm kiếm theo mã đơn vị"
            value={filters.searchTerm}
            onChange={handleFilterChange}
            className="filter-input"
          />
          <select
            name="bloodGroup"
            value={filters.bloodGroup}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">Tất cả nhóm máu</option>
            <option value="A+">A+</option>
            <option value="A-">A-</option>
            <option value="B+">B+</option>
            <option value="B-">B-</option>
            <option value="AB+">AB+</option>
            <option value="AB-">AB-</option>
            <option value="O+">O+</option>
            <option value="O-">O-</option>
          </select>
          <select
            name="componentType"
            value={filters.componentType}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">Tất cả thành phần</option>
            <option value="Hồng cầu lắng">Hồng cầu lắng</option>
            <option value="Huyết tương">Huyết tương</option>
            <option value="Tiểu cầu">Tiểu cầu</option>
            <option value="Máu toàn phần">Máu toàn phần</option>
          </select>
          <select
            name="status"
            value={filters.status}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="available">Có sẵn</option>
            <option value="issued">Đã cấp phát</option>
            <option value="cancelled">Đã hủy</option>
            <option value="pending_qa">Đang chờ kiểm định</option>
          </select>
          <select
            name="expiryRange"
            value={filters.expiryRange}
            onChange={handleFilterChange}
            className="filter-select"
          >
            <option value="">Thời hạn</option>
            <option value="expired">Đã hết hạn</option>
            <option value="7days">Trong 7 ngày tới</option>
            <option value="30days">Trong 30 ngày tới</option>
          </select>
        </div>
        <div className="filter-buttons">
          <button
            onClick={() => setFilters({ searchTerm: '', bloodGroup: '', componentType: '', status: '', expiryRange: '' })}
            className="clear-filters-button"
          >
            Xóa bộ lọc
          </button>
          <button
            onClick={handleAddUnit}
            className="add-unit-button"
          >
            Thêm đơn vị máu mới
          </button>
        </div>
      </div>

      {/* Data Table */}
      <div className="data-table-container">
        <div className="table-wrapper">
          <table className="blood-units-table">
            <thead className="table-header">
              <tr>
                <th
                  className="table-header-cell sortable"
                  onClick={() => handleSort('id')}
                >
                  Mã Đơn vị {sortBy === 'id' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  className="table-header-cell sortable"
                  onClick={() => handleSort('bloodGroup')}
                >
                  Nhóm máu {sortBy === 'bloodGroup' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  className="table-header-cell"
                >
                  Thành phần
                </th>
                <th
                  className="table-header-cell"
                >
                  Ngày thu thập
                </th>
                <th
                  className="table-header-cell sortable"
                  onClick={() => handleSort('expiryDate')}
                >
                  Ngày hết hạn {sortBy === 'expiryDate' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  className="table-header-cell sortable"
                  onClick={() => handleSort('status')}
                >
                  Trạng thái {sortBy === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}
                </th>
                <th
                  className="table-header-cell"
                >
                  Vị trí
                </th>
                <th
                  className="table-header-cell"
                >
                  Kiểm định
                </th>
                <th className="table-header-cell">
                  Hành động
                </th>
              </tr>
            </thead>
            <tbody className="table-body">
              {filteredAndSortedUnits.length > 0 ? (
                filteredAndSortedUnits.map(unit => (
                  <tr key={unit.id} className="table-row">
                    <td className="table-cell font-medium">{unit.id}</td>
                    <td className="table-cell">{unit.bloodGroup}</td>
                    <td className="table-cell">{unit.componentType}</td>
                    <td className="table-cell">{unit.collectionDate}</td>
                    <td className={`table-cell ${getExpiryColor(unit.expiryDate, unit.status)}`}>
                      {unit.expiryDate}
                      {new Date(unit.expiryDate) < new Date() && unit.status === 'available' && ' ❌'}
                      {new Date(unit.expiryDate) > new Date() && new Date(unit.expiryDate) <= new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000) && unit.status === 'available' && ' ⚠️'}
                    </td>
                    <td className="table-cell">
                      {unit.status === 'available' ? 'Có sẵn' :
                        unit.status === 'issued' ? 'Đã cấp phát' :
                          unit.status === 'cancelled' ? 'Đã hủy' : 'Đang chờ KĐ'}
                    </td>
                    <td className="table-cell">{unit.storageLocation}</td>
                    <td className="table-cell">
                      {unit.qaStatus === 'passed' ? 'Đạt' :
                        unit.qaStatus === 'pending' ? 'Đang chờ' : 'Lỗi'}
                    </td>
                    <td className="table-cell actions-cell">
                      <button
                        onClick={() => handleEditUnit(unit)}
                        className="edit-button"
                        title="Chỉnh sửa"
                      >
                        Sửa
                      </button>
                      <button
                        onClick={() => handleDeleteUnit(unit.id)}
                        className="delete-button"
                        title="Xóa"
                      >
                        Xóa
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={9} className="no-data-cell">Không tìm thấy đơn vị máu nào phù hợp.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* Pagination placeholder */}
        <div className="pagination-info">
          Hiển thị {filteredAndSortedUnits.length} đơn vị.
        </div>
      </div>
    </div>
  );
};

export default BloodDetailsTab;