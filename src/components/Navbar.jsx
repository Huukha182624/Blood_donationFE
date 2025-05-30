import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';

export default function Navbar() {
    return (
        <AppBar position="static" sx={{ backgroundColor: 'rgb(240, 221, 221)' }}>
            {/* Thanh trên gồm: logo - tiêu đề ở giữa - đăng nhập */}
            <Toolbar sx={{ px: 2, justifyContent: 'space-between', alignItems: 'center' }}>
                {/* Logo bên trái */}
                <Box component="img" src="/logo.png" alt="Logo" sx={{ height: 100 }} />

                {/* Tiêu đề chính giữa */}
                <Box sx={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
                    <Typography variant="h5" sx={{ fontWeight: 'bold', color: 'rgb(114, 6, 17)' }}>
                        VIỆN HUYẾT HỌC - TRUYỀN MÁU TRUNG ƯƠNG
                    </Typography>
                    <Typography variant="caption" sx={{ fontWeight: 'bold', color: '#343a40' }}>
                        National Institute of Hematology and Blood Transfusion (NIHBT)
                    </Typography>
                </Box>

                {/* Nút đăng nhập bên phải */}
                <Button sx={{ color: 'white', backgroundColor: '#b90618', textTransform: 'none', fontWeight: 'bold', px: 2, py: 1, borderRadius: 2 }}>
                    Đăng nhập
                </Button>
            </Toolbar>

            {/* Thanh menu màu đỏ */}
            <Box sx={{ display: 'flex', justifyContent: 'space-around', bgcolor: 'rgb(185, 6, 24)', py: 1 }}>
                {['Trang chủ', 'Giới thiệu', 'Chuyên môn', 'Hiến máu', 'Tin tức', 'Thông tin cần biết'].map((item) => (
                    <Button key={item} sx={{ color: '#fff', textTransform: 'none' }}>{item}</Button>
                ))}
            </Box>
        </AppBar>
    );
}
