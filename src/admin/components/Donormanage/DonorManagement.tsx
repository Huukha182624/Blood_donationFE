import React, { useState, useEffect, useCallback } from 'react';

// Import các components và types
import DonorTable from './DonorTable';
import DonorMapModal from './DonorMapModal';
import { type IDonor } from '../../../types/donor';
import './DonorManagement.css';

// --- SỬA LỖI: Import các hàm service đã được đồng bộ ---
import { fetchAllUsersWithHistory } from '../../../services/userService';
import api from '../../../services/api';

// =================================================================
// CÁC HÀM API SERVICE MỚI (Nên được chuyển vào file service riêng)
// =================================================================

const adminCreateUser = async (payload) => {
    try {
        const response = await api.post('/users/admin/create', payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const adminUpdateUser = async (userId, payload) => {
    try {
        const response = await api.put(`/users/${userId}`, payload);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

const adminDeleteUser = async (userId) => {
    try {
        const response = await api.delete(`/users/${userId}`);
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};

/**
 * Chuyển đổi địa chỉ thành tọa độ (lat, lng) sử dụng Google Geocoding API.
 * QUAN TRỌNG: Bạn cần thay thế 'YOUR_GOOGLE_MAPS_API_KEY' bằng API Key của bạn
 * từ Google Cloud Platform để hàm này hoạt động.
 * @param {string} address Địa chỉ cần chuyển đổi.
 * @returns {Promise<{lat: number, lng: number}>} Tọa độ của địa chỉ.
 */


export const getCoordinatesFromAddress = async (address) => {
    const apiKey = import.meta.env.VITE_Maps_API_KEY;
    if (!apiKey) {
        console.error("VITE_Maps_API_KEY is not configured in .env file");
        return null;
    }
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.status === 'OK' && data.results.length > 0) {
            return data.results[0].geometry.location;
        } else {
            console.error('Geocoding failed:', data.status, data.error_message);
            return null;
        }
    } catch (error) {
        console.error('Error fetching geocoding data:', error);
        return null;
    }
};


// =================================================================

const initialDonorState: IDonor = {
    id: '',
    name: '',
    dob: '',
    gender: 'Nam',
    idCard: '',
    address: '',
    bloodGroup: 'None',
    phone: '',
    email: '',
    role: 'Member',
    totalDonations: 0,
    totalVolume: 0,
    lastDonationDate: '',
    donationHistory: [],
    lat: null,
    lng: null,
};

const DonorManagementPage: React.FC = () => {
    const [donors, setDonors] = useState<IDonor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [showDonorForm, setShowDonorForm] = useState<boolean>(false);
    const [editingDonor, setEditingDonor] = useState<IDonor | null>(null);
    const [isMapModalOpen, setIsMapModalOpen] = useState(false);
    const [selectedDonorForMap, setSelectedDonorForMap] = useState<IDonor | null>(null);
    const [newDonor, setNewDonor] = useState<IDonor>(initialDonorState);
    const [searchTerm, setSearchTerm] = useState('');

    // CẢI TIẾN: Thêm state để quản lý trạng thái tải của form
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; donorId: string | null }>({
        isOpen: false,
        donorId: null,
    });


    const fetchDonors = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const mappedDonors = await fetchAllUsersWithHistory();
            const memberDonors = mappedDonors.filter(d => d.role === 'Member');
            setDonors(memberDonors);
        } catch (err: any) {
            console.error("Lỗi khi tải dữ liệu người hiến máu:", err);
            setError(err.message || "Đã xảy ra lỗi không xác định.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDonors();
    }, [fetchDonors]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewDonor({ ...newDonor, [name]: value });
    };

    const handleAddOrUpdateDonor = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError(null);

        try {
            let coordinates = { lat: newDonor.lat ?? 0, lng: newDonor.lng ?? 0 };

            // CẢI TIẾN: Nếu có địa chỉ, thực hiện chuyển đổi sang tọa độ
            if (newDonor.address && newDonor.address.trim() !== '') {
                try {
                    coordinates = await getCoordinatesFromAddress(newDonor.address);
                } catch (geoError: any) {
                    // Nếu chuyển đổi lỗi, hiển thị thông báo và dừng lại
                    setError(geoError.message);
                    setIsSubmitting(false);
                    return;
                }
            }
             const genderForApi = {
                'Nam': 'Male',
                'Nữ': 'Female',
                'Khác': 'Other'
            }[newDonor.gender] || 'Other';
            const payload = {
                fullName: newDonor.name,
                email: newDonor.email,
                phoneNumber: newDonor.phone,
                birthday: newDonor.dob ? new Date(newDonor.dob).toISOString() : null,
                gender: genderForApi,
                address: newDonor.address,
                bloodType: newDonor.bloodGroup === 'Chưa rõ' ? 'None' : newDonor.bloodGroup,
                lat: coordinates.lat, // Sử dụng tọa độ đã chuyển đổi
                lng: coordinates.lng, // Sử dụng tọa độ đã chuyển đổi
            };

            const isEditing = !!editingDonor;

            if (isEditing) {
                await adminUpdateUser(editingDonor.id, payload);
            } else {
                await adminCreateUser(payload);
            }

            setShowDonorForm(false);
            setEditingDonor(null);
            setNewDonor(initialDonorState);
            await fetchDonors(); // Tải lại danh sách để đồng bộ

        } catch (err: any) {
            console.error("Lỗi khi thêm/cập nhật:", err);
            const errorMessage = err.message || (err.errors ? JSON.stringify(err.errors) : 'Đã xảy ra lỗi không xác định.');
            setError(errorMessage);
        } finally {
            setIsSubmitting(false); // Kết thúc trạng thái tải
        }
    };

    const handleViewDetails = (donor: IDonor) => {
        if (donor.lat && donor.lng) {
            setSelectedDonorForMap(donor);
            setIsMapModalOpen(true);
        } else {
            alert('Người hiến máu này chưa có thông tin vị trí.');
        }
    };

    const handleEditDonor = (donor: IDonor) => {
        setEditingDonor(donor);
        setNewDonor({
            ...donor,
            dob: donor.dob ? new Date(donor.dob).toISOString().slice(0, 10) : '',
        });
        setShowDonorForm(true);
    };

    const handleDeleteDonor = (donorId: string) => {
        setDeleteConfirm({ isOpen: true, donorId });
    };

    const executeDelete = async () => {
        if (!deleteConfirm.donorId) return;

        try {
            await adminDeleteUser(deleteConfirm.donorId);
            await fetchDonors();
        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Đã xảy ra lỗi không xác định.');
        } finally {
            setDeleteConfirm({ isOpen: false, donorId: null });
        }
    };

    const filteredDonors = donors.filter(donor => {
        const term = searchTerm.toLowerCase();
        return (
            donor.name.toLowerCase().includes(term) ||
            donor.phone.toLowerCase().includes(term) ||
            donor.email.toLowerCase().includes(term)
        );
    });

    return (
        <div className="admin-layout">
            <div className="main-content-donor">
                <div className="donor-management-page">
                    <div className="page-header">
                        <h2>Danh sách Người Hiến Máu</h2>
                        <button
                            className="add-button-dm"
                            onClick={() => {
                                setShowDonorForm(true);
                                setEditingDonor(null);
                                setNewDonor(initialDonorState);
                            }}
                        >
                            Thêm Người Hiến Máu
                        </button>
                    </div>

                    <div className="search-filter-section">
                        <input
                            type="text"
                            placeholder="Tìm kiếm theo tên, SĐT, Email..."
                            className="search-input"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {loading && (<div className="loading-message">Đang tải dữ liệu...</div>)}
                    {error && (<div className="error-message">Lỗi: {error}</div>)}

                    {!loading && !error && (
                        <DonorTable
                            donors={filteredDonors}
                            onViewDetails={handleViewDetails}
                            onEdit={handleEditDonor}
                            onDelete={handleDeleteDonor}
                        />
                    )}

                    {showDonorForm && (
                        <div className="form-overlay">
                            <form className="donor-form" onSubmit={handleAddOrUpdateDonor}>
                                <h3>{editingDonor ? 'Chỉnh sửa Thông tin' : 'Thêm Người Hiến Máu Mới'}</h3>
                                {/* Hiển thị lỗi ngay trên form */}
                                {error && <div className="error-message" style={{ marginBottom: '15px' }}>{error}</div>}
                                <div className="form-group">
                                    <label htmlFor="name">Họ và tên:</label>
                                    <input type="text" id="name" name="name" value={newDonor.name} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="dob">Ngày sinh:</label>
                                    <input type="date" id="dob" name="dob" value={newDonor.dob} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="gender">Giới tính:</label>
                                    <select id="gender" name="gender" value={newDonor.gender} onChange={handleInputChange}>
                                        <option value="Male">Nam</option>
                                        <option value="Female">Nữ</option>
                                        <option value="Other">Khác</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="address">Địa chỉ:</label>
                                    <input type="text" id="address" name="address" value={newDonor.address || ''} onChange={handleInputChange} placeholder="VD: 1600 Amphitheatre Parkway, Mountain View, CA" />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="bloodGroup">Nhóm máu:</label>
                                    <select id="bloodGroup" name="bloodGroup" value={newDonor.bloodGroup} onChange={handleInputChange}>
                                        <option value="None">Chưa rõ</option>
                                        <option value="A_POS">A+</option>
                                        <option value="A_NEG">A-</option>
                                        <option value="B_POS">B+</option>
                                        <option value="B_NEG">B-</option>
                                        <option value="O_POS">O+</option>
                                        <option value="O_NEG">O-</option>
                                        <option value="AB_POS">AB+</option>
                                        <option value="AB_NEG">AB-</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Số điện thoại:</label>
                                    <input type="tel" id="phone" name="phone" value={newDonor.phone} onChange={handleInputChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" id="email" name="email" value={newDonor.email || ''} onChange={handleInputChange} />
                                </div>
                                <div className="form-actions">
                                    <button type="submit" className="submit-button" disabled={isSubmitting}>
                                        {isSubmitting ? 'Đang xử lý...' : (editingDonor ? 'Cập nhật' : 'Thêm')}
                                    </button>
                                    <button
                                        type="button"
                                        className="cancel-button"
                                        onClick={() => setShowDonorForm(false)}
                                        disabled={isSubmitting}
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}

                    {deleteConfirm.isOpen && (
                        <div className="form-overlay">
                            <div className="donor-form" style={{ maxWidth: '400px', textAlign: 'center' }}>
                                <h3>Xác nhận Xóa</h3>
                                <p>Bạn có chắc chắn muốn xóa người hiến máu này không?</p>
                                <div className="form-actions" style={{ justifyContent: 'center' }}>
                                    <button onClick={executeDelete} className="submit-button" style={{ backgroundColor: '#dc3545' }}>
                                        Xóa
                                    </button>
                                    <button type="button" className="cancel-button" onClick={() => setDeleteConfirm({ isOpen: false, donorId: null })}>
                                        Hủy
                                    </button>
                                </div>
                            </div>
                        </div>
                    )}

                    <DonorMapModal
                        isOpen={isMapModalOpen}
                        onClose={() => setIsMapModalOpen(false)}
                        selectedDonor={selectedDonorForMap}
                        allDonors={donors}
                    />
                </div>
            </div>
        </div>
    );
};

export default DonorManagementPage;
