import React, { useState, useEffect, useMemo, useCallback } from 'react';
import type { IDonor } from '../../../types/donor'; // Sử dụng lại type IDonor vì cấu trúc tương tự
import './EmployeeManagement.css';
import api from '../../../services/api';
import { fetchAllUsersWithHistory } from '../../../services/userService'; // Import hàm lấy tất cả user

// =================================================================
// CÁC HÀM API SERVICE MỚI (Nên được chuyển vào file service riêng)
// =================================================================

const getCoordinatesFromAddress = async (address: string): Promise<{ lat: number; lng: number } | null> => {
  const apiKey = import.meta.env.VITE_Maps_API_KEY;
  if (!apiKey) {
    console.error("VITE_Maps_API_KEY is not configured in .env file");
    alert("Lỗi cấu hình: Không tìm thấy API key cho bản đồ.");
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

const adminCreateStaff = async (payload) => {
  try {
    const response = await api.post('/users/staff/create', payload);
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

// =================================================================
// CÁC HÀM HELPER ĐỂ CHUYỂN ĐỔI DỮ LIỆU
// =================================================================

const mapEnglishToVietnamese = (gender: 'Male' | 'Female' | 'Other' | string | null): 'Nam' | 'Nữ' | 'Khác' => {
    if (gender === 'Male') return 'Nam';
    if (gender === 'Female') return 'Nữ';
    return 'Khác';
};

const mapVietnameseToEnglish = (gender: 'Nam' | 'Nữ' | 'Khác'): 'Male' | 'Female' | 'Other' => {
    if (gender === 'Nam') return 'Male';
    if (gender === 'Nữ') return 'Female';
    return 'Other';
};

const mapBloodTypeToDisplay = (bloodType: string): string => {
    if (!bloodType || bloodType === 'None') return 'Chưa rõ';
    return bloodType.replace('_POS', '+').replace('_NEG', '-');
};

// Định nghĩa lại kiểu dữ liệu Employee cho rõ ràng hơn
interface Employee extends IDonor {
    position: string;
}

const initialEmployeeState: Employee = {
    id: '',
    name: '',
    dob: '',
    gender: 'Nam',
    idCard: '',
    address: '',
    bloodGroup: 'None',
    phone: '',
    email: '',
    role: 'Staff',
    position: 'Staff',
    totalDonations: 0,
    totalVolume: 0,
    lastDonationDate: '',
    donationHistory: [],
    lat: null,
    lng: null,
};

const EmployeeManagement: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);
    const [newEmployee, setNewEmployee] = useState<Employee>(initialEmployeeState);

    const fetchEmployees = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const allUsers = await fetchAllUsersWithHistory();
            const staffMembers = allUsers.filter(user => user.role === 'Admin' || user.role === 'Staff');
            
            const mappedEmployees = staffMembers.map(staff => ({
                ...staff,
                gender: mapEnglishToVietnamese(staff.gender),
                position: staff.role,
            }));

            setEmployees(mappedEmployees);
        } catch (err: any) {
            console.error("Lỗi khi tải dữ liệu nhân viên:", err);
            setError(err.message || "Đã xảy ra lỗi không xác định.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchEmployees();
    }, [fetchEmployees]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleAddOrUpdateEmployee = async (e: React.FormEvent) => {
        e.preventDefault();

        // --- BẮT ĐẦU PHẦN CẬP NHẬT ---
        // Lấy tọa độ từ địa chỉ trước khi tạo payload
        const coordinates = await getCoordinatesFromAddress(newEmployee.address);
        
        const payload = {
            fullName: newEmployee.name,
            email: newEmployee.email,
            phoneNumber: newEmployee.phone,
            birthday: newEmployee.dob ? new Date(newEmployee.dob).toISOString() : null,
            gender: mapVietnameseToEnglish(newEmployee.gender),
            address: newEmployee.address,
            bloodType: newEmployee.bloodGroup, // Gửi đi giá trị gốc (A_POS)
            role: newEmployee.position,
            password: 'password123',
            // Thêm lat và lng vào payload
            lat: coordinates?.lat || null,
            lng: coordinates?.lng || null,
        };
        // --- KẾT THÚC PHẦN CẬP NHẬT ---

        const isEditing = !!editingEmployee;

        try {
            if (isEditing) {
                const updatePayload = { ...payload };
                delete updatePayload.password;
                await adminUpdateUser(editingEmployee.id, updatePayload);
            } else {
                await adminCreateStaff(payload);
            }
            
            setShowAddForm(false);
            setEditingEmployee(null);
            setNewEmployee(initialEmployeeState);
            await fetchEmployees();

        } catch (err: any) {
            console.error(err);
            setError(err.message || 'Đã xảy ra lỗi không xác định.');
        }
    };

    const handleEditEmployee = (employee: Employee) => {
        setEditingEmployee(employee);
        setNewEmployee({
            ...employee,
            dob: employee.dob ? new Date(employee.dob).toISOString().slice(0, 10) : '',
        });
        setShowAddForm(true);
    };

    const handleDeleteEmployee = async (employeeId: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này không?')) {
            try {
                await adminDeleteUser(employeeId);
                await fetchEmployees();
            } catch (err: any) {
                console.error(err);
                setError(err.message || 'Đã xảy ra lỗi không xác định.');
            }
        }
    };

    return (
        <div className="employeeManagementContainer">
            <div className="pageHeader">
                <h1 className="pageTitle">Quản lý Nhân viên</h1>
                <button className="addButton" onClick={() => {
                    setShowAddForm(true);
                    setEditingEmployee(null);
                    setNewEmployee(initialEmployeeState);
                }}>
                    Thêm Nhân viên Mới
                </button>
            </div>

            {showAddForm && (
                <div className="formOverlay">
                    <form className="employeeForm" onSubmit={handleAddOrUpdateEmployee}>
                        <h2>{editingEmployee ? 'Chỉnh sửa Thông tin Nhân viên' : 'Thêm Nhân viên Mới'}</h2>
                        <div className="form-grid">
                            <div className="formGroup">
                                <label>Họ và tên:</label>
                                <input type="text" name="name" value={newEmployee.name} onChange={handleInputChange} required />
                            </div>
                            <div className="formGroup">
                                <label>Ngày sinh:</label>
                                <input type="date" name="dob" value={newEmployee.dob} onChange={handleInputChange} required />
                            </div>
                            <div className="formGroup">
                                <label>Giới tính:</label>
                                <select name="gender" value={newEmployee.gender} onChange={handleInputChange}>
                                    <option value="Nam">Nam</option>
                                    <option value="Nữ">Nữ</option>
                                    <option value="Khác">Khác</option>
                                </select>
                            </div>
                            <div className="formGroup">
                                <label>Số điện thoại:</label>
                                <input type="tel" name="phone" value={newEmployee.phone} onChange={handleInputChange} required />
                            </div>
                            <div className="formGroup">
                                <label>Email:</label>
                                <input type="email" name="email" value={newEmployee.email} onChange={handleInputChange} required />
                            </div>
                            <div className="formGroup">
                                <label>Địa chỉ:</label>
                                <input type="text" name="address" value={newEmployee.address} onChange={handleInputChange} required />
                            </div>
                            <div className="formGroup">
                                <label>Vị trí (Vai trò):</label>
                                <select name="position" value={newEmployee.position} onChange={handleInputChange}>
                                    <option value="Staff">Nhân viên (Staff)</option>
                                    <option value="Admin">Quản trị viên (Admin)</option>
                                </select>
                            </div>
                            <div className="formGroup">
                                <label>Nhóm máu:</label>
                                <select name="bloodGroup" value={newEmployee.bloodGroup} onChange={handleInputChange}>
                                    <option value="None">Chưa rõ</option>
                                    <option value="A_POS">A+</option>
                                    <option value="A_NEG">A-</option>
                                    <option value="B_POS">B+</option>
                                    <option value="B_NEG">B-</option>
                                    <option value="AB_POS">AB+</option>
                                    <option value="AB_NEG">AB-</option>
                                    <option value="O_POS">O+</option>
                                    <option value="O_NEG">O-</option>
                                </select>
                            </div>
                        </div>
                        <div className="formActions">
                            <button type="submit" className="submitButton">
                                {editingEmployee ? 'Cập nhật' : 'Thêm'}
                            </button>
                            <button type="button" className="cancelButton" onClick={() => setShowAddForm(false)}>
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="employeeTableContainer">
                {loading ? (
                    <p>Đang tải dữ liệu...</p>
                ) : error ? (
                    <div className="error-message">Lỗi: {error}</div>
                ) : (
                    <table className="employeeTable">
                        <thead>
                            <tr>
                                <th>Mã NV</th>
                                <th>Họ và tên</th>
                                <th>Email</th>
                                <th>SĐT</th>
                                <th>Địa chỉ</th>
                                <th>Vị trí</th>
                                <th>Nhóm máu</th>
                                <th>Hành động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {employees.map((employee) => (
                                <tr key={employee.id}>
                                    <td>{employee.id}</td>
                                    <td>{employee.name}</td>
                                    <td>{employee.email}</td>
                                    <td>{employee.phone}</td>
                                    <td>{employee.address}</td>
                                    <td>{employee.position}</td>
                                    <td>{mapBloodTypeToDisplay(employee.bloodGroup)}</td>
                                    <td className="actionsCell">
                                        <button className="editButton" onClick={() => handleEditEmployee(employee)}>Sửa</button>
                                        <button className="deleteButton" onClick={() => handleDeleteEmployee(employee.id)}>Xóa</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default EmployeeManagement;
