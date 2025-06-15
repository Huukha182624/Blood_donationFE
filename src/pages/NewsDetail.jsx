import { useParams } from "react-router-dom";
import { Box, Container, Typography, Paper } from "@mui/material";




const newsData = [
    {
        id: "1",
        title1: "Khởi động tháng Nhân đạo năm 2025:",
        title2: "Hành trình nhân đạo - Lan tỏa yêu thương",
        images: [
            "https://giotmauvang.org.vn/assets/images/271b5fe5f864d480023593de2e8aaf3a.png"
        ],
        imageCaptions: [
            "Các đồng chí lãnh đạo và các đại biểu thực hiện nghi thức phát động Tháng Nhân đạo cấp quốc gia năm 2025"
        ],
        highlight: 'Ngày 8-5, tại TPHCM, Trung ương Hội Chữ thập đỏ Việt Nam và UBND TPHCM phối hợp tổ chức lễ phát động Tháng Nhân đạo cấp quốc gia năm 2025 với chủ đề "Hành trình nhân đạo - Lan tỏa yêu thương".',
        details: `Tham dự có các đồng chí: Trương Tấn Sang, nguyên Ủy viên Bộ Chính trị, nguyên Chủ tịch nước, nguyên Chủ tịch danh dự Hội Chữ thập đỏ Việt Nam; Đỗ Văn Chiến, Ủy viên Bộ Chính trị, Bí thư Trung ương Đảng, Chủ tịch Ủy ban Trung ương MTTQ Việt Nam; Nguyễn Phước Lộc, Phó Bí thư Thành ủy, Chủ tịch Ủy ban MTTQ Việt Nam TPHCM; Vũ Chiến Thắng, Thứ trưởng Bộ Nội vụ; Nguyễn Phạm Duy Trang, Bí thư Trung ương Đoàn, Chủ tịch Hội Đồng đội Trung ương; Nguyễn Mạnh Cường, Ủy viên Ban Thường vụ Thành ủy, Trưởng Ban Tuyên giáo và Dân vận Thành ủy TPHCM; Trần Thị Diệu Thúy, Phó Chủ tịch UBND TPHCM...`
    },
    {
        id: "2",
        title: "NGÀY TOÀN DÂN HIẾN MÁU 7/4/2025",
        highlight: null,
        video: "https://www.youtube.com/embed/ixl95-h6NfA",
        details: `
Xin kính chào quý thính giả! Hôm nay, ngày 7/4, chúng ta cùng nhau hướng về một ngày ý nghĩa – Ngày Toàn dân hiến máu tình nguyện. Đây là dịp để tôn vinh nghĩa cử cao đẹp của những người đã và đang hiến máu, cũng như kêu gọi cộng đồng cùng chung tay vì sự sống của hàng triệu bệnh nhân.
Bạn có biết? Mỗi giọt máu cho đi không chỉ giúp cứu sống người bệnh mà còn lan tỏa tinh thần nhân ái, sẻ chia trong xã hội. Mỗi năm, Việt Nam cần khoảng 2 triệu đơn vị máu, nhưng nguồn cung vẫn còn thiếu hụt. Vì vậy, sự tham gia của mỗi chúng ta sẽ giúp lấp đầy khoảng trống đó.
🩺 HIẾN MÁU KHÔNG ẢNH HƯỞNG SỨC KHỎE
Nhiều người lo lắng rằng hiến máu có thể gây hại cho cơ thể. Nhưng thực tế, cơ thể chúng ta có khả năng tái tạo máu rất nhanh. Chỉ sau vài ngày, lượng máu đã hiến sẽ được bù đắp. Đồng thời, việc hiến máu còn giúp kiểm tra sức khỏe miễn phí, mang lại nhiều lợi ích cho chính người hiến.
💖 \"MỖI GIỌT MÁU CHO ĐI - MỘT CUỘC ĐỜI Ở LẠI\"
Hãy cùng nhau biến hành động nhỏ bé này thành một phong trào mạnh mẽ. Nếu bạn đủ điều kiện sức khỏe, đừng ngần ngại đăng ký hiến máu tại các bệnh viện, trung tâm hiến máu gần nhất.
🩸 Hãy hành động ngay hôm nay! Một giọt máu của bạn có thể là cơ hội sống của ai đó. Chúng tôi tin rằng, khi trao đi yêu thương, chúng ta sẽ nhận lại hạnh phúc!
`
    },
    {
        id: "3",
        title: "ÁP DỤNG CÔNG NGHỆ SỐ TRONG HOẠT ĐỘNG HIẾN MÁU TÌNH NGUYỆN",
        highlight: "Ngày 04/3, tại Trung tâm Hiến máu nhân đạo, Hội Chữ thập đỏ Thành phố phối hợp Hội Tin học Thành phố cùng với sự đồng hành của các đối tác thực hiện trao tặng trang thiết bị phục vụ cho công tác hiến máu tình nguyện.",
        images: [
            "https://giotmauvang.org.vn/assets/images/da5501e9bb4fde7f2a6c831c04eae5e7.jpg",
            "https://giotmauvang.org.vn/assets/images/533264e9c9e77b4a13e2d44c1985ab92.jpg"
        ],
        details: `Ngày 04/3, tại Trung tâm Hiến máu nhân đạo, Hội Chữ thập đỏ Thành phố phối hợp Hội Tin học Thành phố cùng với sự đồng hành của các đối tác thực hiện trao tặng trang thiết bị phục vụ cho công tác hiến máu tình nguyện.`
    },
];


export default function NewsDetail() {
    const { id } = useParams();
    const news = newsData.find((item) => item.id === id);


    if (!news) return <Container><Typography>Không tìm thấy tin tức!</Typography></Container>;


    return (
        <Container>
            <Box sx={{ marginTop: { xs: 12, md: 15 }, textAlign: "center", px: 1 }}>
                {news.title1 && news.title2 ? (
                    <>
                        <Typography
                            variant="h3"
                            sx={{
                                color: "#2563eb",
                                fontWeight: 700,
                                lineHeight: 1.1,
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                                display: "block"
                            }}
                        >
                            {news.title1}
                        </Typography>
                        <Typography
                            variant="h3"
                            sx={{
                                color: "#2563eb",
                                fontWeight: 700,
                                lineHeight: 1.1,
                                wordBreak: "break-word",
                                whiteSpace: "normal",
                                fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                                display: "block"
                            }}
                        >
                            {news.title2}
                        </Typography>
                    </>
                ) : (
                    <Typography
                        variant="h3"
                        sx={{
                            color: "#2563eb",
                            fontWeight: 700,
                            lineHeight: 1.1,
                            wordBreak: "break-word",
                            whiteSpace: "normal",
                            fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                            display: "block"
                        }}
                    >
                        {news.title}
                    </Typography>
                )}
            </Box>
            <Paper elevation={2} sx={{ marginTop: 3, padding: 3, background: "#fff" }}>
                {news.video && (
                    <Box sx={{ display: "flex", justifyContent: "center", mb: 3 }}>
                        <iframe
                            width="90%"
                            height="400"
                            src={news.video}
                            title="YouTube video player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            style={{ borderRadius: 8 }}
                        ></iframe>
                    </Box>
                )}


                {news.id === "1" ? (
                    <>
                        {news.highlight && (
                            <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 2 }}>
                                {news.highlight}
                            </Typography>
                        )}
                        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 2, textAlign: "justify", whiteSpace: "pre-line" }}>
                            {news.details}
                        </Typography>
                        {news.images && news.images.length > 0 && (
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, my: 3 }}>
                                {news.images.map((img, idx) => (
                                    <Box key={idx} sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                        <img
                                            src={img}
                                            alt={`news-img-${idx}`}
                                            style={{
                                                maxWidth: "100%",
                                                borderRadius: 8,
                                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                                margin: "0 auto",
                                                display: "block"
                                            }}
                                        />
                                        {news.imageCaptions && news.imageCaptions[idx] && (
                                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                                                {news.imageCaptions[idx]}
                                            </Typography>
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        )}
                        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 2, textAlign: "justify", whiteSpace: "pre-line" }}>
                            Tham dự còn có: ông Juan Pedro Schaerer Trưởng đoàn đại diện Ủy ban Chữ thập đỏ quốc tế khu vực tại Bangkok; bà Kathryn Clarkson, Trưởng đoàn đại diện Hiệp Hội Chữ thập đỏ và Trăng lưỡi liềm đỏ quốc tế khu vực tại Bangkok; Tổng Lãnh sự Lãnh sự quán Hungary tại Việt Nam; Tổng Lãnh sự Lãnh sự quán Campuchia tại Việt Nam; đại diện Tổng lãnh sự quán các nước Anh, Trung Quốc, Cuba, Indonesia… tại Việt Nam.


                            Phó Chủ tịch, Tổng thư ký điều hành công việc Hội Chữ thập đỏ Việt Nam Nguyễn Hải Đăng, cho biết triển khai chính thức từ năm 2021, Tháng Nhân đạo đã trở thành biểu tượng sống động của tinh thần "cả nước làm nhân đạo", kết nối hàng triệu trái tim vì một Việt Nam nhân ái và bền vững. Thời gian qua, tổng giá trị vận động đạt trên 3.700 tỷ đồng, trợ giúp hơn 7,3 triệu lượt người. Riêng Tháng Nhân đạo năm 2024, đạt trên 763 tỷ đồng, trợ giúp trên 1,6 triệu lượt người.
                        </Typography>
                        {/* 2 anh tiep theotheo */}
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, my: 3 }}>
                            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                <img
                                    src="https://giotmauvang.org.vn/assets/images/be57f6779cccd201f0688c7b86d1d27e.png"
                                    alt="news-img-extra-1"
                                    style={{
                                        maxWidth: "100%",
                                        borderRadius: 8,
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                        margin: "0 auto",
                                        display: "block"
                                    }}
                                />
                            </Box>
                            <Box sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                <img
                                    src="https://giotmauvang.org.vn/assets/images/b60b09ad1a385b3bf1b5505db58d0d6d.png"
                                    alt="news-img-extra-2"
                                    style={{
                                        maxWidth: "100%",
                                        borderRadius: 8,
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                        margin: "0 auto",
                                        display: "block"
                                    }}
                                />
                                <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                                    Các tình nguyện viên hiến máu tình nguyện
                                </Typography>
                            </Box>
                        </Box>
                        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 2, textAlign: "justify", whiteSpace: "pre-line" }}>
                            Với chủ đề "Hành trình nhân đạo - Lan tỏa yêu thương", không chỉ là một lời hiệu triệu, mà còn là hành trình truyền cảm hứng, khơi nguồn yêu thương và cam kết đồng hành bền bỉ, sẻ chia, nhân lên sức mạnh của sự tử tế và tinh thần đoàn kết toàn dân tộc, xây dựng cộng đồng nhân ái, nhân văn, không để ai bị bỏ lại phía sau.


                            Thay mặt chính quyền TPHCM - Ban Chỉ đạo vận động hiến máu tình nguyện Thành phố, Phó Chủ tịch UBND TPHCM Trần Thị Diệu Thúy cảm ơn Tổng Lãnh sự các nước đã quan tâm và phối hợp Hội Chữ thập đỏ TPHCM vận động, tổ chức Ngày hội hiến máu tình nguyện dành cho cán bộ, nhân viên các Tổng Lãnh sự quán tại TPHCM.


                            Ngoài ra, nhiều năm qua, Tổng Lãnh sự quán các nước tại TPHCM tham gia nhiều hoạt động xã hội từ thiện. Với Tháng Nhân đạo cấp quốc gia năm 2025, những nghĩa cử nhân ái đó tiếp tục lan tỏa thông qua hành động hưởng ứng phong trào hiến máu tình nguyện, do Sở Ngoại vụ, Thành đoàn và Hội Chữ thập đỏ TPHCM phối hợp thực hiện, đã vận động gần 150 cán bộ, nhân viên các Tổng Lãnh sự quán cùng tham gia. Đồng chí mong muốn Tổng Lãnh sự quán các nước luôn quan tâm các hoạt động nhân đạo xã hội, trong đó có hoạt động hiến máu tình nguyện tại TPHCM.


                            Phát biểu chỉ đạo, Chủ tịch Ủy ban Trung ương MTTQ Việt Nam Đỗ Văn Chiến nhấn mạnh, gần 80 năm qua, Hội Chữ thập đỏ Việt Nam đã trở thành cầu nối tin cậy giữa Đảng, Nhà nước, các tổ chức, cá nhân trong hệ thống chính trị với những người yếu thế, người có hoàn cảnh đặc biệt khó khăn.
                        </Typography>
                    </>
                ) : (
                    <>
                        {news.highlight && (
                            <Typography variant="h6" sx={{ fontWeight: 700, marginBottom: 2 }}>
                                {news.highlight}
                            </Typography>
                        )}
                        {news.images && news.images.length > 0 && (
                            <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, my: 3 }}>
                                {news.images.map((img, idx) => (
                                    <Box key={idx} sx={{ width: "100%", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
                                        <img
                                            src={img}
                                            alt={`news-img-${idx}`}
                                            style={{
                                                maxWidth: "100%",
                                                borderRadius: 8,
                                                boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                                                margin: "0 auto",
                                                display: "block"
                                            }}
                                        />
                                        {news.imageCaptions && news.imageCaptions[idx] && (
                                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
                                                {news.imageCaptions[idx]}
                                            </Typography>
                                        )}
                                    </Box>
                                ))}
                            </Box>
                        )}
                        <Typography variant="body1" color="text.secondary" sx={{ marginTop: 2, textAlign: "justify", whiteSpace: "pre-line" }}>
                            {news.details}
                        </Typography>
                    </>
                )}
            </Paper>
        </Container>
    );
}
