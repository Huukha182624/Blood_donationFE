import React, { useState, useMemo } from "react"; // THÊM: import useMemo
import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../../../store/userStore";

// CẬP NHẬT: Không cần truyền thông tin admin qua props nữa
// vì chúng ta sẽ lấy trực tiếp từ context
interface SidebarProps {
  onItemClick: (item: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onItemClick }) => {
  const [showAdminOptions, setShowAdminOptions] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  // CẬP NHẬT: Lấy toàn bộ đối tượng `user` và hàm `logout` từ context
  // Giả sử `user` object có dạng: { name: '...', email: '...', avatarUrl: '...', role: 'Admin' | 'Staff' }
  const { user, logout } = useUser();

  // CẬP NHẬT: Định nghĩa tất cả các item và vai trò được phép truy cập
  const allSidebarItems = [
    { name: "Trang tổng quan", icon: "🏠", path: "/admin", roles: ["Admin", "Staff"] },
    { name: "Quản lý người hiến máu", icon: "🧑‍🤝‍🧑", path: "/admin/nguoi-hien-mau", roles: ["Admin", "Staff"] },
    { name: "Lịch hẹn người hiến máu", icon: "📅", path: "/admin/lich-hen", roles: ["Admin", "Staff"] },
    { name: "Quản lý kho máu", icon: "🩸", path: "/admin/kho-mau", roles: ["Admin", "Staff"] },
    { name: "Xử lí yêu cầu máu", icon: "📈", path: "/admin/yeu-cau", roles: ["Admin", "Staff"] },
    // Chỉ Admin mới thấy 2 mục này
    { name: "Tổ chức sự kiện hiến máu", icon: "🎉", path: "/admin/su-kien", roles: ["Admin"] },
    { name: "Quản lý nhân sự", icon: "👥", path: "/admin/nhan-su", roles: ["Admin"] },
  ];

  // CẬP NHẬT: Dùng useMemo để lọc các item sidebar dựa trên vai trò của người dùng
  // Danh sách này sẽ chỉ được tính toán lại khi `user.role` thay đổi
  const sidebarItems = useMemo(() => {
    if (!user?.role) return []; // Nếu không có user hoặc role, trả về mảng rỗng
    return allSidebarItems.filter(item => item.roles.includes(user.role));
  }, [user?.role]);


  const logoUrl = "https://cdn.dribbble.com/userupload/26255768/file/original-de01cccd8c317f5acaea9f43e9b3c71f.png?resize=752x&vertical=center";

  const handleProfileClick = () => {
    setShowAdminOptions(false);
    navigate('/ho-so');
  };

  const onLogoutClick = () => {
    setShowAdminOptions(false);
    if (logout) {
      logout();
    }
    navigate('/dang-nhap');
  };

  // Nếu không có user, có thể hiển thị một sidebar rỗng hoặc loading
  if (!user) {
    return <aside className="sidebar"></aside>;
  }

  return (
    <aside className="sidebar">
      <div className="logoContainer" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
        <img src={logoUrl} alt="Company Logo" className="logo" />
      </div>

      <ul className="sidebarList">
        {/* CẬP NHẬT: Map qua danh sách đã được lọc */}
        {sidebarItems.map((item) => (
          <li
            key={item.name}
            className={`sidebarItem ${location.pathname === item.path ? "active" : ""}`}
            onClick={() => {
              onItemClick(item.name);
              navigate(item.path);
            }}
          >
            <span>{item.icon}</span>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>

      {/* CẬP NHẬT: Lấy thông tin hiển thị từ `user` context */}
      <div className="adminInfo">
        <img src={user.avatarUrl} alt={user.name} className="adminAvatar" />
        <div className="adminText">
          <div className="adminName">{user.fullName}</div>
          <div className="adminEmail">{user.email}</div>
        </div>
        <span className="settingsIcon" onClick={() => setShowAdminOptions(prev => !prev)}>
          ⚙️
        </span>
        {showAdminOptions && (
          <div className="adminOptions show">
            <div className="optionItem" onClick={handleProfileClick}>
              Xem Hồ sơ
            </div>
            <div className="optionItem" onClick={onLogoutClick}>
              Đăng xuất
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;