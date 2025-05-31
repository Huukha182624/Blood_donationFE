// src/pages/ProfileForm.jsx
import { useState } from 'react';
import { Box, Typography, TextField, Button, Alert } from '@mui/material';

const ProfileForm = () => {
    const [fullname, setFullname] = useState('');
    const [address, setAddress] = useState('');
    const [success, setSuccess] = useState('');

    const handleSubmit = () => {
        if (!fullname || !address) return;
        setSuccess('Thông tin đã được lưu!');
    };

    return (
        <Box sx={{ maxWidth: 400, mx: 'auto', mt: 8, p: 3, border: '1px solid #ccc', borderRadius: 2 }}>
            <Typography variant="h5" sx={{ mb: 2 }}>Hồ sơ người dùng</Typography>

            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            <TextField
                fullWidth
                label="Họ và tên"
                value={fullname}
                onChange={(e) => setFullname(e.target.value)}
                sx={{ mb: 2 }}
            />
            <TextField
                fullWidth
                label="Địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ mb: 2 }}
            />
            <Button variant="contained" onClick={handleSubmit} fullWidth>
                Lưu thông tin
            </Button>
        </Box>
    );
};

export default ProfileForm;
