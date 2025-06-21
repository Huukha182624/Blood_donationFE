import { Dashboard } from "@mui/icons-material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../store/userStore.jsx";
import AppointmentManagement from "./components/Appointment/AppointmentManagement";
import BloodManagePage from "./components/Bloodmanage/BloodManagePage";
import DonorManagementPage from "./components/Donormanage/DonorManagement";
import EmployeeManagement from "./components/EmployeeManagement/EmployeeManagement";
import EventPage from "./components/Event/EventPage";
import Sidebar from "./components/Sidebar/Sidebar";
import MainInforPage from "./components/Dashboard/Dashboard";
import BloodRequestPage from "./components/BloodRequestPage";

const AdminPage: React.FC = () => {
  const [activeSidebarItem, setActiveSidebarItem] = useState("Trang tổng quan");
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/');
    }
  }, [user, navigate]);

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

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div
        style={{
          display: "flex",
          flexGrow: 1,
          //   marginTop: "60px", // Adjust this value to match your Navbar's height
          height: "calc(100vh - 60px)", // Occupy remaining height
        }}
      >
        <div
          style={{
            position: "fixed",
            // top: "60px", 
            left: 0,
            bottom: 0,
            zIndex: 999, // Below Navbar but above main content
            minWidth: "250px", // Assuming your sidebar has a fixed width         
          }}
        >
          <Sidebar
            onItemClick={handleSidebarItemClick}
            activeItem={activeSidebarItem} adminName={user?.full_name || "Admin"} adminEmail={user?.email || "Admin"} adminAvatarUrl={user?.avatar_image || undefined} />
        </div>

        {/* Main content area */}
        <main
          style={{
            flexGrow: 1,
            padding: "20px 40px",
            backgroundColor: "#F5F5F5",
            overflowY: "auto",
            marginLeft: "250px",
          }}
        >
          {renderMainContent()}
        </main>
      </div>
    </div>
  );
};

export default AdminPage;