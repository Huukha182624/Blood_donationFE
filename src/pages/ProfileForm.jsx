import { useState, useEffect } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    Grid,
    Paper,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton,
    Alert
} from '@mui/material';
import { useUser } from '../store/userStore.jsx';
import { updateUserProfile } from '../services/user.service.js';

const bloodTypes = ["None", "A_POS", "A_NEG", "B_POS", "B_NEG", "AB_POS", "AB_NEG", "O_POS", "O_NEG"];
const genders = ["Male", "Female", "Other"];

const ProfileForm = () => {
    const { user, login } = useUser(); // Lấy hàm login để cập nhật state toàn cục

    // Khởi tạo state ban đầu
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [gender, setGender] = useState('');
    const [birthday, setBirthday] = useState('');
    const [bloodType, setBloodType] = useState('');
    const [address, setAddress] = useState('');

    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // --- BẮT ĐẦU PHẦN SỬA LỖI ---
    // Sử dụng useEffect để đồng bộ state của form với user context
    useEffect(() => {
        if (user) {
            setAvatarUrl(user.avatarImage || null);
            setFullName(user.fullName || '');
            setEmail(user.email || '');
            setPhone(user.phoneNumber || '');
            setGender(user.gender || '');
            setBirthday(user.birthday ? new Date(user.birthday).toISOString().slice(0, 10) : '');
            setBloodType(user.bloodType || '');
            setAddress(user.address || '');
        }
    }, [user]); // Dependency array: Chạy lại hiệu ứng này mỗi khi đối tượng 'user' thay đổi
    // --- KẾT THÚC PHẦN SỬA LỖI ---


    const handleAvatarChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                setAvatarUrl(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async () => {
        setSuccessMessage('');
        setErrorMessage('');

        const payload = {
            fullName,
            phoneNumber: phone,
            address,
            gender,
            birthday: birthday ? new Date(birthday).toISOString() : null,
            bloodType,
            avatarImage: avatarUrl, // Giả sử bạn sẽ xử lý việc upload ảnh và lấy URL
        };

        try {
            const updatedUser = await updateUserProfile(payload);
            // Cập nhật lại thông tin user trong state toàn cục (Zustand)
            login(updatedUser); 
            setSuccessMessage('Cập nhật thông tin thành công!');
        } catch (error) {
            setErrorMessage(error.message || 'Cập nhật thất bại. Vui lòng thử lại.');
        }
    };

    return (
        <Paper
            elevation={4}
            sx={{
                maxWidth: 600,
                mx: 'auto',
                my: 4,
                p: 4,
                borderRadius: 4,
                background: 'rgba(255,255,255,0.95)'
            }}
        >
            {/* Avatar */}
            <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
                <label htmlFor="avatar-upload">
                    <input
                        accept="image/*"
                        id="avatar-upload"
                        type="file"
                        style={{ display: 'none' }}
                        onChange={handleAvatarChange}
                    />
                    <IconButton component="span">
                        <Avatar
                            src={avatarUrl}
                            sx={{ width: 110, height: 110, border: '3px solid #d32f2f' }}
                        >
                            {!avatarUrl && (fullName ? fullName[0] : 'U')}
                        </Avatar>
                    </IconButton>
                </label>
                <Typography variant="body2" color="textSecondary">
                    Nhấn để đổi ảnh đại diện
                </Typography>
            </Box>

            <Typography variant="h5" fontWeight="bold" gutterBottom align="center" color="#d32f2f">
                Thông tin người dùng
            </Typography>

            {successMessage && <Alert severity="success" sx={{ mb: 2 }}>{successMessage}</Alert>}
            {errorMessage && <Alert severity="error" sx={{ mb: 2 }}>{errorMessage}</Alert>}

            <Grid container spacing={2}>
                {/* Họ tên */}
                <Grid item xs={12}>
                    <TextField fullWidth label="Họ và tên" value={fullName} onChange={(e) => setFullName(e.target.value)} />
                </Grid>
                {/* Email */}
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Email" value={email} disabled />
                </Grid>
                {/* Số điện thoại */}
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Số điện thoại" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </Grid>
                {/* Giới tính */}
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Giới tính</InputLabel>
                        <Select value={gender} label="Giới tính" onChange={(e) => setGender(e.target.value)}>
                            {genders.map((g) => (<MenuItem key={g} value={g}>{g}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>
                {/* Ngày sinh */}
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Ngày sinh" type="date" InputLabelProps={{ shrink: true }} value={birthday} onChange={(e) => setBirthday(e.target.value)} />
                </Grid>
                {/* Nhóm máu */}
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Nhóm máu</InputLabel>
                        <Select value={bloodType} label="Nhóm máu" onChange={(e) => setBloodType(e.target.value)}>
                            {bloodTypes.map((type) => (<MenuItem key={type} value={type}>{type}</MenuItem>))}
                        </Select>
                    </FormControl>
                </Grid>
                {/* Địa chỉ */}
                <Grid item xs={12} md={6}>
                    <TextField fullWidth label="Địa chỉ" value={address} onChange={(e) => setAddress(e.target.value)} />
                </Grid>
                {/* Nút Submit */}
                <Grid item xs={12}>
                    <Button fullWidth variant="contained" color="primary" sx={{ fontWeight: 'bold', fontSize: 18, py: 1.5, borderRadius: 2, background: '#d32f2f' }} onClick={handleSubmit}>
                        Lưu thông tin
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ProfileForm;
