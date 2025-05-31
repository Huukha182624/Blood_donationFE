import React from 'react';
import { FaIdCard, FaVirus, FaWineBottle, FaWeight, FaHeartbeat, FaTint, FaUserAlt, FaCalendarAlt, FaSyringe } from 'react-icons/fa';
import './Standards.css';

const Standards = () => {
    const standards = [
        {
            icon: <FaIdCard className="standard-icon" />,
            text: "Mang theo chứng minh nhân dân/hộ chiếu"
        },
        {
            icon: <FaVirus className="standard-icon" />,
            text: "Không mắc hoặc không có các hành vi nguy cơ lây nhiễm HIV, không nhiễm viêm gan B, viêm gan C, và các virus lây qua đường truyền máu"
        },
        {
            icon: <FaWineBottle className="standard-icon" />,
            text: "Không nghiện ma túy, rượu bia và các chất kích thích"
        },
        {
            icon: <FaWeight className="standard-icon" />,
            text: "Cân nặng: Nam ≥ 45 kg Nữ ≥ 45 kg"
        },
        {
            icon: <FaHeartbeat className="standard-icon" />,
            text: "Không mắc các bệnh mãn tính hoặc cấp tính về tim mạch, huyết áp, hô hấp, da dày..."
        },
        {
            icon: <FaTint className="standard-icon" />,
            text: "Chỉ số huyết sắc tố (Hb) ≥120g/l (≥125g/l nếu hiến từ 350ml trở lên)."
        },
        {
            icon: <FaUserAlt className="standard-icon" />,
            text: "Người khỏe mạnh trong độ tuổi từ đủ 18 đến 60 tuổi"
        },
        {
            icon: <FaCalendarAlt className="standard-icon" />,
            text: "Thời gian tối thiểu giữa 2 lần hiến máu là 12 tuần đối với cả Nam và Nữ"
        },
        {
            icon: <FaSyringe className="standard-icon" />,
            text: "Kết quả test nhanh âm tính với kháng nguyên bề mặt của siêu vi B"
        }
    ];

    return (
        <div className="standards-container">
            <div className="standards-header">
                <h2>Tiêu chuẩn tham gia hiến máu</h2>
            </div>
            <div className="standards-grid">
                {standards.map((standard, index) => (
                    <div key={index} className="standard-card">
                        <div className="standard-icon-wrapper">
                            {standard.icon}
                        </div>
                        <p>{standard.text}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Standards; 