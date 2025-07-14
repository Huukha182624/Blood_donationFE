import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Avatar,
    Grid,
    Paper,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    IconButton
} from '@mui/material';
import { useUser } from '../store/userStore.jsx';

const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

const ProfileForm = () => {
    const { user } = useUser();
    const [avatarUrl, setAvatarUrl] = useState(user?.avatar_image || null);
    const [fullName, setFullName] = useState(user?.full_name || '');
    const [email, setEmail] = useState(user?.email || '');
    const [phone, setPhone] = useState(user?.phone_number || '');
    const [gender, setGender] = useState(user?.gender || 'male');
    const [birthday, setBirthday] = useState(user?.birthday ? user.birthday.slice(0, 10) : '');
    const [bloodType, setBloodType] = useState(user?.blood_type || '');
    const [address, setAddress] = useState(user?.address || '');

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

    const handleSubmit = () => {
        alert('Thông tin đã được lưu thành công!');
    };

    return (
        <>
            <Box sx={{ height: 140 }} />
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

                <Grid container spacing={2} direction="column">
                    {/* Họ tên */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Họ và tên"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            sx={{ backgroundColor: '#fff', borderRadius: 1, mb: 2 }}
                        />
                    </Grid>
                    {/* Email */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            sx={{ backgroundColor: '#fff', borderRadius: 1, mb: 2 }}
                        />
                    </Grid>
                    {/* Số điện thoại */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Số điện thoại"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            sx={{ backgroundColor: '#fff', borderRadius: 1, mb: 2 }}
                        />
                    </Grid>
                    {/* Giới tính */}
                    <Grid item xs={12}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <FormLabel>Giới tính</FormLabel>
                            <RadioGroup
                                row
                                value={gender}
                                onChange={(e) => setGender(e.target.value)}
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Nam" />
                                <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                                <FormControlLabel value="other" control={<Radio />} label="Khác" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    {/* Ngày sinh */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Ngày sinh"
                            type="date"
                            InputLabelProps={{ shrink: true }}
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                            sx={{ backgroundColor: '#fff', borderRadius: 1, mb: 2 }}
                        />
                    </Grid>
                    {/* Nhóm máu */}
                    <Grid item xs={12}>
                        <FormControl fullWidth sx={{ mb: 2 }}>
                            <InputLabel>Nhóm máu</InputLabel>
                            <Select
                                value={bloodType}
                                label="Nhóm máu"
                                onChange={(e) => setBloodType(e.target.value)}
                                sx={{ backgroundColor: '#fff', borderRadius: 1 }}
                            >
                                {bloodTypes.map((type) => (
                                    <MenuItem key={type} value={type}>{type}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    {/* Địa chỉ */}
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Địa chỉ"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            sx={{ backgroundColor: '#fff', borderRadius: 1, mb: 2 }}
                        />
                    </Grid>
                    {/* Nút Submit */}
                    <Grid item xs={12}>
                        <Button
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ fontWeight: 'bold', fontSize: 18, py: 1.5, borderRadius: 2, background: '#d32f2f' }}
                            onClick={handleSubmit}
                        >
                            Lưu thông tin
                        </Button>
                    </Grid>
                </Grid>
            </Paper>
        </>
    );
};

export default ProfileForm;
