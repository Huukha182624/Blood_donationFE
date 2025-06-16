import React, { useState } from 'react';
import './EmployeeManagement.css';

interface Employee {
    id: string;
    fullName: string;
    dateOfBirth: string;
    gender: 'Nam' | 'Nữ' | 'Khác';
    phone: string;
    email: string;
    position: string;
    department: string;
    bloodGroup: string;
    rhFactor: 'Rh+' | 'Rh-';
    username: string;
    accessLevel: string;
}

const initialEmployees: Employee[] = [
    {
        id: 'NV001',
        fullName: 'Nguyễn Văn A',
        dateOfBirth: '1990-05-15',
        gender: 'Nam',
        phone: '0901234567',
        email: 'anv@bloodcenter.vn',
        position: 'Y tá',
        department: 'Phòng Tiếp nhận',
        bloodGroup: 'A',
        rhFactor: 'Rh+',
        username: 'anv',
        accessLevel: 'Nhập liệu & Tiếp nhận',
    },
    {
        id: 'NV002',
        fullName: 'Trần Thị B',
        dateOfBirth: '1988-11-20',
        gender: 'Nữ',
        phone: '0907654321',
        email: 'btt@bloodcenter.vn',
        position: 'Bác sĩ',
        department: 'Phòng Khám sàng lọc',
        bloodGroup: 'O',
        rhFactor: 'Rh+',
        username: 'btt',
        accessLevel: 'Y tế & Xét nghiệm',
    },
    {
        id: 'NV003',
        fullName: 'Lê Văn C',
        dateOfBirth: '1995-03-01',
        gender: 'Nam',
        phone: '0912345678',
        email: 'cvl@bloodcenter.vn',
        position: 'Điều phối viên',
        department: 'Phòng Điều phối',
        bloodGroup: 'B',
        rhFactor: 'Rh-',
        username: 'cvl',
        accessLevel: 'Quản lý chiến dịch',
    },
    {
        "id": "NV004",
        "fullName": "Nguyễn Thị D",
        "dateOfBirth": "1992-07-15",
        "gender": "Nữ",
        "phone": "0934567890",
        "email": "dnt@bloodcenter.vn",
        "position": "Bác sĩ",
        "department": "Phòng Y tế",
        "bloodGroup": "A",
        "rhFactor": "Rh+",
        "username": "dnt",
        "accessLevel": "Quản lý hiến máu"
    },
    {
        "id": "NV005",
        "fullName": "Phạm Văn E",
        "dateOfBirth": "1989-11-21",
        "gender": "Nam",
        "phone": "0987654321",
        "email": "evp@bloodcenter.vn",
        "position": "Nhân viên kỹ thuật",
        "department": "Phòng Xét nghiệm",
        "bloodGroup": "O",
        "rhFactor": "Rh+",
        "username": "evp",
        "accessLevel": "Xét nghiệm"
    },
    {
        "id": "NV006",
        "fullName": "Trần Thị F",
        "dateOfBirth": "1996-04-30",
        "gender": "Nữ",
        "phone": "0978123456",
        "email": "ftt@bloodcenter.vn",
        "position": "Thư ký",
        "department": "Văn phòng",
        "bloodGroup": "AB",
        "rhFactor": "Rh-",
        "username": "ftt",
        "accessLevel": "Nhập liệu"
    },
    {
        "id": "NV007",
        "fullName": "Đỗ Minh G",
        "dateOfBirth": "1990-10-09",
        "gender": "Nam",
        "phone": "0903456789",
        "email": "gdm@bloodcenter.vn",
        "position": "Trưởng phòng",
        "department": "Phòng Điều phối",
        "bloodGroup": "B",
        "rhFactor": "Rh+",
        "username": "gdm",
        "accessLevel": "Quản trị hệ thống"
    },
    {
        "id": "NV008",
        "fullName": "Lý Thị H",
        "dateOfBirth": "1993-12-12",
        "gender": "Nữ",
        "phone": "0967890123",
        "email": "hlt@bloodcenter.vn",
        "position": "Điều dưỡng",
        "department": "Phòng Y tế",
        "bloodGroup": "O",
        "rhFactor": "Rh-",
        "username": "hlt",
        "accessLevel": "Chăm sóc người hiến"
    }
];

const EmployeeManagement: React.FC = () => {
    const [employees, setEmployees] = useState<Employee[]>(initialEmployees);
    const [showAddForm, setShowAddForm] = useState<boolean>(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    const [newEmployee, setNewEmployee] = useState<Employee>({
        id: '',
        fullName: '',
        dateOfBirth: '',
        gender: 'Nam',
        phone: '',
        email: '',
        position: '',
        department: '',
        bloodGroup: 'A',
        rhFactor: 'Rh+',
        username: '',
        accessLevel: 'Nhập liệu & Tiếp nhận',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setNewEmployee({ ...newEmployee, [name]: value });
    };

    const handleAddEmployee = (e: React.FormEvent) => {
        e.preventDefault();
        if (editingEmployee) {
            setEmployees(
                employees.map((emp) => (emp.id === editingEmployee.id ? { ...newEmployee, id: emp.id } : emp))
            );
            setEditingEmployee(null);
        } else {
            setEmployees([...employees, { ...newEmployee, id: `NV${String(employees.length + 1).padStart(3, '0')}` }]);
        }
        setNewEmployee({
            id: '',
            fullName: '',
            dateOfBirth: '',
            gender: 'Nam',
            phone: '',
            email: '',
            position: '',
            department: '',
            bloodGroup: 'A',
            rhFactor: 'Rh+',
            username: '',
            accessLevel: 'Nhập liệu & Tiếp nhận',
        });
        setShowAddForm(false);
    };

    const handleEditEmployee = (employee: Employee) => {
        setEditingEmployee(employee);
        setNewEmployee(employee);
        setShowAddForm(true);
    };

    const handleDeleteEmployee = (id: string) => {
        if (window.confirm('Bạn có chắc chắn muốn xóa nhân viên này?')) {
            setEmployees(employees.filter((employee) => employee.id !== id));
        }
    };

    return (
        <div className={"employeeManagementContainer"}>
            <div className={"pageHeader"}>
                <h1 className={"pageTitle"}>Quản lý Nhân viên Cơ sở Hiến máu</h1>

                <button className={"addButton"} onClick={() => {
                    setShowAddForm(true);
                    setEditingEmployee(null); // Reset editing state when opening for add
                    setNewEmployee({ // Clear form fields
                        id: '', fullName: '', dateOfBirth: '', gender: 'Nam', phone: '', email: '',
                        position: '', department: '', bloodGroup: 'A', rhFactor: 'Rh+', username: '',
                        accessLevel: 'Nhập liệu & Tiếp nhận'
                    });
                }}>
                    Thêm Nhân viên Mới
                </button>
            </div>


            {showAddForm && (
                <div className={"formOverlay"}>
                    <form className={"employeeForm"} onSubmit={handleAddEmployee}>
                        <h2>{editingEmployee ? 'Chỉnh sửa Thông tin Nhân viên' : 'Thêm Nhân viên Mới'}</h2>

                        <div className={"formGroup"}>
                            <label htmlFor="fullName">Họ và tên:</label>
                            <input type="text" id="fullName" name="fullName" value={newEmployee.fullName} onChange={handleInputChange} required />
                        </div>

                        <div className={"formGroup"}>
                            <label htmlFor="dateOfBirth">Ngày sinh:</label>
                            <input type="date" id="dateOfBirth" name="dateOfBirth" value={newEmployee.dateOfBirth} onChange={handleInputChange} required />
                        </div>

                        <div className={"formGroup"}>
                            <label htmlFor="gender">Giới tính:</label>
                            <select id="gender" name="gender" value={newEmployee.gender} onChange={handleInputChange}>
                                <option value="Nam">Nam</option>
                                <option value="Nữ">Nữ</option>
                                <option value="Khác">Khác</option>
                            </select>
                        </div>

                        <div className={"formGroup"}>
                            <label htmlFor="phone">Số điện thoại:</label>
                            <input type="tel" id="phone" name="phone" value={newEmployee.phone} onChange={handleInputChange} required />
                        </div>

                        <div className={"formGroup"}>
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" name="email" value={newEmployee.email} onChange={handleInputChange} required />
                        </div>

                        <div className={"formGroup"}>
                            <label htmlFor="position">Vị trí/Chức danh:</label>
                            <input type="text" id="position" name="position" value={newEmployee.position} onChange={handleInputChange} required />
                        </div>

                        <div className={"formGroup"}>
                            <label htmlFor="department">Phòng ban/Đơn vị:</label>
                            <input type="text" id="department" name="department" value={newEmployee.department} onChange={handleInputChange} required />
                        </div>

                        <div className={"formGroup"}>
                            <label htmlFor="bloodGroup">Nhóm máu:</label>
                            <select id="bloodGroup" name="bloodGroup" value={newEmployee.bloodGroup} onChange={handleInputChange}>
                                <option value="A">A</option>
                                <option value="B">B</option>
                                <option value="O">O</option>
                                <option value="AB">AB</option>
                            </select>
                        </div>

                        <div className={"formGroup"}>
                            <label htmlFor="rhFactor">Yếu tố Rh:</label>
                            <select id="rhFactor" name="rhFactor" value={newEmployee.rhFactor} onChange={handleInputChange}>
                                <option value="Rh+">Rh+</option>
                                <option value="Rh-">Rh-</option>
                            </select>
                        </div>

                        <div className={"formGroup"}>
                            <label htmlFor="username">Tên đăng nhập:</label>
                            <input type="text" id="username" name="username" value={newEmployee.username} onChange={handleInputChange} required />
                        </div>

                        <div className={"formGroup"}>
                            <label htmlFor="accessLevel">Quyền truy cập:</label>
                            <select id="accessLevel" name="accessLevel" value={newEmployee.accessLevel} onChange={handleInputChange}>
                                <option value="Nhập liệu & Tiếp nhận">Nhập liệu & Tiếp nhận</option>
                                <option value="Y tế & Xét nghiệm">Y tế & Xét nghiệm</option>
                                <option value="Quản lý chiến dịch">Quản lý chiến dịch</option>
                                <option value="Quản trị viên">Quản trị viên</option>
                            </select>
                        </div>

                        <div className={"formActions"}>
                            <button type="submit" className={"submitButton"}>
                                {editingEmployee ? 'Cập nhật' : 'Thêm'}
                            </button>
                            <button type="button" className={"cancelButton"} onClick={() => setShowAddForm(false)}>
                                Hủy
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className={"employeeTableContainer"}>
                <table className={"employeeTable"}>
                    <thead>
                        <tr>
                            <th>Mã NV</th>
                            <th>Họ và tên</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>SĐT</th>
                            <th>Email</th>
                            <th>Vị trí</th>
                            <th>Phòng ban</th>
                            <th>Nhóm máu</th>
                            <th>Rh</th>
                            <th>Tên ĐN</th>
                            <th>Quyền truy cập</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee) => (
                            <tr key={employee.id}>
                                <td>{employee.id}</td>
                                <td>{employee.fullName}</td>
                                <td>{employee.dateOfBirth}</td>
                                <td>{employee.gender}</td>
                                <td>{employee.phone}</td>
                                <td>{employee.email}</td>
                                <td>{employee.position}</td>
                                <td>{employee.department}</td>
                                <td>{employee.bloodGroup}</td>
                                <td>{employee.rhFactor}</td>
                                <td>{employee.username}</td>
                                <td>{employee.accessLevel}</td>
                                <td className={"actionsCell"}>
                                    <button className={"editButton"} onClick={() => handleEditEmployee(employee)}>Sửa</button>
                                    <button className={"deleteButton"} onClick={() => handleDeleteEmployee(employee.id)}>Xóa</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default EmployeeManagement;