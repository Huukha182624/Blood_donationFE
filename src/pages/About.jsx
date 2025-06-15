import { Box, Typography, Container } from '@mui/material';
import Services from "../components/Services";
import Doctors from '../components/Doctors';

export default function About() {
    return (
        <>
            <Container maxWidth="md" sx={{ py: 6 }}>
                {/* ✅ INTRO MỞ ĐẦU */}
                <Box sx={{ mb: 5 }}>
                    <Typography variant="h4" gutterBottom>
                        Chào mừng bạn đến với <strong>Hiến Máu Nhân Ái Việt</strong>
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Nơi lan tỏa lòng nhân ái, sẻ chia sự sống và kết nối những trái tim thiện nguyện.
                        Mỗi giọt máu cho đi là một tia hy vọng được trao đến những người đang cần sự sống từng ngày.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Tại <strong>Hiến Máu Nhân Ái Việt</strong>, chúng tôi tin rằng hành động nhỏ có thể mang lại thay đổi lớn.
                        Với cộng đồng người hiến máu nhiệt huyết, bạn không chỉ là người cho đi mà còn là người truyền cảm hứng và hy vọng.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Hãy cùng chúng tôi lan tỏa thông điệp: <em>"Giọt máu cho đi – Cuộc đời ở lại".</em>
                    </Typography>
                </Box>
                <Typography variant="body1" paragraph>
                    Với sứ mệnh cao cả là cứu người bằng những giọt máu quý giá, chúng tôi cam kết nâng cao chất lượng dịch vụ, an toàn và hiệu quả trong từng đơn vị máu được truyền.
                </Typography>
                <Typography variant="body1" paragraph>
                    Chúng tôi hoạt động với các chuyên khoa sâu, kết hợp nghiên cứu – đào tạo – điều trị – tuyên truyền, lan tỏa yêu thương đến cộng đồng.
                </Typography>

            </Container>
            <Doctors />
            <div style={{ marginTop: "40px" }}></div>
            <Services />
        </>
    );
}
