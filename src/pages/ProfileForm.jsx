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

const ProfileForm = () => {
    const [avatarUrl, setAvatarUrl] = useState(null);
    const [fullname, setFullname] = useState('Nguyễn Trung Kiên');
    const [email, setEmail] = useState('kienntvn@gmail.com');
    const [phone, setPhone] = useState('0912656836');
    const [gender, setGender] = useState('male');
    const [role, setRole] = useState('Role 1');
    const [status, setStatus] = useState('Active');
    const [company, setCompany] = useState('FPT');
    const [school, setSchool] = useState('');
    const [address, setAddress] = useState('');
    const [cccd, setCCCD] = useState('');
    const [issueDate, setIssueDate] = useState('');
    const [note, setNote] = useState('');

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
        <Paper
            elevation={3}
            sx={{
                maxWidth: 900,
                mx: 'auto',
                my: 4,
                p: 4,
                borderRadius: 3,
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
                            sx={{ width: 100, height: 100 }}
                        >
                            {!avatarUrl && 'U'}
                        </Avatar>
                    </IconButton>
                </label>
                <Typography variant="body2" color="textSecondary">
                    Nhấn để đổi ảnh đại diện
                </Typography>
            </Box>

            <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
                Thông tin người dùng
            </Typography>

            <Grid container spacing={2}>
                {/* Họ tên | Giới tính */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Họ tên"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <FormLabel>Giới tính</FormLabel>
                        <RadioGroup
                            row
                            value={gender}
                            onChange={(e) => setGender(e.target.value)}
                        >
                            <FormControlLabel value="male" control={<Radio />} label="Nam" />
                            <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                            <FormControlLabel value="other" control={<Radio />} label="Chưa rõ" />
                        </RadioGroup>
                    </FormControl>
                </Grid>

                {/* Mobile | Email */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Mobile"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </Grid>

                {/* Roles | Status */}
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Roles</InputLabel>
                        <Select
                            value={role}
                            label="Roles"
                            onChange={(e) => setRole(e.target.value)}
                        >
                            <MenuItem value="Role 1">Role 1</MenuItem>
                            <MenuItem value="Role 2">Role 2</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                        <InputLabel>Status</InputLabel>
                        <Select
                            value={status}
                            label="Status"
                            onChange={(e) => setStatus(e.target.value)}
                        >
                            <MenuItem value="Active">Active</MenuItem>
                            <MenuItem value="Inactive">Inactive</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                {/* Công ty | Trường học */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Công ty"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Trường học"
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                    />
                </Grid>

                {/* Địa chỉ (full width) */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Địa chỉ"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </Grid>

                {/* CCCD | Ngày cấp */}
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        label="Số CCCD"
                        value={cccd}
                        onChange={(e) => setCCCD(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} md={6}>
                    <TextField
                        fullWidth
                        type="date"
                        label="Ngày cấp"
                        InputLabelProps={{ shrink: true }}
                        value={issueDate}
                        onChange={(e) => setIssueDate(e.target.value)}
                    />
                </Grid>

                {/* Ghi chú bệnh án */}
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Ghi chú bệnh án"
                        multiline
                        minRows={3}
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </Grid>

                {/* Nút Submit */}
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleSubmit}
                    >
                        Submit
                    </Button>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default ProfileForm;
