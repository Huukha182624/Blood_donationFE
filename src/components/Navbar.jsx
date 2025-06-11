import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const navItems = [
        { label: 'Trang chủ', path: '/' },
        { label: 'Giới thiệu', path: '/gioi-thieu' },
        { label: 'Hiến máu', path: '/hien-mau' },
        { label: 'Hỏi đáp', path: '/hoi-dap' },
        { label: 'Liên Hệ', path: '/lien-he' },
    ];

    return (
        <AppBar position="static" sx={{ backgroundColor: 'rgb(240, 221, 221)', boxShadow: 'none' }}>
            {/* Thanh trên gồm: logo - tiêu đề ở giữa - đăng nhập */}
            <Toolbar sx={{ px: 2, justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                {/* Logo bên trái */}
                <Box component="img" src="/logo.png" alt="Logo" sx={{ height: 100 }} />

                {/* Tiêu đề chính giữa */}
                <Box sx={{
                    position: 'absolute',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    textAlign: 'center',
                    zIndex: 1
                }}>
                    <Typography variant="h4" sx={{ fontWeight: 'bold', color: 'rgb(114, 6, 17)' }}>
                        HIẾN MÁU NHÂN ÁI VIỆT
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#343a40' }}>
                        Ngôi nhà của những tấm lòng nguyện hiến máu (HMNAV)
                    </Typography>
                </Box>

                {/* Nút đăng nhập bên phải */}
                <Button
                    component={Link}
                    to="/dang-nhap"
                    sx={{
                        color: 'white',
                        backgroundColor: '#b90618',
                        textTransform: 'none',
                        fontWeight: 'bold',
                        px: 2,
                        py: 1,
                        borderRadius: 2,
                        zIndex: 2,
                        '&:hover': {
                            backgroundColor: '#9e0514'
                        }
                    }}
                >
                    Đăng nhập
                </Button>

            </Toolbar>

            {/* Thanh menu màu đỏ */}
            <Box sx={{ display: 'flex', justifyContent: 'center', bgcolor: 'rgb(185, 6, 24)', py: 1 }}>
                {navItems.map((item) => (
                    <Button
                        key={item.label}
                        component={Link}
                        to={item.path}
                        sx={{
                            color: '#fff',
                            textTransform: 'none',
                            mx: 2,
                            fontWeight: 500,
                            '&:hover': {
                                backgroundColor: 'rgba(255,255,255,0.2)'
                            }
                        }}
                    >
                        {item.label}
                    </Button>
                ))}
            </Box>
        </AppBar>
    );
}
