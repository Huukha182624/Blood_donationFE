import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./Schedule.css";
import { useNavigate } from "react-router-dom";
import PropTypes from 'prop-types';

function ScheduleForm() {
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (!startDate || !endDate) {
            alert("Vui lòng chọn đầy đủ khoảng thời gian!");
            return;
        }
        navigate(`/events?start=${startDate.toISOString()}&end=${endDate.toISOString()}`);
    };

    const handleStartDateChange = (date) => {
        setStartDate(date);
    };

    const handleEndDateChange = (date) => {
        setEndDate(date);
    };

    return (
        <div className="schedule-container">
            <label className="schedule-label">
                <i className="fa fa-calendar" style={{ marginRight: "8px" }}></i>
                Bạn cần đặt lịch hiến máu vào thời gian nào?
            </label>
            <form className="schedule-form" onSubmit={handleSearch}>
                <div className="date-range">
                    <DatePicker
                        selected={startDate}
                        onChange={handleStartDateChange}
                        selectsStart
                        startDate={startDate}
                        endDate={endDate}
                        placeholderText="Từ ngày"
                        dateFormat="dd/MM/yyyy"
                    />
                    <span className="date-separator">-</span>
                    <DatePicker
                        selected={endDate}
                        onChange={handleEndDateChange}
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

ScheduleForm.propTypes = {
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    onStartDateChange: PropTypes.func,
    onEndDateChange: PropTypes.func,
};

export default ScheduleForm;
