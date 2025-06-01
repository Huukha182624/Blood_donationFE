import { Box, Container, Typography } from "@mui/material";
// import banner from "../assets/banner.png";
import Services from "./Services";

export default function MainContent() {
    return (
        <>
            {/* <Box sx={{ textAlign: 'center' }}>
                <img src={banner} alt="Banner" style={{ width: '100%', height: '100%' }} />
            </Box> */}
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Nhóm máu và nhóm máu hiếm
                </Typography>

                <Typography variant="body2" color="textSecondary">
                    Ngày đăng: 21-05-2025
                </Typography>

                <Typography variant="body1" sx={{ mt: 2 }}>
                    Bài viết dưới đây sẽ cung cấp cho bạn những thông tin thú vị về các nhóm máu,
                    sẽ giúp bạn giải đáp thắc mắc Nhóm máu nào là nhóm máu hiếm ở Việt Nam.
                </Typography>

                <Box
                    component="img"
                    src="/blood-type.jpg" // ✅ ảnh trong public/
                    alt="Blood Types"
                    sx={{ mt: 3, maxWidth: "100%", borderRadius: 2 }}
                />
            </Container>

            <Services />
        </>
    );
}
