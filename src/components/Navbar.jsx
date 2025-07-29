import { AppBar, Toolbar, Typography, Box, Button, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../store/userStore.jsx';
import { useState } from 'react';

export default function Navbar() {
    const navItems = [
        { label: 'Trang chủ', path: '/' },
        { label: 'Giới thiệu', path: '/gioi-thieu' },
        { label: 'Lịch sử ', path: '/don-dang-ki' },
        { label: 'Hỏi đáp', path: '/hoi-dap' },
        { label: 'Tin tức', path: '/tin-tuc' },
        { label: 'Liên Hệ', path: '/lien-he' },
    ];
    const { user, logout } = useUser();
    const [anchorEl, setAnchorEl] = useState(null);
    const navigate = useNavigate();

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    const handleLogout = () => {
        logout();
        handleClose();
        navigate('/dang-nhap');
    };
    const handleProfile = () => {
        handleClose();
        navigate('/ho-so');
    };

    return (
        <AppBar position="static" sx={{ backgroundColor: 'rgb(240, 221, 221)', boxShadow: 'none' }}>
            {/* Thanh trên gồm: logo - tiêu đề ở giữa - đăng nhập/avatar */}
            <Toolbar sx={{ px: 2, justifyContent: 'space-between', alignItems: 'center', position: 'relative' }}>
                {/* Logo bên trái */}
                <Box component="img" src="/logo.png" alt="Logo" sx={{ height: 120 }} />

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

                {/* Nút đăng nhập/avatar bên phải */}
                {user ? (
                    <>
                        <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                            <Avatar src={user.avatar_image || undefined} alt={user.full_name || 'User'} />
                        </IconButton>
                        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
                            <MenuItem onClick={handleProfile}>Xem hồ sơ</MenuItem>
                            {user.role === 'Admin' && 'Staff' && (
                                <MenuItem onClick={() => { handleClose(); navigate('/admin'); }}>Quản lý</MenuItem>
                            )}
                            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
                        </Menu>
                    </>
                ) : (
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
                )}

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
                            fontWeight: "bold",
                            fontSize: '18px',
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
