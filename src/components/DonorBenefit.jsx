import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./DonorBenefit.css";

const BloodDonationSlider = () => {
    const slides = [
        {
            title: "Được tư vấn về sức khỏe",
            items: [
                "Được giải thích về quy trình hiến máu và các tai biến có thể xảy ra tronng và sau khi hiến máu.",
                "Được cung cấp thông tin về dấu hiệu, triệu chứng do nhiễm vi rút viêm gan, HIV và một số bệnh lấy qua đường truyền máu, tình dục khác.",
                "Được xét nghiệm sàng lọc một số vi rút lây qua đường truyền máu, tình dục(HIV, giang mai, viêm gan,...) sau khi hiến máu.",
                "Được tư vấn hướng dẫn chăm sóc sức khỏe, tư vấn về kết quả bất thường sau khi hiến máu.",
                "Được bảo mật về kết quả lâm sàng, kế quả xét nghiệm."
            ]
        },
        {
            title: "Được cấp Giấy chứng nhận hiến máu tình nguyện",
            items: [
                "Giấy chứng nhận trao cho người hiến máu sau mỗi lần hiến máu tình nguyện.",
                "Có giá trị truyền máu miễn phí bằng số lượng máu đã hiến, khi bản thân người hiến có nhu cầu sử dụng máu tại các cơ sỏ y tế công lập trên toàn quốc.",
                "Người hiến máu cần xuất trình Giấy chứng nhận để làm cơ sở cho các cơ sở y tế thực hiện truyền máu miễn phí.",
                "Cơ sở y tế có trách nhiệm đóng dấu, xác nhận số lượng máu đã truyền miễn phí cho người hiến máu vào giấy chứng nhận."
            ]
        },
        {
            title: "Được bồi dưỡng trực tiếp",
            items: [
                "Ăn nhẹ, nước uống tại chỗ: tương dương 30.000đ.",
                "Hỗ trợ chi phí đi lại: 50.000đ.",
                "Nhận quà tặng giá trị tương đương: ",
                "100.000đ khi hiến máu 250ml",
                "150.000đ khi hiến máu 350ml",
                "180.000đ khi hiến máu 450ml"
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
                <h1>Quyền lợi của người hiến máu</h1>
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
