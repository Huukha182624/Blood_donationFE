import React from "react";
import BloodDonationChart from "./BloodDonationChart";

const MainInforPage: React.FC = () => {
  return (
    <div style={{
      flexGrow: 1, // Để phần nội dung này chiếm hết không gian còn lại
      padding: "20px 40px", // Padding xung quanh nội dung
      backgroundColor: "#F5F5F5", // Màu nền nhẹ nhàng cho trang tổng quan
      overflowY: "auto", // Cho phép cuộn nếu nội dung dài
    }}>
      <h1 style={{
        color: "#333333", // Màu chữ xám đậm
        marginBottom: "30px",
        fontSize: "2rem",
        fontWeight: "600",
        borderBottom: "2px solid #E74C3C", // Đường kẻ dưới tiêu đề màu đỏ
        paddingBottom: "10px",
      }}>
        <span role="img" aria-label="dashboard-icon"></span> Tổng quan
      </h1>

      <div style={{
        display: "grid", // Sử dụng CSS Grid để tạo bố cục các thẻ
        gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", // Tự động điều chỉnh số cột
        gap: "25px", // Khoảng cách giữa các thẻ
      }}>
        {/* Thẻ thông tin: Tổng số người hiến máu */}
        <div style={{
          backgroundColor: "#FFFFFF", // Nền trắng cho thẻ
          padding: "25px",
          borderRadius: "8px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)", // Đổ bóng mạnh hơn cho thẻ
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          transition: "transform 0.2s ease-in-out", // Hiệu ứng khi hover
        }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <h2 style={{ color: "#E74C3C", fontSize: "1.5rem", marginBottom: "10px" }}>Tổng người hiến máu</h2>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#333333" }}>15,000+</p>
          <p style={{ fontSize: "0.9rem", color: "#666666" }}>(Tính đến hôm nay)</p>
        </div>

        {/* Thẻ thông tin: Lượng máu thu được */}
        <div style={{
          backgroundColor: "#FFFFFF",
          padding: "25px",
          borderRadius: "8px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          transition: "transform 0.2s ease-in-out",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <h2 style={{ color: "#E74C3C", fontSize: "1.5rem", marginBottom: "10px" }}>Lượng máu thu được</h2>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#333333" }}>3,200 Lít</p>
          <p style={{ fontSize: "0.9rem", color: "#666666" }}>(Trong tháng này)</p>
        </div>

        {/* Thẻ thông tin: Lịch hẹn sắp tới */}
        <div style={{
          backgroundColor: "#FFFFFF",
          padding: "25px",
          borderRadius: "8px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          transition: "transform 0.2s ease-in-out",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <h2 style={{ color: "#E74C3C", fontSize: "1.5rem", marginBottom: "10px" }}>Lịch hẹn sắp tới</h2>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#333333" }}>120</p>
          <p style={{ fontSize: "0.9rem", color: "#666666" }}>(Trong tuần tới)</p>
        </div>

        {/* Thẻ thông tin: Sự kiện sắp diễn ra */}
        <div style={{
          backgroundColor: "#FFFFFF",
          padding: "25px",
          borderRadius: "8px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          transition: "transform 0.2s ease-in-out",
        }}
          onMouseEnter={(e) => { e.currentTarget.style.transform = "translateY(-5px)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; }}
        >
          <h2 style={{ color: "#E74C3C", fontSize: "1.5rem", marginBottom: "10px" }}>Sự kiện sắp diễn ra</h2>
          <p style={{ fontSize: "2.5rem", fontWeight: "bold", color: "#333333" }}>5</p>
          <p style={{ fontSize: "0.9rem", color: "#666666" }}>("Giọt Hồng Trao Yêu Thương" &amp; 4 khác)</p>
        </div>

        {/* Bạn có thể thêm các thẻ khác tại đây */}
        <div style={{
          gridColumn: "1 / -1", // Thẻs này sẽ chiếm toàn bộ chiều rộng
          backgroundColor: "#FFFFFF",
          padding: "25px",
          borderRadius: "8px",
          boxShadow: "0 4px 15px rgba(0, 0, 0, 0.08)",
        }}>
          <h2 style={{ color: "#E74C3C", fontSize: "1.5rem", marginBottom: "15px" }}>Biểu đồ thống kê</h2>
          <div style={{ maxWidth: "100%", overflowX: "auto" }}>
            <BloodDonationChart />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainInforPage;