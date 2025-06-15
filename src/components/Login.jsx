import  { useState } from 'react';
import {
    Box,
    Button,
    Checkbox,
    FormControlLabel,
    TextField,
    Typography,
    InputAdornment,
    Alert,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../store/userStore';
import { loginUser, getUserById } from '../services/user.service';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useUser();

    const handleLogin = async () => {
        setError('');
        setLoading(true);
        try {
            const res = await loginUser(email, password);
            if (res.user) {
                const userDetail = await getUserById(res.user.user_id);
                login(userDetail);
                navigate('/');
            } else {
                setError(res.message || 'Đăng nhập thất bại');
            }
        } catch (err) {
            setError(err.message || 'Đăng nhập thất bại');
        } finally {
            setLoading(false);
        }
    };

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

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <TextField
                    fullWidth
                    placeholder="Email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
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
                    placeholder="Mật khẩu"
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
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
                        label={<Typography variant="body2">Nhớ tài khoản</Typography>}
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
                    onClick={handleLogin}
                    disabled={loading}
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
