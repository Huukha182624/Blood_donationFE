// src/pages/ProfileForm.jsx
import { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    Button,
    Alert,
    Avatar,
    Grid,
    Paper
} from '@mui/material';

const ProfileForm = () => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [dob, setDob] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = () => {
        if (!fullname || !email || !phone || !address || !dob) return;
        setSuccess('Thông tin đã được lưu thành công!');
    };

    return (
        <Paper
            elevation={4}
            sx={{ maxWidth: 600, mx: 'auto', mt: 6, p: 4, borderRadius: 3 }}
        >
            <Typography variant="h4" gutterBottom align="center" color="primary">
                Hồ sơ người dùng
            </Typography>

            {success && (
                <Alert severity="success" sx={{ mb: 2 }}>
                    {success}
                </Alert>
            )}

            <Grid container spacing={2}>
                <Grid item xs={12} sx={{ textAlign: 'center' }}>
                    <Avatar
                        alt="User Avatar"
                        src="/default-avatar.png"
                        sx={{ width: 100, height: 100, mx: 'auto' }}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Họ và tên"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Số điện thoại"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Địa chỉ"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Ngày sinh"
                        type="date"
                        value={dob}
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => setDob(e.target.value)}
                    />
                </Grid>

                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        fullWidth
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Lưu thông tin
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ProfileForm;
