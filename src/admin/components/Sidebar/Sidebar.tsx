import React, { useState } from "react";
import "./Sidebar.css"; // Import CSS Module

// Định nghĩa kiểu cho props của Sidebar
interface SidebarProps {
  onItemClick: (item: string) => void;
  activeItem: string;
  // Thêm props cho thông tin admin
  adminName: string;
  adminEmail: string;
  adminAvatarUrl: string; // URL của ảnh đại diện admin
  onSettingsClick?: () => void; // Optional: Hàm xử lý khi click vào biểu tượng cài đặt
  onLogoutClick?: () => void; // New: Hàm xử lý khi click Logout
  onViewProfileClick?: () => void; // New: Hàm xử lý khi click View Profile
}



const Sidebar: React.FC<SidebarProps> = ({
  onItemClick,
  activeItem,
  adminName,
  adminEmail,
  adminAvatarUrl,
  onSettingsClick,
  onLogoutClick, // Destructure new props
  onViewProfileClick, // Destructure new props
}) => {
  // State để điều khiển việc hiển thị các tùy chọn của admin
  const [showAdminOptions, setShowAdminOptions] = useState(false);

  // Danh sách các mục Sidebar được định nghĩa rõ ràng
  const sidebarItems = [
    { name: "Trang tổng quan", icon: "🏠" },
    { name: "Quản lý người hiến máu", icon: "🧑‍🤝‍🧑" },
    { name: "Lịch hẹn người hiến máu", icon: "📅" },
    { name: "Quản lý kho máu", icon: "🩸" },
    { name: "Báo cáo & thống kê", icon: "📈" },
    { name: "Tổ chức sự kiện hiến máu", icon: "🎉" },
    { name: "Quản lý nhân sự", icon: "👥" },
    { name: "Cài đặt hệ thống", icon: "⚙️" },
    { name: "📥 Đơn cần máu", icon: "📥" },
  ];

  const logoUrl = "https://cdn.dribbble.com/userupload/26255768/file/original-de01cccd8c317f5acaea9f43e9b3c71f.png?resize=752x&vertical=center";

  // Hàm xử lý khi click vào biểu tượng cài đặt
  const handleSettingsClick = () => {
    setShowAdminOptions((prev) => !prev); // Đảo ngược trạng thái hiển thị
    onSettingsClick?.(); // Gọi hàm onSettingsClick nếu có
  };

  return (
    <aside className={"sidebar"}>
      <div className={"logoContainer"}>
        <img src={logoUrl} alt="Company Logo" className={"logo"} />
      </div>

      <ul className={"sidebarList"}>
        {sidebarItems.map((item) => (
          <li
            key={item.name}
            className={`${"sidebarItem"} ${activeItem === item.name ? "active" : ''}`}
            onClick={() => onItemClick(item.name)}
          >
            <span role="img" aria-label={item.name}>{item.icon}</span>
            <span>{item.name}</span>
          </li>
        ))}
      </ul>

      <div className={"adminInfo"}>
        <img src={adminAvatarUrl} alt={adminName} className={"adminAvatar"} />
        <div className={"adminText"}>
          <div className={"adminName"}>{adminName}</div>
          <div className={"adminEmail"}>{adminEmail}</div>
        </div>
        <span className={"settingsIcon"} onClick={handleSettingsClick}>
          ⚙️
        </span>
        {showAdminOptions && (
          <div className={`adminOptions ${showAdminOptions ? "show" : ""}`}>
            <div className={"optionItem"} onClick={onViewProfileClick}>
              Xem Hồ sơ
            </div>
            <div className={"optionItem"} onClick={onLogoutClick}>
              Đăng xuất
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;