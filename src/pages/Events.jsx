import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScheduleForm from "../components/Schedule";
// Đổi tên import để rõ ràng hơn
import HealthScreeningForm from "./RegisterForm"; 
import { searchCampaignsByDate } from '../services/blood-donation-campaign';

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function formatDonateTime(donateTime) {
    if (!donateTime) return '';
    if (typeof donateTime === 'string') return donateTime;
    if (typeof donateTime === 'object' && donateTime.start && donateTime.end) {
        return `${donateTime.start} - ${donateTime.end}`;
    }
    return JSON.stringify(donateTime);
}

function Events() {
    const query = useQuery();
    const start = query.get("start");
    const end = query.get("end");
    const [showMedicalForm, setShowMedicalForm] = useState(false);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    // CẬP NHẬT: State để lưu sự kiện được chọn
    const [selectedCampaign, setSelectedCampaign] = useState(null);

    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    useEffect(() => {
        async function fetchEvents() {
            if (start && end) {
                setLoading(true);
                try {
                    const data = await searchCampaignsByDate(start, end);
                    setEvents(Array.isArray(data) ? data : []);
                } catch (e) {
                    setEvents([]);
                }
                setLoading(false);
            } else {
                setEvents([]);
            }
        }
        fetchEvents();
    }, [start, end]);

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

    // CẬP NHẬT: Hàm để mở form và lưu sự kiện đã chọn
    const handleOpenForm = (event) => {
        setSelectedCampaign(event);
        setShowMedicalForm(true);
    };

    // CẬP NHẬT: Hàm để đóng form và reset sự kiện đã chọn
    const handleCloseForm = () => {
        setShowMedicalForm(false);
        setSelectedCampaign(null);
    };

    return (
        <div>
            <Navbar />
            <ScheduleForm startDate={startDate} endDate={endDate} />
            <h2 style={{ margin: "24px 0" }}>
                Kết quả 
                {events.length > 0 && (
                    <span style={{ color: "#000", fontWeight: 500, marginLeft: 12 }}>
                        ({events.length})
                    </span>
                )}
            </h2>
            <div style={{ background: "#f7fafd", padding: 24 }}>
                {loading ? (
                    <div>Đang tải dữ liệu...</div>
                ) : events.length === 0 ? (
                    <div>Không có sự kiện nào trong khoảng thời gian này.</div>
                ) : events.map(event => (
                    <div key={event.id} style={{
                        display: "flex",
                        alignItems: "center",
                        background: "#fff",
                        borderRadius: 8,
                        marginBottom: 16,
                        boxShadow: "0 2px 8px #eee"
                    }}>
                        <img src={event.logo || "/logo.png"} alt="logo" style={{ width: 100, height: 100, margin: 24 }} />
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: "bold", fontSize: 18, color: "#1976d2", marginBottom: 8 }}>
                                {event.name}
                            </div>
                            <div style={{ color: "#555" }}>Địa chỉ: {event.address}</div>
                            <div style={{ color: "#555" }}>Thời gian hoạt động: {event.activeTime}</div>
                            <div style={{ color: "#555" }}>Thời gian hiến máu: {formatDonateTime(event.donateTime)}</div>
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
                                // CẬP NHẬT: Gọi hàm handleOpenForm và truyền vào event
                                onClick={() => handleOpenForm(event)}
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
                    <button
                        // CẬP NHẬT: Gọi hàm handleCloseForm
                        onClick={handleCloseForm}
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
                        {/* CẬP NHẬT: Truyền prop vào form */}
                        <HealthScreeningForm 
                            selectedCampaign={selectedCampaign}
                            onClose={handleCloseForm}
                        />
                    </div>
                </div>
            )}
            <Footer />
        </div>
    );
}

export default Events;
