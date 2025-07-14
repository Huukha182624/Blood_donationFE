import React, { useState, useMemo, useEffect, useCallback } from 'react';
import type { BloodUnit, BloodDetailsFilters } from '../../../types/types';
import { useUser } from '../../../store/userStore';
import { fetchAllBloodUnits, updateBloodUnitStatus  } from '../../../services/BloodUnit/bloodUnitService';
import './BloodDetailsTab.css';

// --- COMPONENT MODAL MỚI ---
interface BloodUnitDetailsModalProps {
    unit: BloodUnit;
    onClose: () => void;
    onUpdateStatus: (unitId: string, newStatus: string) => Promise<void>;
}

const BloodUnitDetailsModal: React.FC<BloodUnitDetailsModalProps> = ({ unit, onClose, onUpdateStatus }) => {
    const [newStatus, setNewStatus] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Cập nhật các trạng thái khớp với API mới
    const possibleStatusUpdates: { label: string; value: string }[] = [
        { label: 'Xác nhận kiểm định (Đạt)', value: 'InStock' },
        { label: 'Cấp phát cho bệnh nhân', value: 'Used' },
        { label: 'Hết hạn sử dụng', value: 'Expired' },
        { label: 'Loại bỏ/Hủy', value: 'Rejected' },
    ];

    const handleSubmit = async () => {
        if (!newStatus) {
            alert('Vui lòng chọn một trạng thái mới.');
            return;
        }
        setIsSubmitting(true);
        try {
            await onUpdateStatus(unit.id, newStatus);
            onClose();
        } catch (error) {
            console.error('Error updating status:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="modal-backdrop-form" onClick={onClose}>
            <div className="modal-content-form" onClick={e => e.stopPropagation()}>
                <h2>Chi tiết đơn vị máu: {unit.id}</h2>
                <div className="unit-details-grid">
                    <p><strong>Nhóm máu:</strong> {mapBloodTypeToDisplay(unit.bloodGroup)}</p>
                    <p><strong>Thể tích:</strong> {unit.volume} ml</p>
                    <p><strong>Loại sản phẩm:</strong> {translateProductType(unit.productType)}</p>
                    <p><strong>Người hiến:</strong> {unit.donorName}</p>
                    <p><strong>Ngày thu thập:</strong> {new Date(unit.collectionDate).toLocaleDateString('vi-VN')}</p>
                    <p><strong>Ngày hết hạn:</strong> {new Date(unit.expiryDate).toLocaleDateString('vi-VN')}</p>
                    <p><strong>Vị trí:</strong> {unit.storageLocation}</p>
                    <p><strong>Người kiểm định:</strong> {unit.verifierName}</p>
                    <p><strong>Trạng thái hiện tại:</strong> {translateStatusToVietnamese(unit.status)}</p>
                    <p><strong>Kiểm định QA:</strong> {unit.qaStatus}</p>
                    {unit.issueDate && <p><strong>Ngày xuất kho:</strong> {new Date(unit.issueDate).toLocaleDateString('vi-VN')}</p>}
                </div>
                
                <div className="formGroup" style={{ marginTop: '20px' }}>
                    <label htmlFor="status-update"><strong>Cập nhật trạng thái:</strong></label>
                    <select
                        id="status-update"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        className="filter-select"
                    >
                        <option value="" disabled>-- Chọn hành động --</option>
                        {possibleStatusUpdates.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>
                </div>

                <div className="formActions" style={{ marginTop: '24px' }}>
                    <button onClick={onClose} className="cancelButton" disabled={isSubmitting}>Đóng</button>
                    <button onClick={handleSubmit} className="submitButton" disabled={isSubmitting || !newStatus}>
                        {isSubmitting ? 'Đang lưu...' : 'Lưu thay đổi'}
                    </button>
                </div>
            </div>
        </div>
    );
};

// --- CÁC HÀM HELPER ---
const mapApiStatusToFrontend = (apiStatus: string): BloodUnit['status'] => {
    const statusMap: { [key: string]: BloodUnit['status'] } = {
        'AwaitingTesting': 'pending_qa',
        'InStock': 'available',
        'Used': 'issued',
        'Expired': 'expired',
        'Rejected': 'disposed',
    };
    return statusMap[apiStatus] || 'available';
};

const mapFrontendStatusToApi = (frontendStatus: string): string => {
    const statusMap: { [key: string]: string } = {
        'InStock': 'InStock',
        'Used': 'Used',
        'Expired': 'Expired',
        'Rejected': 'Rejected',
    };
    return statusMap[frontendStatus] || frontendStatus;
};

const translateStatusToVietnamese = (status: BloodUnit['status']): string => {
    const translationMap: { [key in BloodUnit['status']]: string } = {
        pending_qa: 'Đang chờ KĐ',
        available: 'Có sẵn',
        issued: 'Đã sử dụng',
        expired: 'Đã hết hạn',
        disposed: 'Đã hủy',
        testing_failed: 'KĐ thất bại',
        cancelled: 'Đã hủy',
    };
    return translationMap[status] || 'Không xác định';
};

const translateProductType = (productType: string): string => {
    const typeMap: { [key: string]: string } = {
        'WholeBlood': 'Máu toàn phần',
        'RedBloodCells': 'Hồng cầu',
        'Platelets': 'Tiểu cầu',
        'Plasma': 'Huyết tương',
    };
    return typeMap[productType] || productType;
};

const mapBloodTypeToDisplay = (bloodType: string): string => {
    if (!bloodType || bloodType === 'None') return 'Chưa rõ';
    return bloodType.replace('_POS', '+').replace('_NEG', '-');
};

// --- COMPONENT CHÍNH ---
const BloodDetailsTab: React.FC = () => {
    const [bloodUnits, setBloodUnits] = useState<BloodUnit[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [filters, setFilters] = useState<Omit<BloodDetailsFilters, 'componentType'>>({
        searchTerm: '',
        bloodGroup: '',
        status: '',
        expiryRange: '',
    });
    const [sortBy, setSortBy] = useState<keyof BloodUnit | null>('expiryDate');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [selectedUnit, setSelectedUnit] = useState<BloodUnit | null>(null);
    
    const { user: loggedInUser } = useUser();

    const fetchBloodUnits = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const apiData = await fetchAllBloodUnits();
            const mappedUnits: BloodUnit[] = apiData.map((unit: any) => ({
                id: String(unit.id),
                bloodGroup: mapBloodTypeToDisplay(unit.bloodType),
                collectionDate: new Date(unit.donationDate).toLocaleDateString('vi-VN'),
                expiryDate: new Date(unit.expiryDate).toLocaleDateString('vi-VN'),
                status: mapApiStatusToFrontend(unit.status),
                storageLocation: unit.hospital?.name || 'N/A',
                qaStatus: unit.verifier ? 'Đạt' : (unit.status === 'AwaitingTesting' ? 'Chờ' : 'Lỗi'),
                hospital: unit.hospital,
                volume: unit.volume,
                productType: unit.productType,
                donorName: unit.donor?.name || 'Không rõ',
                verifierName: unit.verifier?.name || 'Chưa có',
                issueDate: unit.issueDate ? new Date(unit.issueDate).toLocaleDateString('vi-VN') : null,
                // Giữ dữ liệu gốc để sort
                _rawDonationDate: unit.donationDate,
                _rawExpiryDate: unit.expiryDate,
                _rawIssueDate: unit.issueDate,
            }));
            setBloodUnits(mappedUnits);
        } catch (err: any) {
            console.error("Lỗi khi tải dữ liệu đơn vị máu:", err);
            setError(err.message || "Đã xảy ra lỗi không xác định.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBloodUnits();
    }, [fetchBloodUnits]);

    const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
    };

    const handleSort = (column: keyof Omit<BloodUnit, 'componentType'>) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortBy(column);
            setSortOrder('asc');
        }
    };

    const filteredAndSortedUnits = useMemo(() => {
        let filteredUnits = [...bloodUnits];

        if (filters.searchTerm) {
            filteredUnits = filteredUnits.filter(unit =>
                unit.id.toLowerCase().includes(filters.searchTerm.toLowerCase())
            );
        }
        if (filters.bloodGroup) {
            filteredUnits = filteredUnits.filter(unit => unit.bloodGroup === filters.bloodGroup);
        }
        if (filters.status) {
            filteredUnits = filteredUnits.filter(unit => unit.status === filters.status);
        }
        if (filters.expiryRange) {
            const today = new Date();
            filteredUnits = filteredUnits.filter(unit => {
                const expiry = new Date((unit as any)._rawExpiryDate);
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

        if (sortBy) {
            filteredUnits.sort((a, b) => {
                let aValue, bValue;
                
                // Sử dụng raw date cho sorting
                if (sortBy === 'expiryDate') {
                    aValue = new Date((a as any)._rawExpiryDate).getTime();
                    bValue = new Date((b as any)._rawExpiryDate).getTime();
                } else if (sortBy === 'collectionDate') {
                    aValue = new Date((a as any)._rawDonationDate).getTime();
                    bValue = new Date((b as any)._rawDonationDate).getTime();
                } else {
                    aValue = a[sortBy];
                    bValue = b[sortBy];
                }

                if (typeof aValue === 'string' && typeof bValue === 'string') {
                    return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
                }
                if (typeof aValue === 'number' && typeof bValue === 'number') {
                    return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
                }
                return 0;
            });
        }
        return filteredUnits;
    }, [bloodUnits, filters, sortBy, sortOrder]);

    const getExpiryColor = (expiryDate: string, status: BloodUnit['status']) => {
        if (status === 'expired' || status === 'testing_failed') return 'text-red font-semibold';
        if (status === 'issued' || status === 'disposed' || status === 'pending_qa' || status === 'cancelled') return 'text-gray';
        if (status === 'available') {
            const today = new Date();
            const expiry = new Date(expiryDate);
            const sevenDaysLater = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
            if (expiry < today) return 'text-red font-semibold';
            if (expiry <= sevenDaysLater) return 'text-orange font-medium';
            return 'text-green';
        }
        return '';
    };

    const handleViewUnit = (unit: BloodUnit) => {
        setSelectedUnit(unit);
    };

    const handleUpdateStatus = async (unitId: string, newStatus: string) => {
        try {
            const apiStatus = mapFrontendStatusToApi(newStatus);
            await updateBloodUnitStatus(unitId, { status: apiStatus });
            alert('Cập nhật trạng thái thành công!');
            setSelectedUnit(null);
            await fetchBloodUnits();
        } catch (error: any) {
            console.error("Lỗi khi cập nhật trạng thái:", error);
            alert(`Cập nhật trạng thái thất bại: ${error.message || 'Vui lòng thử lại'}`);
        }
    };

    const handleDeleteUnit = (id: string) => {
        if (confirm(`Bạn có chắc chắn muốn xóa đơn vị máu ${id}?`)) {
            setBloodUnits(prevUnits => prevUnits.filter(unit => unit.id !== id));
            alert(`Đã xóa đơn vị: ${id}`);
        }
    };

    const handleAddUnit = () => {
        alert('Chức năng thêm đơn vị máu mới');
    };

    if (loading) {
        return <div className="loading">Đang tải dữ liệu...</div>;
    }

    if (error) {
        return (
            <div className="error-container">
                <p className="error-message">Lỗi: {error}</p>
                <button onClick={fetchBloodUnits} className="retry-button">Thử lại</button>
            </div>
        );
    }

    return (
        <div className="blood-details-tab">
            <h2 className="blood-details-title">Chi tiết Đơn vị máu</h2>

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
                    <select name="bloodGroup" value={filters.bloodGroup} onChange={handleFilterChange} className="filter-select">
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
                    <select name="status" value={filters.status} onChange={handleFilterChange} className="filter-select">
                        <option value="">Tất cả trạng thái</option>
                        <option value="available">Có sẵn</option>
                        <option value="issued">Đã sử dụng</option>
                        <option value="expired">Đã hết hạn</option>
                        <option value="pending_qa">Đang chờ KĐ</option>
                        <option value="testing_failed">KĐ thất bại</option>
                        <option value="disposed">Đã hủy</option>
                    </select>
                    <select name="expiryRange" value={filters.expiryRange} onChange={handleFilterChange} className="filter-select">
                        <option value="">Thời hạn</option>
                        <option value="expired">Đã hết hạn</option>
                        <option value="7days">Trong 7 ngày tới</option>
                        <option value="30days">Trong 30 ngày tới</option>
                    </select>
                </div>
                <div className="filter-buttons">
                    <button 
                        onClick={() => setFilters({ searchTerm: '', bloodGroup: '', status: '', expiryRange: '' })} 
                        className="clear-filters-button"
                    >
                        Xóa bộ lọc
                    </button>
                    <button onClick={handleAddUnit} className="add-unit-button">Thêm đơn vị máu mới</button>
                </div>
            </div>

            <div className="data-table-container">
                <div className="table-wrapper">
                    <table className="blood-units-table">
                        <thead className="table-header">
                            <tr>
                                <th className="table-header-cell sortable" onClick={() => handleSort('id')}>
                                    Mã Đơn vị {sortBy === 'id' && (sortOrder === 'asc' ? '▲' : '▼')}
                                </th>
                                <th className="table-header-cell sortable" onClick={() => handleSort('bloodGroup')}>
                                    Nhóm máu {sortBy === 'bloodGroup' && (sortOrder === 'asc' ? '▲' : '▼')}
                                </th>
                                <th className="table-header-cell sortable" onClick={() => handleSort('collectionDate')}>
                                    Ngày thu thập {sortBy === 'collectionDate' && (sortOrder === 'asc' ? '▲' : '▼')}
                                </th>
                                <th className="table-header-cell sortable" onClick={() => handleSort('expiryDate')}>
                                    Ngày hết hạn {sortBy === 'expiryDate' && (sortOrder === 'asc' ? '▲' : '▼')}
                                </th>
                                <th className="table-header-cell sortable" onClick={() => handleSort('status')}>
                                    Trạng thái {sortBy === 'status' && (sortOrder === 'asc' ? '▲' : '▼')}
                                </th>
                                <th className="table-header-cell">Vị trí</th>
                                <th className="table-header-cell">Kiểm định</th>
                                <th className="table-header-cell">Hành động</th>
                            </tr>
                        </thead>
                        <tbody className="table-body">
                            {filteredAndSortedUnits.length > 0 ? (
                                filteredAndSortedUnits.map(unit => (
                                    <tr key={unit.id} className="table-row">
                                        <td className="table-cell font-medium">{unit.id}</td>
                                        <td className="table-cell">{unit.bloodGroup}</td>
                                        <td className="table-cell">{unit.collectionDate}</td>
                                        <td className={`table-cell ${getExpiryColor((unit as any)._rawExpiryDate, unit.status)}`}>
                                            {unit.expiryDate}
                                        </td>
                                        <td className="table-cell">{translateStatusToVietnamese(unit.status)}</td>
                                        <td className="table-cell">{unit.storageLocation}</td>
                                        <td className="table-cell">{unit.qaStatus}</td>
                                        <td className="table-cell actions-cell">
                                            <button 
                                                onClick={() => handleViewUnit(unit)} 
                                                className="view-button" 
                                                title="Xem chi tiết"
                                            >
                                                Xem
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
                                    <td colSpan={8} className="no-data-cell">
                                        Không tìm thấy đơn vị máu nào phù hợp.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="pagination-info">
                    Hiển thị {filteredAndSortedUnits.length} đơn vị.
                </div>
            </div>

            {selectedUnit && (
                <BloodUnitDetailsModal
                    unit={selectedUnit}
                    onClose={() => setSelectedUnit(null)}
                    onUpdateStatus={handleUpdateStatus}
                />
            )}

            <style>{`
                .unit-details-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 10px 20px;
                    background-color: #f9f9f9;
                    padding: 15px;
                    border-radius: 8px;
                    margin-bottom: 20px;
                }
                .unit-details-grid p { margin: 0; }
                .view-button { 
                    background-color: #2196F3; 
                    color: white; 
                    border: none;
                    padding: 8px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                    margin-right: 8px;
                }
                .view-button:hover { background-color: #1976D2; }
                .delete-button {
                    background-color: #f44336;
                    color: white;
                    border: none;
                    padding: 8px 12px;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .delete-button:hover { background-color: #d32f2f; }
                .loading {
                    text-align: center;
                    padding: 50px;
                    font-size: 18px;
                }
                .error-container {
                    text-align: center;
                    padding: 50px;
                }
                .error-message {
                    color: #f44336;
                    font-size: 16px;
                    margin-bottom: 20px;
                }
                .retry-button {
                    background-color: #2196F3;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .retry-button:hover { background-color: #1976D2; }
                .modal-backdrop-form {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background-color: rgba(0, 0, 0, 0.6);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    z-index: 1050;
                }
                .modal-content-form {
                    background: white;
                    padding: 2rem;
                    border-radius: 12px;
                    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
                    width: 90%;
                    max-width: 550px;
                    animation: modal-popup-animation 0.3s ease-out;
                }
                @keyframes modal-popup-animation {
                    from {
                        transform: scale(0.9);
                        opacity: 0;
                    }
                    to {
                        transform: scale(1);
                        opacity: 1;
                    }
                }
                .formGroup {
                    margin-bottom: 16px;
                }
                .formGroup label {
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 500;
                }
                .formActions {
                    display: flex;
                    gap: 12px;
                    justify-content: flex-end;
                }
                .submitButton {
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .submitButton:hover { background-color: #45a049; }
                .submitButton:disabled { 
                    background-color: #cccccc; 
                    cursor: not-allowed; 
                }
                .cancelButton {
                    background-color: #f44336;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    border-radius: 4px;
                    cursor: pointer;
                }
                .cancelButton:hover { background-color: #d32f2f; }
            `}</style>
        </div>
    );
};

export default BloodDetailsTab;