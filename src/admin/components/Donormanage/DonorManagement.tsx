// src/pages/DonorManagement/index.tsx
import React, { useState, useEffect } from 'react';
import DonorTable from './DonorTable';
import { type IDonor, type IDonationRecord } from '../../../types/donor'; // Import both interfaces
import './DonorManagement.css';

const DonorManagementPage: React.FC = () => {
    const [donors, setDonors] = useState<IDonor[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [showDonorForm, setShowDonorForm] = useState<boolean>(false);
    const [editingDonor, setEditingDonor] = useState<IDonor | null>(null);
    const [newDonor, setNewDonor] = useState<IDonor>({
        id: '',
        name: '',
        dob: '',
        gender: 'Nam',
        idCard: '', // Added
        address: '', // Added
        bloodGroup: 'O+',
        phone: '',
        email: '', // Added
        totalDonations: 0,
        lastDonationDate: '',
        donationHistory: [],
    });

    const fetchDonors = async () => {
        setLoading(true);
        setError(null);
        try {
            const dummyData: IDonor[] = [
                {
                    id: '1',
                    name: 'Nguyễn Thanh Tùng',
                    dob: '1990-03-25',
                    gender: 'Nam',
                    idCard: '001123456789',
                    address: '123 Nguyễn Văn Cừ, Quận 1, TP.HCM',
                    bloodGroup: 'O+',
                    phone: '0901123456',
                    email: 'tungnt@example.com',
                    totalDonations: 8,
                    lastDonationDate: '2025-05-28',
                    donationHistory: [
                        { date: '2025-05-28', volume: 350, location: 'BV Chợ Rẫy' },
                        { date: '2024-12-10', volume: 350, location: 'Trạm Y tế P.1' },
                    ],
                },
                {
                    id: '2',
                    name: 'Phạm Thị Lan',
                    dob: '1992-09-10',
                    gender: 'Nữ',
                    idCard: '002987654321',
                    address: '456 Lê Lợi, Quận 3, TP.HCM',
                    bloodGroup: 'A-',
                    phone: '0912987654',
                    email: 'lanpt@example.com',
                    totalDonations: 3,
                    lastDonationDate: '2025-06-12',
                    donationHistory: [
                        { date: '2025-06-12', volume: 250, location: 'TT Huyết học' },
                        { date: '2024-11-05', volume: 250, location: 'ĐH Y Dược TPHCM' },
                    ],
                },
                {
                    id: '3',
                    name: 'Lê Văn Khải',
                    dob: '1985-01-01',
                    gender: 'Nam',
                    idCard: '003123123123',
                    address: '789 Trần Hưng Đạo, Quận 5, TP.HCM',
                    bloodGroup: 'B+',
                    phone: '0987123456',
                    email: 'khailv@example.com',
                    totalDonations: 12,
                    lastDonationDate: '2025-04-01',
                    donationHistory: [
                        { date: '2025-04-01', volume: 450, location: 'Bệnh viện Huyết học - Truyền máu TP.HCM' },
                        { date: '2024-10-15', volume: 450, location: 'Trung tâm Hiến máu Nhân đạo' },
                    ],
                },
                {
                    id: '4',
                    name: 'Trần Thị Mai',
                    dob: '1998-07-20',
                    gender: 'Nữ',
                    idCard: '004456456456',
                    address: '101 Nguyễn Đình Chiểu, Quận 3, TP.HCM',
                    bloodGroup: 'AB+',
                    phone: '0905567890',
                    email: 'maitt@example.com',
                    totalDonations: 1,
                    lastDonationDate: '2025-06-05',
                    donationHistory: [
                        { date: '2025-06-05', volume: 250, location: 'Trạm Y tế P.2' },
                    ],
                },
                {
                    id: '5',
                    name: 'Hoàng Minh Đức',
                    dob: '1993-11-11',
                    gender: 'Nam',
                    idCard: '005789789789',
                    address: '222 Hai Bà Trưng, Quận 1, TP.HCM',
                    bloodGroup: 'O-',
                    phone: '0919123123',
                    email: 'duchm@example.com',
                    totalDonations: 5,
                    lastDonationDate: '2025-03-18',
                    donationHistory: [
                        { date: '2025-03-18', volume: 350, location: 'BV Đại học Y Dược' },
                        { date: '2024-09-22', volume: 350, location: 'Trung tâm Truyền máu' },
                    ],
                },
                {
                    id: '6',
                    name: 'Vũ Thị Kim Anh',
                    dob: '1980-02-14',
                    gender: 'Nữ',
                    idCard: '006111222333',
                    address: '333 Cách Mạng Tháng 8, Quận 10, TP.HCM',
                    bloodGroup: 'A+',
                    phone: '0977888999',
                    email: 'anhvtk@example.com',
                    totalDonations: 15,
                    lastDonationDate: '2025-05-01',
                    donationHistory: [
                        { date: '2025-05-01', volume: 450, location: 'Bệnh viện Chợ Rẫy' },
                        { date: '2024-11-11', volume: 450, location: 'Trung tâm Hiến máu Tình nguyện' },
                    ],
                }
            ];
            setDonors(dummyData);
        } catch (err) {
            console.error("Lỗi khi tải dữ liệu người hiến máu:", err);
            setError("Không thể tải dữ liệu người hiến máu. Vui lòng thử lại sau.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDonors();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewDonor({ ...newDonor, [name]: value });
    };

    const handleAddOrUpdateDonor = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingDonor) {
            setDonors(
                donors.map((donor) =>
                    donor.id === editingDonor.id ? { ...newDonor, id: donor.id } : donor
                )
            );
            setEditingDonor(null);
        } else {
            // Simple client-side ID generation - replace with backend logic in real app
            const newId = String(donors.length > 0 ? Math.max(...donors.map(d => parseInt(d.id, 10))) + 1 : 1);
            setDonors([...donors, { ...newDonor, id: newId }]);
        }
        // Reset form and close it
        setNewDonor({
            id: '', name: '', dob: '', gender: 'Nam', idCard: '', address: '',
            bloodGroup: 'O+', phone: '', email: '', totalDonations: 0, lastDonationDate: '', donationHistory: [],
        });
        setShowDonorForm(false);
    };

    const handleViewDetails = (donor: IDonor) => { console.log('Xem chi tiết người hiến máu:', donor); };

    const handleEditDonor = (donor: IDonor) => {
        setEditingDonor(donor);
        setNewDonor(donor); // Populate form with existing donor data
        setShowDonorForm(true);
    };

    const handleDeleteDonor = (donorId: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa người hiến máu này không?')) {
            console.log('Xóa người hiến máu với ID:', donorId);
            setDonors(donors.filter(donor => donor.id !== donorId));
        }
    };

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
                                setEditingDonor(null); // Clear editing state for new add
                                setNewDonor({ // Reset form fields for new donor, including new fields
                                    id: '', name: '', dob: '', gender: 'Nam', idCard: '', address: '',
                                    bloodGroup: 'O+', phone: '', email: '', totalDonations: 0, lastDonationDate: '', donationHistory: [],
                                });
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
                        />
                    </div>

                    {loading && (<div className="loading-message">Đang tải dữ liệu...</div>)}
                    {error && (<div className="error-message">Lỗi: {error}</div>)}

                    {!loading && !error && (
                        <DonorTable
                            donors={donors}
                            onViewDetails={handleViewDetails}
                            onEdit={handleEditDonor}
                            onDelete={handleDeleteDonor}
                        />
                    )}

                    {/* Donor Add/Edit Form Overlay */}
                    {showDonorForm && (
                        <div className="form-overlay">
                            <form className="donor-form" onSubmit={handleAddOrUpdateDonor}>
                                <h3>{editingDonor ? 'Chỉnh sửa Thông tin Người Hiến Máu' : 'Thêm Người Hiến Máu Mới'}</h3>

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
                                        <option value="Nam">Nam</option>
                                        <option value="Nữ">Nữ</option>
                                        <option value="Khác">Khác</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="idCard">CMND/CCCD:</label>
                                    <input type="text" id="idCard" name="idCard" value={newDonor.idCard || ''} onChange={handleInputChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="address">Địa chỉ:</label>
                                    <input type="text" id="address" name="address" value={newDonor.address || ''} onChange={handleInputChange} />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="bloodGroup">Nhóm máu:</label>
                                    <select id="bloodGroup" name="bloodGroup" value={newDonor.bloodGroup} onChange={handleInputChange}>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
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
                                    <button type="submit" className="submit-button">
                                        {editingDonor ? 'Cập nhật' : 'Thêm'}
                                    </button>
                                    <button
                                        type="button"
                                        className="cancel-button"
                                        onClick={() => setShowDonorForm(false)}
                                    >
                                        Hủy
                                    </button>
                                </div>
                            </form>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default DonorManagementPage;