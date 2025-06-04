import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./DonorBenefit.css";

const BloodDonationSlider = () => {
    const slides = [
        {
            title: "Được tư vấn về sức khỏe",
            items: [
                "Được giải thích về quy trình hiến máu và các tai biến có thể xảy ra.",
                "Được cung cấp thông tin về các bệnh truyền nhiễm.",
                "Được xét nghiệm sàng lọc.",
                "Được tư vấn chăm sóc sức khỏe.",
                "Được bảo mật kết quả."
            ]
        },
        {
            title: "Được cấp Giấy chứng nhận",
            items: [
                "Giấy chứng nhận trao sau mỗi lần hiến máu.",
                "Giúp truyền máu miễn phí khi cần.",
                "Xuất trình để được truyền máu miễn phí.",
                "Sở y tế xác nhận số lượng máu đã hiến."
            ]
        },
        {
            title: "Được bồi dưỡng trực tiếp",
            items: [
                "Ăn nhẹ, nước uống: 30.000đ.",
                "Hỗ trợ đi lại: 50.000đ.",
                "Quà tặng: 100k (250ml), 150k (350ml), 180k (450ml)."
            ]
        }
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 5000,
    };

    return (
        <div className="slider-container">
            <div className="left-column">
                <h2>Quyền lợi của người hiến máu</h2>
                <p>Người hiến máu tình nguyện sẽ được những quyền lợi sau:</p>

            </div>
            <div className="right-column">
                <Slider {...settings}>
                    {slides.map((slide, index) => (
                        <div key={index} className="slide-content">
                            <h3>{slide.title}</h3>
                            <ul>
                                {slide.items.map((item, idx) => (
                                    <li key={idx}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default BloodDonationSlider;
