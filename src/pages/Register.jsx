import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    InputAdornment,
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [step, setStep] = useState(1);
    const [username, setUsername] = useState('');
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [otp, setOtp] = useState('');
    const [sentOtp, setSentOtp] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSendOtp = () => {
        if (!username || !contact || !password || !confirmPassword) {
            setError('Vui lòng điền đầy đủ thông tin.');
            return;
        }
        if (password !== confirmPassword) {
            setError('Mật khẩu xác nhận không khớp.');
            return;
        }

        const generatedOtp = Math.floor(100000 + Math.random() * 900000).toString();
        setSentOtp(generatedOtp);
        setStep(2);
        setError('');
        alert(`Mã OTP của bạn là: ${generatedOtp}`);
    };

    const handleVerifyOtp = () => {
        if (otp === sentOtp) {
            navigate('/ho-so');
        } else {
            setError('Mã OTP không chính xác.');
        }
    };

    return (
        <Box
            sx={{
                backgroundImage: "url('/register.jpg')",
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                px: 2,
            }}
        >
            <Box
                sx={{
                    backgroundColor: 'rgba(185, 234, 246, 0.5)',
                    borderRadius: 4,
                    padding: 7,
                    maxWidth: 500,
                    width: '120%',
                    boxShadow: 3,
                }}
            >
                <Box sx={{ textAlign: 'center', mb: 2 }}>
                    <Box sx={{ fontSize: 60, color: '#fff' }}>📝</Box>
                    <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
                        TẠO TÀI KHOẢN MỚI
                    </Typography>
                </Box>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                {step === 1 ? (
                    <>
                        <TextField
                            fullWidth
                            placeholder="Tên đăng nhập"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
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
                            placeholder="Email hoặc Số điện thoại"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            sx={{ mb: 2, backgroundColor: '#fff', borderRadius: 1 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <EmailIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            placeholder="Mật khẩu"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            sx={{ mb: 2, backgroundColor: '#fff', borderRadius: 1 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <TextField
                            fullWidth
                            type="password"
                            placeholder="Xác nhận mật khẩu"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            sx={{ mb: 3, backgroundColor: '#fff', borderRadius: 1 }}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon color="action" />
                                    </InputAdornment>
                                ),
                            }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: 'rgb(243, 110, 110)',
                                color: '#000',
                                fontWeight: 'bold',
                                mb: 2,
                                '&:hover': {
                                    backgroundColor: 'rgb(247, 33, 33)',
                                },
                            }}
                            onClick={handleSendOtp}
                        >
                            Gửi mã xác thực
                        </Button>
                    </>
                ) : (
                    <>
                        <Typography sx={{ mb: 1 }}>Nhập mã xác thực đã gửi:</Typography>
                        <TextField
                            fullWidth
                            label="Mã OTP"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            sx={{ mb: 2, backgroundColor: '#fff', borderRadius: 1 }}
                        />
                        <Button
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: 'rgb(243, 110, 110)',
                                color: '#000',
                                fontWeight: 'bold',
                                mb: 2,
                                '&:hover': {
                                    backgroundColor: 'rgb(247, 33, 33)',
                                },
                            }}
                            onClick={handleVerifyOtp}
                        >
                            Xác minh và tiếp tục
                        </Button>
                    </>
                )}

                <Box sx={{ textAlign: 'center' }}>
                    <Typography variant="body2" color="#fff">
                        Đã có tài khoản?{' '}
                        <Button
                            variant="text"
                            color="primary"
                            sx={{ fontWeight: 'bold', textTransform: 'none', ml: 1 }}
                            onClick={() => navigate('/dang-nhap')}
                        >
                            Đăng nhập
                        </Button>
                    </Typography>
                </Box>
            </Box>
        </Box>
    );
};

export default Register;
