import React, { useState } from "react";
import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";

// Định nghĩa kiểu cho props của Sidebar
interface SidebarProps {
  onItemClick: (item: string) => void;
  activeItem: string;
  adminName: string;
  adminEmail: string;
  adminAvatarUrl: string;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
  onViewProfileClick?: () => void;
}



const Sidebar: React.FC<SidebarProps> = ({
  onItemClick,
  activeItem,
  adminName,
  adminEmail,
  adminAvatarUrl,
  onSettingsClick,
  onLogoutClick,
  onViewProfileClick,
}) => {
  const [showAdminOptions, setShowAdminOptions] = useState(false);

  // ✅ Di chuyển hook vào trong component
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { name: "Trang tổng quan", icon: "🏠", path: "/admin" },
    { name: "Quản lý người hiến máu", icon: "🧑‍🤝‍🧑", path: "/admin/nguoi-hien-mau" },
    { name: "Lịch hẹn người hiến máu", icon: "📅", path: "/admin/lich-hen" },
    { name: "Quản lý kho máu", icon: "🩸", path: "/admin/kho-mau" },
    { name: "Báo cáo & thống kê", icon: "📈", path: "/admin/thong-ke" },
    { name: "Tổ chức sự kiện hiến máu", icon: "🎉", path: "/admin/su-kien" },
    { name: "Quản lý nhân sự", icon: "👥", path: "/admin/nhan-su" },
    { name: "Cài đặt hệ thống", icon: "⚙️", path: "/admin/cai-dat" },
  ];

  const logoUrl = "https://cdn.dribbble.com/userupload/26255768/file/original-de01cccd8c317f5acaea9f43e9b3c71f.png?resize=752x&vertical=center";

  const handleSettingsClick = () => {
    setShowAdminOptions((prev) => !prev);
    onSettingsClick?.();
  };

  return (
    <aside className="sidebar">
      <div className="logoContainer">
        <img src={logoUrl} alt="Company Logo" className="logo" />
      </div>

      <ul className="sidebarList">
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

      <div className="adminInfo">
        <img src={adminAvatarUrl} alt={adminName} className="adminAvatar" />
        <div className="adminText">
          <div className="adminName">{adminName}</div>
          <div className="adminEmail">{adminEmail}</div>
        </div>
        <span className="settingsIcon" onClick={handleSettingsClick}>
          ⚙️
        </span>
        {showAdminOptions && (
          <div className="adminOptions show">
            <div className="optionItem" onClick={onViewProfileClick}>
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
