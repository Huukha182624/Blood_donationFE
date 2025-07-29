import { Box, Grid, Typography, TextField, Button } from '@mui/material';
import React from 'react';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function Footer() {
    return (
        <Box bgcolor="#f3dede" px={0} py={6} color="#b71c1c">
            <Grid container spacing={6} justifyContent="center" alignItems="flex-start">
                {/* Cột 1 - Giới thiệu */}
                <Grid item xs={12} md={3}>
                    <Box display="flex" flexDirection="column" alignItems={{ xs: 'center', md: 'flex-start' }} gap={1}>
                        <img src="/logo.png" alt="Logo" style={{ height: 70, marginBottom: 8 }} />
                        <Typography variant="body2" sx={{ color: '#b71c1c', fontStyle: 'italic', fontWeight: 700, mb: 1, fontSize: 20 }}>
                            Hiến Máu Nhân Ái Việt
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#b71c1c', fontSize: 18, fontWeight: 500 }}>
                            Kết nối những tấm lòng thiện nguyện
                        </Typography>
                    </Box>
                </Grid>
                {/* Cột 2 - Liên kết nhanh */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#b71c1c', fontSize: 22 }}>Liên kết nhanh</Typography>
                    <Box display="flex" flexDirection="column" gap={0.5} alignItems={{ xs: 'center', md: 'flex-start' }}>
                        <a href="/gioi-thieu" style={footerLinkStyle}>Giới thiệu</a>
                        <a href="/don-dang-ki" style={footerLinkStyle}>Đăng ký hiến máu</a>
                        <a href="/hoi-dap" style={footerLinkStyle}>Câu hỏi thường gặp</a>
                        <a href="/tin-tuc" style={footerLinkStyle}>Tin tức</a>
                    </Box>
                </Grid>
                {/* Cột 3 - Liên hệ */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#b71c1c', fontSize: 22 }}>Liên hệ</Typography>
                    <Typography variant="body2" sx={{ color: '#b71c1c', fontSize: 18, fontWeight: 500 }}>Hotline: 0979 232 123</Typography>
                    <Typography variant="body2" sx={{ color: '#b71c1c', fontSize: 18, fontWeight: 500 }}>Email: info@vienhuyethoc.vn</Typography>
                    <Typography variant="body2" sx={{ color: '#b71c1c', fontSize: 18, fontWeight: 500 }}>Địa chỉ: Vinhomes Grand Park, Long Bình, Thủ Đức, HCM</Typography>
                </Grid>
                {/* Cột 4 - Kết nối MXH */}
                <Grid item xs={12} md={3}>
                    <Typography variant="h6" fontWeight="bold" gutterBottom sx={{ color: '#b71c1c', fontSize: 22 }}>Kết nối MXH</Typography>
                    <Box display="flex" gap={2} alignItems="center" mt={1} justifyContent={{ xs: 'center', md: 'flex-start' }}>
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" style={{ ...iconLinkStyle, color: '#b71c1c' }}><FacebookIcon fontSize="large" /></a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" style={{ ...iconLinkStyle, color: '#b71c1c' }}><InstagramIcon fontSize="large" /></a>
                        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" style={{ ...iconLinkStyle, color: '#b71c1c' }}><YouTubeIcon fontSize="large" /></a>
                    </Box>
                </Grid>
            </Grid>
            {/* Dòng bản quyền */}
            <Box textAlign="center" mt={6}>
                <Typography variant="body2" sx={{ color: 'rgb(114, 6, 17)', fontSize: 18, fontWeight: 500 }}>
                    © 2025 Hiến Máu Nhân Ái Việt. All rights reserved.
                </Typography>
            </Box>
        </Box>
    );
}

const footerLinkStyle = {
    color: '#b71c1c',
    textDecoration: 'none',
    fontSize: '18px',
    marginBottom: 4,
    transition: 'color 0.2s, text-decoration 0.2s',
    fontWeight: 500,
    cursor: 'pointer',
    padding: 0,
    lineHeight: 1.7,
    display: 'inline-block',
    ':hover': {
        color: '#ffcccb',
        textDecoration: 'underline',
    },
};

const iconLinkStyle = {
    color: '#b71c1c',
    transition: 'color 0.2s',
    fontSize: '36px',
    ':hover': {
        color: '#ffcccb',
    },
};