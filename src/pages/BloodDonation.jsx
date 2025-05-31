import React from 'react';
import { Box, Grid, Paper, Typography } from '@mui/material';

// Danh sách tiêu chuẩn hiến máu
const standards = [
    { icon: '🪪', text: 'Mang theo chứng minh nhân dân/hộ chiếu' },
    { icon: '🦠', text: 'Không mắc các bệnh lây qua đường truyền máu' },
    { icon: '💉', text: 'Không nghiện ma tuý, rượu bia và các chất kích thích' },
    { icon: '⚖️', text: 'Cân nặng: Nam ≥ 45 kg, Nữ ≥ 45 kg' },
    { icon: '❤️‍🩹', text: 'Không mắc các bệnh mãn tính hoặc cấp tính' },
    { icon: '📊', text: 'Chỉ số huyết sắc tố (Hb) ≥120g/l' },
    { icon: '🔞', text: 'Độ tuổi từ đủ 18 đến 60 tuổi' },
    { icon: '📅', text: 'Thời gian tối thiểu giữa 2 lần hiến máu là 12 tuần' },
    { icon: '🧪', text: 'Kết quả test nhanh âm tính với kháng nguyên viêm gan B' },
];

const StandardsBox = () => {
    return (
        <Box sx={{ backgroundColor: '#fff', py: 2, px: { xs: 2, md: 6 } }}>
            <Box
                sx={{
                    maxWidth: 1200,
                    mx: 'auto',
                    backgroundColor: 'rgb(244, 198, 198)',
                    borderRadius: 2,
                    boxShadow: 4,
                    p: { xs: 3, md: 6 },
                }}
            >
                <Typography
                    variant="h4"
                    align="center"
                    sx={{ fontWeight: 'bold', color: 'rgb(200, 2, 2)', mb: 4 }}
                >
                    Tiêu chuẩn tham gia hiến máu
                </Typography>

                <Grid container spacing={3}>
                    {standards.map((item, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <Paper
                                elevation={2}
                                sx={{
                                    p: 2,
                                    minHeight: 120,
                                    display: 'flex',
                                    alignItems: 'flex-start',
                                    gap: 2,
                                    borderRadius: 2,
                                    backgroundColor: '#ffffff',
                                }}
                            >
                                <Box sx={{ fontSize: 32 }}>{item.icon}</Box>
                                <Typography variant="body1">{item.text}</Typography>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
};




// TRANG CHÍNH
const BloodDonation = () => {
    return (
        <>
            {/* PHẦN 1: TIÊU CHUẨN HIẾN MÁU */}
            <StandardsBox />

            {/* PHẦN 2: HƯỚNG DẪN TRƯỚC VÀ SAU KHI HIẾN */}
            <Box sx={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
                {/* Background mờ */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: 2,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundImage: 'url("/donation.jpg")',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        opacity: 0.9,
                        filter: 'blur(3px)',
                        zIndex: 0,
                    }}
                />
                {/* Nội dung nổi bật */}
                <Box sx={{ position: 'relative', zIndex: 1, color: 'white', py: 5, px: 2 }}>
                    <Typography variant="h4" align="center" sx={{ color: 'rgb(240, 66, 8)', fontWeight: 'bold', mb: 4 }}>
                        Những lời khuyên trước và sau khi hiến máu
                    </Typography>

                    <Grid container spacing={3} justifyContent="center">
                        {/* ✅ NÊN */}
                        <Grid item xs={12} md={4}>
                            <Paper elevation={4} sx={{ p: 3, borderRadius: 2, backgroundColor: 'white', color: 'black' }}>
                                <Typography variant="h6" sx={{ color: '#00ACC1', fontWeight: 'bold', mb: 1 }}>
                                    ✅ Nên:
                                </Typography>
                                <ul style={{ paddingLeft: 20 }}>
                                    <li>Ăn nhẹ và uống nhiều nước (300–500ml) trước khi hiến máu.</li>
                                    <li>Dè chặt miếng bông gòn cầm máu trong 10 phút, giữ bằng keo cá nhân 4–6 giờ.</li>
                                    <li>Nằm và ngồi nghỉ 10 phút sau khi hiến máu.</li>
                                    <li>Nằm kê chân cao nếu chóng mặt, buồn nôn.</li>
                                    <li>Chườm lạnh vết chích nếu sưng, bầm tím.</li>
                                </ul>
                                <Typography variant="body2" sx={{ mt: 2 }}>
                                    <strong>Bác sĩ Trần Mai Đào</strong>
                                    <br />
                                    Trưởng khoa Khoa Tiếp nhận hiến máu
                                    <br />
                                    Bệnh viện Truyền máu Huyết học
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* ❌ KHÔNG NÊN */}
                        <Grid item xs={12} md={4}>
                            <Paper elevation={4} sx={{ p: 3, borderRadius: 2, backgroundColor: 'white', color: 'black' }}>
                                <Typography variant="h6" sx={{ color: '#F44336', fontWeight: 'bold', mb: 1 }}>
                                    ❌ Không nên:
                                </Typography>
                                <ul style={{ paddingLeft: 20 }}>
                                    <li>Uống sữa, rượu bia trước khi hiến máu.</li>
                                    <li>Lái xe đi xa, làm việc nặng, thể thao trong ngày lấy máu.</li>
                                </ul>
                                <Typography variant="body2" sx={{ mt: 2 }}>
                                    <strong>Bác sĩ Trần Mai Đào</strong>
                                    <br />
                                    Trưởng khoa Khoa Tiếp nhận hiến máu
                                    <br />
                                    Bệnh viện Truyền máu Huyết học
                                </Typography>
                            </Paper>
                        </Grid>

                        {/* ⚠️ LƯU Ý */}
                        <Grid item xs={12} md={4}>
                            <Paper elevation={4} sx={{ p: 3, borderRadius: 2, backgroundColor: 'white', color: 'black' }}>
                                <Typography variant="h6" sx={{ color: '#FF9800', fontWeight: 'bold', mb: 1 }}>
                                    ⚠️ Lưu ý:
                                </Typography>
                                <ul style={{ paddingLeft: 20 }}>
                                    <li>Nếu chảy máu tại chỗ chích: giơ tay cao, ấn mạnh bông/gạc.</li>
                                    <li>Liên hệ nhân viên y tế nếu không cầm được máu.</li>
                                </ul>
                                <Typography variant="body2" sx={{ mt: 2 }}>
                                    <strong>Bác sĩ Trần Mai Đào</strong>
                                    <br />
                                    Trưởng khoa Khoa Tiếp nhận hiến máu
                                    <br />
                                    Bệnh viện Truyền máu Huyết học
                                </Typography>
                            </Paper>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </>
    );
};

export default BloodDonation;
