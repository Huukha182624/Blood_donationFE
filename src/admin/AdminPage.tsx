import React, { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../store/userStore.jsx";
import Sidebar from "./components/Sidebar/Sidebar";
import MainInforPage from "./components/Dashboard/Dashboard";
import BloodRequestPage from "./components/BloodRequestPage";

const AdminPage: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  // Check quyền admin
  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    }
  }, [user, navigate]);

  // Map path sang tên hiển thị để highlight tab
  const mapPathToTabName = (pathname: string): string => {
    if (pathname === "/admin") return "Trang tổng quan";
    if (pathname.includes("nguoi-hien-mau")) return "Quản lý người hiến máu";
    if (pathname.includes("lich-hen")) return "Lịch hẹn người hiến máu";
    if (pathname.includes("kho-mau")) return "Quản lý kho máu";
    if (pathname.includes("thong-ke")) return "Báo cáo & thống kê";
    if (pathname.includes("su-kien")) return "Tổ chức sự kiện hiến máu";
    if (pathname.includes("nhan-su")) return "Quản lý nhân sự";
    if (pathname.includes("cai-dat")) return "Cài đặt hệ thống";
    return "";
  const handleSidebarItemClick = (itemName: string) => {
    setActiveSidebarItem(itemName);
  };
  const renderMainContent = () => {
    switch (activeSidebarItem) {
      case "Trang tổng quan":
        return <MainInforPage />;
      case "Quản lý người hiến máu":
        return <DonorManagementPage />;
      case "Lịch hẹn người hiến máu":
        return <AppointmentManagement />;
      case "Quản lý kho máu":
        return <BloodManagePage />;
      case "Đơn cần máu":
        return <BloodRequestPage />;
      case "Báo cáo & thống kê":
        return (
          <div style={{ padding: "20px" }}>
            <h1
              style={{
                color: "#333",
                borderBottom: "2px solid #E74C3C",
                paddingBottom: "10px",
              }}
            >
              📈 Báo cáo & thống kê
            </h1>
            <p>Nội dung báo cáo và thống kê sẽ hiển thị ở đây.</p>
          </div>
        );
      case "Tổ chức sự kiện hiến máu":
        return <EventPage />;
      case "Quản lý nhân sự":
        return <EmployeeManagement />;
      case "Cài đặt hệ thống":
        return (
          <div style={{ padding: "20px" }}>
            <h1
              style={{
                color: "#333",
                borderBottom: "2px solid #E74C3C",
                paddingBottom: "10px",
              }}
            >
              ⚙️ Cài đặt hệ thống
            </h1>
            <p>Nội dung cài đặt hệ thống sẽ hiển thị ở đây.</p>
          </div>
        );
      default:
        return (
          <div style={{ padding: "20px", color: "#E74C3C" }}>
            Trang không tìm thấy.
          </div>
        );
    }
  };

  const activeSidebarItem = mapPathToTabName(location.pathname);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <div style={{ display: "flex", flexGrow: 1, height: "100vh" }}>
        {/* Sidebar */}
        <div style={{ position: "fixed", left: 0, bottom: 0, zIndex: 999, minWidth: "250px" }}>
          <Sidebar
            onItemClick={() => {}}
            activeItem={activeSidebarItem}
            adminName={user?.full_name || "Admin"}
            adminEmail={user?.email || "admin@example.com"}
            adminAvatarUrl={user?.avatar_image || ""}
          />
        </div>

        {/* Main content */}
        <main
          style={{
            flexGrow: 1,
            padding: "20px 40px",
            backgroundColor: "#F5F5F5",
            overflowY: "auto",
            marginLeft: "250px",
            height: "100vh",
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
