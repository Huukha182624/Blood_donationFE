// BloodDonationStandards.jsx
import React from "react";
import {
    FaIdCard, FaSyringe, FaVirusSlash, FaHeartbeat,
    FaWeight, FaUserAlt, FaCalendarAlt, FaVial
} from "react-icons/fa";
import "./BloodDonationStandards.css";
import donationImg from "../assets/Standards.jpg"; // Đặt đúng tên file ảnh

const standards = [
    { icon: <FaIdCard />, text: "Mang theo chứng minh nhân dân/hộ chiếu" },
    { icon: <FaVirusSlash />, text: "Không mắc hoặc không có các hành vi nguy cơ lây nhiễm HIV, không nhiễm viêm gan B, viêm gan C, và các virus lây qua đường truyền máu", colSpan: 2 },
    { icon: <FaSyringe />, text: "Không nghiện ma túy, rượu bia và các chất kích thích" },
    { icon: <FaWeight />, text: "Cân nặng: Nam ≥ 45 kg Nữ ≥ 45 kg", column: 1 },
    { icon: <FaHeartbeat />, text: "Không mắc các bệnh mãn tính hoặc cấp tính về tim mạch, huyết áp, hô hấp, dạ dày..." },
    { icon: <FaVial />, text: "Chỉ số huyết sắc tố (Hb) ≥120g/l (≥125g/l nếu hiến từ 350ml trở lên)." },
    { icon: <FaUserAlt />, text: "Người khỏe mạnh trong độ tuổi từ đủ 18 đến 60 tuổi", column: 1 },
    { icon: <FaCalendarAlt />, text: "Thời gian tối thiểu giữa 2 lần hiến máu là 12 tuần đối với cả Nam và Nữ" },
    { icon: <FaVial />, text: "Kết quả test nhanh âm tính với kháng nguyên bề mặt của siêu vi B" },
];

const BloodDonationStandards = () => {
    return (
        <div className="standards-grid">
            {/* Cột 1 */}
            <div className="column column-1">
                <div className="image-box">
                    <img src={donationImg} alt="Blood Donation" />
                    <div className="title-overlay">Tiêu chuẩn tham gia hiến máu</div>
                </div>
                {standards
                    .filter((item) => item.column === 1)
                    .map((item, idx) => (
                        <div className="standard-card" key={`col1-${idx}`}>
                            <div className="icon">{item.icon}</div>
                            <p>{item.text}</p>
                        </div>
                    ))}
            </div>

            {/* Cột 2 */}
            <div className="column column-2">
                {standards
                    .filter((item) => !item.column && !item.colSpan)
                    .slice(0, 4)
                    .map((item, idx) => (
                        <div className="standard-card" key={`col2-${idx}`}>
                            <div className="icon">{item.icon}</div>
                            <p>{item.text}</p>
                        </div>
                    ))}
            </div>

            {/* Cột 3 */}
            <div className="column column-3">
                {standards
                    .filter((item) => !item.column && !item.colSpan)
                    .slice(4)
                    .concat(standards.filter((item) => item.colSpan === 2))
                    .map((item, idx) => (
                        <div
                            className={`standard-card ${item.colSpan === 2 ? "wide-card" : ""}`}
                            key={`col3-${idx}`}
                        >
                            <div className="icon">{item.icon}</div>
                            <p>{item.text}</p>
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default BloodDonationStandards;
