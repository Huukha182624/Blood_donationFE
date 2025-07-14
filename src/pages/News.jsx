import { Box, Container, Typography, Grid } from "@mui/material";
import { Link } from "react-router-dom";


const newsList = [
    {
        id: 1,
        img: "https://giotmauvang.org.vn/assets/images/271b5fe5f864d480023593de2e8aaf3a.png",
        caption: "Các đồng chí lãnh đạo và các đại biểu thực hiện nghi thức phát động Tháng Nhân đạo cấp quốc gia năm 2025",
        title: "KHỞI ĐỘNG THÁNG NHÂN ĐẠO NĂM 2025: HÀNH TRÌNH NHÂN ĐẠO - LAN TỎA YÊU THƯƠNG",
        desc: 'Ngày 8-5, tại TPHCM, Trung ương Hội Chữ thập đỏ Việt Nam và UBND TPHCM phối hợp tổ chức lễ phát động Tháng Nhân đạo cấp quốc gia năm 2025 với chủ đề "Hành trình nhân đạo - Lan tỏa yêu thương".',
        link: "/news/1",
    },
    {
        id: 2,
        img: "https://file.hstatic.net/1000115152/article/untitled_20a7b5fd50384d83bc4f8928efc9a7af_large.png",
        caption: "",
        title: "NGÀY TOÀN DÂN HIẾN MÁU TÌNH NGUYỆN 7/4/2025",
        desc: "Ngày 7/4, chúng ta cùng nhau hướng về một ngày ý nghĩa – Ngày Toàn dân hiến máu tình nguyện.",
        link: "/news/2",
    },
    {
        id: 3,
        img: "https://giotmauvang.org.vn/assets/images/da5501e9bb4fde7f2a6c831c04eae5e7.jpg",
        caption: "",
        title: "ÁP DỤNG CÔNG NGHỆ SỐ TRONG HOẠT ĐỘNG HIẾN MÁU TÌNH NGUYỆN",
        desc: "Ngày 04/3, tại Trung tâm Hiến máu nhân đạo, Hội Chữ thập đỏ Thành phố phối hợp Hội Tin học Thành phố cùng với sự đồng hành của c...",
        link: "/news/3",
    },
];




export default function News() {
    return (
        <>
            <Box sx={{ height: 140 }} />
            <Container maxWidth="xl">
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginTop: 5 }}>
                    <h1>News</h1>
                </Box>
                <Box sx={{ marginTop: 3 }}>
                    <Grid container spacing={4} alignItems="stretch">
                        {newsList.map((news) => (
                            <Grid item xs={12} key={news.id} sx={{ display: "flex" }}>
                                <Link to={news.link} style={{ textDecoration: "none", color: "inherit", width: "100%" }}>
                                    <Box
                                        sx={{
                                            border: "1px solid #ccc",
                                            padding: 2,
                                            borderRadius: 2,
                                            boxShadow: 2,
                                            transition: "box-shadow 0.2s",
                                            "&:hover": { boxShadow: 6 },
                                            background: "#fff",
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 3,
                                            minHeight: 220,
                                            height: 220,
                                        }}
                                    >
                                        {/* Ảnh và caption */}
                                        <Box sx={{
                                            minWidth: 220,
                                            maxWidth: 300,
                                            flex: "0 0 220px",
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "center",
                                            justifyContent: "flex-start",
                                            height: "100%",
                                        }}>
                                            <img
                                                src={news.img}
                                                alt="News Thumbnail"
                                                style={{
                                                    width: "100%",
                                                    maxWidth: 260,
                                                    height: 160,
                                                    objectFit: "cover",
                                                    borderRadius: 8,
                                                    marginBottom: 8,
                                                }}
                                            />
                                            {news.caption && (
                                                <Typography
                                                    variant="caption"
                                                    align="center"
                                                    color="text.secondary"
                                                    sx={{
                                                        display: "block",
                                                        background: "#f5f5f5",
                                                        borderRadius: 1,
                                                        px: 1,
                                                        py: 0.5,
                                                        fontStyle: "italic",
                                                        fontWeight: 500,
                                                        textAlign: "center",
                                                        marginBottom: 1,
                                                        maxWidth: 260,
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                        whiteSpace: "nowrap"
                                                    }}
                                                >
                                                    {news.caption}
                                                </Typography>
                                            )}
                                        </Box>
                                        {/* Nội dung */}
                                        <Box sx={{
                                            flex: 1,
                                            display: "flex",
                                            flexDirection: "column",
                                            justifyContent: "center",
                                            minHeight: 160,
                                        }}>
                                            <Typography
                                                variant="h6"
                                                component="h2"
                                                sx={{
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    minHeight: 56,
                                                }}
                                            >
                                                {news.title}
                                            </Typography>
                                            <Typography
                                                variant="body2"
                                                color="text.secondary"
                                                sx={{
                                                    marginTop: 1,
                                                    display: "-webkit-box",
                                                    WebkitLineClamp: 2,
                                                    WebkitBoxOrient: "vertical",
                                                    overflow: "hidden",
                                                    minHeight: 48,
                                                }}
                                            >
                                                {news.desc}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Container>
        </>
    );
}




