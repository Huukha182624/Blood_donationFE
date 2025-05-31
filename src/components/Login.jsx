import React from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
    InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                backgroundImage: "url('/login.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '80vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
            }}
        >


            <Box
                sx={{
                    backgroundColor: 'rgba(251, 183, 183, 0.5)',
                    borderRadius: 4,
                    padding: 4,
                    maxWidth: 400,
                    width: '100%',
                    boxShadow: 3,
                }}
            >
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Box sx={{ fontSize: 60, color: '#fff' }}>👥</Box>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                        ỨNG DỤNG QUẢN LÝ ĐĂNG KÝ HIẾN MÁU
                    </Typography>
                </Box>

                <TextField
                    fullWidth
                    placeholder="Tên đăng nhập"
                    sx={{ mb: 2, backgroundColor: '#fff', borderRadius: 1 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <PersonIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    fullWidth
                    placeholder="Mật khẩu"
                    type="password"
                    sx={{ mb: 2, backgroundColor: '#fff', borderRadius: 1 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                />

                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 2,
                    }}
                >
                    <FormControlLabel
                        control={<Checkbox size="small" />}
                        label={<Typography variant="body2">Nhớ tên đăng nhập</Typography>}
                    />
                    <Typography
                        variant="body2"
                        color="primary"
                        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
                    >
                        <EmailIcon fontSize="small" sx={{ mr: 0.5 }} />
                        Quên mật khẩu
                    </Typography>
                </Box>

                <Button
                    fullWidth
                    variant="contained"
                    sx={{
                        backgroundColor: 'rgb(243, 110, 110)',
                        color: '#000',
                        fontWeight: 'bold',
                        mb: 2,
                        '&:hover': {
                            backgroundColor: 'rgb(255, 5, 5)',
                        },
                    }}
                >
                    ĐĂNG NHẬP
                </Button>

                {/* Dòng đăng ký */}
                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="#fff">
                        Chưa có tài khoản?{' '}
                        <Button
                            variant="text"
                            color="primary"
                            sx={{ fontWeight: 'bold', textTransform: 'none', ml: 1 }}
                            onClick={() => navigate('/dang-ky')}
                        >
                            Đăng ký
                        </Button>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Login;
