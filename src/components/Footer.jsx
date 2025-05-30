import { Box, Grid, Typography, TextField, Button } from '@mui/material';

export default function Footer() {
    return (
        <Box bgcolor="#f3dede" px={{ xs: 2, md: 10 }} py={6}>
            <Grid container spacing={4}>
                {/* Cột 1 - Logo */}
                <Grid item xs={12} sm={6} md={3}>
                    <Box>
                        <img src="/logo.png" alt="Logo" style={{ height: 150 }} />
                    </Box>
                </Grid>

                {/* Cột 2 - Thông tin */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom>Thông tin</Typography>
                    <Typography variant="body2">🕒 7h00 - 17h00 (Tất cả các ngày)</Typography>
                    <Typography variant="body2">📍 Vinhomes Grand Park, Long Bình, Thủ Đức, HCM</Typography>
                </Grid>

                {/* Cột 3 - Liên hệ */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom>Liên hệ</Typography>
                    <Typography variant="body2">📞 0979 232 123</Typography>
                    <Typography variant="body2">✉️ info@vienhuyethoc.vn</Typography>
                    <Typography variant="body2">🌐 facebook.com</Typography>
                </Grid>

                {/* Cột 4 - Nhận thông báo */}
                <Grid item xs={12} sm={6} md={3}>
                    <Typography variant="h6" gutterBottom>Nhận thông báo</Typography>
                    <Typography variant="body2">Nhập email để nhận thông báo hiến máu gần bạn.</Typography>
                    <Box display="flex" gap={1} mt={1}>
                        <TextField size="small" placeholder="Email của bạn" fullWidth />
                        <Button variant="contained" color="error">Gửi</Button>
                    </Box>
                </Grid>
            </Grid>

            {/* Dòng bản quyền */}
            <Box textAlign="center" mt={6}>
                <Typography variant="body2">
                    © 2025 Viện Huyết Học - Truyền Máu TW. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
}
