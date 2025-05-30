import { Box, Typography, Grid, Link, IconButton } from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PhoneIcon from '@mui/icons-material/Phone';

export default function Footer() {
    return (
        <Box sx={{ backgroundColor: '#c80020', color: '#fff', mt: 4, py: 4, px: 2 }}>
            <Grid container spacing={3} justifyContent="center">
                {/* Logo và slogan */}
                <Grid item xs={12} md={4}>
                    <Box display="flex" alignItems="center">
                        <img src="/logo.png" alt="Logo" style={{ height: 60, marginRight: 16 }} />
                        <Box>
                            <Typography variant="h6" fontWeight="bold">
                                Viện Huyết Học - Truyền Máu TW
                            </Typography>
                            <Typography variant="body2">
                                Giọt máu cho đi – Cuộc đời ở lại
                            </Typography>
                        </Box>
                    </Box>
                </Grid>

                {/* Liên hệ */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" fontWeight="bold" mb={1}>Liên hệ</Typography>
                    <Typography variant="body2"><PhoneIcon fontSize="small" sx={{ mr: 1 }} /> 0979 232 123</Typography>
                    <Typography variant="body2"><MailOutlineIcon fontSize="small" sx={{ mr: 1 }} /> info@vienhuyethoc.vn</Typography>
                    <Box mt={1}>
                        <IconButton href="https://facebook.com" target="_blank" sx={{ color: '#fff' }}>
                            <FacebookIcon />
                        </IconButton>
                    </Box>
                </Grid>

                {/* Liên kết nhanh */}
                <Grid item xs={12} md={4}>
                    <Typography variant="h6" fontWeight="bold" mb={1}>Liên kết nhanh</Typography>
                    <Box display="flex" flexDirection="column">
                        {['Trang chủ', 'Hiến máu', 'Tin tức', 'Liên hệ'].map((text, i) => (
                            <Link key={i} href="#" underline="hover" color="#fff" sx={{ mb: 0.5 }}>
                                {text}
                            </Link>
                        ))}
                    </Box>
                </Grid>
            </Grid>

            {/* Dòng cuối */}
            <Box textAlign="center" mt={4} borderTop="1px solid rgba(255,255,255,0.3)" pt={2}>
                <Typography variant="body2">
                    © 2025 Viện Huyết Học và Truyền Máu TW. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
}
