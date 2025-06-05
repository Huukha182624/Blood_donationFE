import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Schedule.css";

function ScheduleForm() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const handleSearch = (e) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            alert("Vui lòng chọn đầy đủ khoảng thời gian!");
            return;
        }
        alert(`Tìm kiếm lịch từ ${startDate.toLocaleDateString()} đến ${endDate.toLocaleDateString()}`);
    };

    return (
        <div className="schedule-container">
            <label className="schedule-label">
                <i className="fa fa-calendar" style={{ marginRight: "8px" }}></i>
                Bạn cần đặt lịch vào thời gian nào?
            </label>
            <form className="schedule-form" onSubmit={handleSearch}>
                <div className="date-range">
                    <DatePicker
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Từ ngày"
                        dateFormat="dd/MM/yyyy"
                    />
                    <span className="date-separator">-</span>
                    <DatePicker
                        selected={endDate}
                        onChange={(date) => setEndDate(date)}
                        selectsEnd
                        startDate={startDate}
                        endDate={endDate}
                        minDate={startDate}
                        placeholderText="Đến ngày"
                        dateFormat="dd/MM/yyyy"
                    />
                </div>
                <button type="submit" className="search-button">Tìm kiếm</button>
            </form>
        </div>
    );
}

export default ScheduleForm;
