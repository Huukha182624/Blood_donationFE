// src/pages/About.jsx
import { Box, Typography, Container } from '@mui/material';

export default function About() {
    return (
        <Container maxWidth="md" sx={{ py: 6 }}>
            <Typography variant="h4" gutterBottom>Giới thiệu</Typography>
            <Typography variant="body1" paragraph>
                Viện Huyết Học - Truyền Máu Trung Ương là cơ sở y tế đầu ngành trong lĩnh vực truyền máu và điều trị các bệnh về máu tại Việt Nam.
            </Typography>
            <Typography variant="body1" paragraph>
                Với sứ mệnh cao cả là cứu người bằng những giọt máu quý giá, chúng tôi cam kết nâng cao chất lượng dịch vụ, an toàn và hiệu quả trong từng đơn vị máu được truyền.
            </Typography>
            <Typography variant="body1" paragraph>
                Chúng tôi hoạt động với các chuyên khoa sâu, kết hợp nghiên cứu – đào tạo – điều trị – tuyên truyền, lan tỏa yêu thương đến cộng đồng.
            </Typography>
            <Box
                component="img"
                src="/intro.png" // ✅ ảnh trong public/
                alt="Blood Types"
                sx={{ mt: 3, maxWidth: "100%", borderRadius: 2 }}
            />
        </Container>

    );
}
