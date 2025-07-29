import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ScheduleForm from "../components/Schedule";
import HealthScreeningForm from "./RegisterForm";
import { searchCampaignsByDate } from '../services/blood-donation-campaign';
import { format, isValid } from 'date-fns'; // MỚI: import

// MỚI: Hàm để định dạng ngày hoạt động
function formatActiveTime(dateString) {
    if (!dateString) {
        return 'N/A';
    }
    const date = new Date(dateString);
    if (isValid(date)) {
        return format(date, 'dd/MM/yyyy');
    }
    return 'Ngày không hợp lệ';
}

function useQuery() {
    return new URLSearchParams(useLocation().search);
}

function formatDonateTime(donateTime) {
    // 1. Trả về chuỗi rỗng nếu không có dữ liệu
    if (!donateTime) {
        return '';
    }

    // 2. MỚI: Xử lý định dạng object {"sang": "...", "chieu": "..."}
    // Dùng try-catch để phòng trường hợp chuỗi không phải là JSON hợp lệ
    let timeObject = null;
    if (typeof donateTime === 'string') {
        try {
            timeObject = JSON.parse(donateTime);
        } catch (e) {
            // Nếu không phải JSON, có thể là chuỗi thường, sẽ được xử lý ở dưới
        }
    } else if (typeof donateTime === 'object' && donateTime !== null) {
        timeObject = donateTime;
    }

    if (timeObject && (timeObject.sang || timeObject.chieu)) {
        const parts = [];
        if (timeObject.sang) {
            parts.push(`Sáng: ${timeObject.sang}`);
        }
        if (timeObject.chieu) {
            parts.push(`Chiều: ${timeObject.chieu}`);
        }
        return parts.join(', ');
    }
    
    // 3. Giữ lại logic cũ để xử lý trường hợp là chuỗi đơn giản
    if (typeof donateTime === 'string') {
        return donateTime;
    }

    // 4. Giữ lại logic cũ để xử lý trường hợp là mảng
    if (Array.isArray(donateTime) && donateTime.length > 0) {
        return donateTime
            .map(slot => (slot.start && slot.end) ? `${slot.start} - ${slot.end}` : '')
            .filter(Boolean)
            .join(', ');
    }
    
    // 5. Giữ lại logic cũ để xử lý trường hợp là một đối tượng đơn lẻ {start, end}
    if (typeof donateTime === 'object' && donateTime.start && donateTime.end) {
        return `${donateTime.start} - ${donateTime.end}`;
    }

    // 6. Dự phòng cuối cùng
    return 'N/A';
}

function Events() {
    const query = useQuery();
    const start = query.get("start");
    const end = query.get("end");
    const [showMedicalForm, setShowMedicalForm] = useState(false);
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);

    const startDate = start ? new Date(start) : null;
    const endDate = end ? new Date(end) : null;

    // ... các useEffect và hàm xử lý giữ nguyên
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

    const handleOpenForm = (event) => {
        setSelectedCampaign(event);
        setShowMedicalForm(true);
    };

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
                            {/* CẬP NHẬT Ở ĐÂY */}
                            <div style={{ color: "#555" }}>Thời gian hoạt động: {formatActiveTime(event.activeTime)}</div>
                            <div style={{ color: "#555" }}>Thời gian hiến máu: {formatDonateTime(event.donateTime)}</div>
                        </div>
                        {/* ... phần còn lại của JSX */}
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
                    top: 0, left: 0,
                    width: "100vw", height: "100vh",
                    background: "rgba(0,0,0,0.4)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    zIndex: 1000
                }}>
                    <button
                        onClick={handleCloseForm}
                        style={{
                            position: "fixed", top: 32, right: 32,
                            background: "#eee", border: "none", borderRadius: "50%",
                            width: 40, height: 40,
                            fontSize: 24, cursor: "pointer", zIndex: 1100
                        }}
                    >
                        ×
                    </button>
                    <div style={{
                        background: "#fff", borderRadius: 8, padding: 24,
                        maxWidth: 700, width: "90%",
                        position: "relative", maxHeight: "90vh", overflowY: "auto"
                    }}>
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