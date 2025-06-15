import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScheduleForm from "../components/Schedule";
import MedicalForm from "./RegisterForm";

// Data mẫu
const eventsData = [
    {
        id: 1,
        name: "Hiến máu - 466 Nguyễn Thị minh Khai (thời gian làm việc từ 7g đến 11g)",
        address: "466 Nguyễn Thị Minh Khai Phường 02, Quận 3, Tp Hồ Chí Minh",
        activeTime: "19/06/2025 - Từ 07:00 đến 11:30",
        donateTime: "07:00 - 11:00",
        registered: 7,
        max: 150,
        logo: "/logo.png", // Đổi thành đường dẫn logo thật nếu có
    },
    {
        id: 2,
        name: "Hiến máu - Trung Tâm Hiến Máu Nhân Đạo Tp.HCM",
        address: "106 Thiên Phước, Phường 9, Quận Tân Bình, TP.HCM",
        activeTime: "19/06/2025 - Từ 07:00 đến 16:30",
        donateTime: "07:00 - 11:00; 13:00 - 16:00",
        registered: 4,
        max: 150,
        logo: "/logo.png",
    },
    {
        id: 1,
        name: "Hiến máu - 466 Nguyễn Thị minh Khai (thời gian làm việc từ 7g đến 11g)",
        address: "466 Nguyễn Thị Minh Khai Phường 02, Quận 3, Tp Hồ Chí Minh",
        activeTime: "19/06/2025 - Từ 07:00 đến 11:30",
        donateTime: "07:00 - 11:00",
        registered: 7,
        max: 150,
        logo: "/logo.png", // Đổi thành đường dẫn logo thật nếu có
    },
    {
        id: 2,
        name: "Hiến máu - Trung Tâm Hiến Máu Nhân Đạo Tp.HCM",
        address: "106 Thiên Phước, Phường 9, Quận Tân Bình, TP.HCM",
        activeTime: "19/06/2025 - Từ 07:00 đến 16:30",
        donateTime: "07:00 - 11:00; 13:00 - 16:00",
        registered: 4,
        max: 150,
        logo: "/logo.png",
    },

    // Thêm các sự kiện khác nếu muốn
];

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function Events() {
    const query = useQuery();
    const start = query.get("start");
    const end = query.get("end");
    const [showMedicalForm, setShowMedicalForm] = useState(false);

    // Chặn scroll màn hình chính khi mở popup
    useEffect(() => {
        if (showMedicalForm) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [showMedicalForm]);

    // Nếu muốn lọc theo ngày, bạn có thể xử lý ở đây (bỏ qua nếu chỉ demo)
    // const filteredEvents = eventsData.filter(...);

    return (
        <div>
            <Navbar />
            <ScheduleForm />
            <h2 style={{ margin: "24px 0" }}>Kết quả tìm kiếm sự kiện hiến máu</h2>
            <div style={{ background: "#f7fafd", padding: 24 }}>
                {eventsData.map(event => (
                    <div key={event.id} style={{
                        display: "flex",
                        alignItems: "center",
                        background: "#fff",
                        borderRadius: 8,
                        marginBottom: 16,
                        boxShadow: "0 2px 8px #eee"
                    }}>
                        <img src={event.logo} alt="logo" style={{ width: 100, height: 100, margin: 24 }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: "bold", fontSize: 18, color: "#1976d2", marginBottom: 8 }}>
                                {event.name}
                            </div>
                            <div style={{ color: "#555" }}>Địa chỉ: {event.address}</div>
                            <div style={{ color: "#555" }}>Thời gian hoạt động: {event.activeTime}</div>
                            <div style={{ color: "#555" }}>Thời gian hiến máu: {event.donateTime}</div>
                        </div>
                        <div style={{ minWidth: 160, textAlign: "center", marginRight: 24 }}>
                            <div style={{ color: "#888", fontSize: 14 }}>Số lượng đăng ký</div>
                            <div style={{ fontWeight: "bold", fontSize: 22, color: "#1976d2" }}>
                                {event.registered}/{event.max} <span style={{ fontSize: 14 }}>Người</span>
                            </div>
                            <button
                                style={{
                                    marginTop: 12,
                                    background: "#1976d2",
                                    color: "#fff",
                                    border: "none",
                                    borderRadius: 4,
                                    padding: "8px 24px",
                                    cursor: "pointer"
                                }}
                                onClick={() => setShowMedicalForm(true)}
                            >
                                Đặt lịch
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Popup MedicalForm */}
            {showMedicalForm && (
                <div style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000
                }}>
                    {/* Nút đóng ở góc phải màn hình */}
                    <button
                        onClick={() => setShowMedicalForm(false)}
                        style={{
                            position: "fixed",
                            top: 32,
                            right: 32,
                            background: "#eee",
                            border: "none",
                            borderRadius: "50%",
                            width: 40,
                            height: 40,
                            fontSize: 24,
                            cursor: "pointer",
                            zIndex: 1100
                        }}
                    >
                        ×
                    </button>
                    <div style={{
                        background: "#fff",
                        borderRadius: 8,
                        padding: 24,
                        maxWidth: 700,
                        width: "90%",
                        position: "relative",
                        maxHeight: "90vh",
                        overflowY: "auto"
                    }}>
                        <MedicalForm />
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Events;
