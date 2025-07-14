import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
    Paper,
} from "@mui/material";
import { useState } from "react";

const BloodRequestForm = () => {
    const [personalInfo, setPersonalInfo] = useState({
        fullName: '',
        dob: '',
        idCard: '',
        address: '',
        email: '',
        phone: '',
        reason: '',
        level: '',
    });

    const handlePersonalChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submitted data:", personalInfo);
        // TODO: Gửi dữ liệu đến backend tại đây
    };

    return (
        <>
            <Box sx={{ height: 180 }} />
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
                        backgroundColor: 'rgba(255,255,255,0.85)',
                        borderRadius: 4,
                        padding: { xs: 2, sm: 6 },
                        maxWidth: 600,
                        width: '100%',
                        boxShadow: 3,
                    }}
                >
                    <Typography
                        variant="h4"
                        gutterBottom
                        fontWeight="bold"
                        align="center"
                        color="#b71c1c"
                        sx={{ textShadow: '1px 1px 4px #fff, 0 2px 8px #fbb7b7' }}
                    >
                        Đăng ký cần máu
                    </Typography>
                    <form onSubmit={handleSubmit}>
                        <Grid container spacing={2} direction="column">
                            <Grid item>
                                <TextField
                                    fullWidth
                                    required
                                    label="Họ và tên"
                                    name="fullName"
                                    value={personalInfo.fullName}
                                    onChange={handlePersonalChange}
                                    InputLabelProps={{ style: { color: '#222', fontWeight: 500 } }}
                                    inputProps={{ style: { color: '#222', fontWeight: 500 } }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    required
                                    label="Ngày sinh"
                                    name="dob"
                                    type="date"
                                    InputLabelProps={{ shrink: true, style: { color: '#222', fontWeight: 500 } }}
                                    value={personalInfo.dob}
                                    onChange={handlePersonalChange}
                                    inputProps={{ style: { color: '#222', fontWeight: 500 } }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    required
                                    label="Số CMND/CCCD"
                                    name="idCard"
                                    value={personalInfo.idCard}
                                    onChange={handlePersonalChange}
                                    InputLabelProps={{ style: { color: '#222', fontWeight: 500 } }}
                                    inputProps={{ style: { color: '#222', fontWeight: 500 } }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    required
                                    label="Địa chỉ"
                                    name="address"
                                    value={personalInfo.address}
                                    onChange={handlePersonalChange}
                                    InputLabelProps={{ style: { color: '#222', fontWeight: 500 } }}
                                    inputProps={{ style: { color: '#222', fontWeight: 500 } }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    required
                                    label="Email"
                                    name="email"
                                    type="email"
                                    value={personalInfo.email}
                                    onChange={handlePersonalChange}
                                    InputLabelProps={{ style: { color: '#222', fontWeight: 500 } }}
                                    inputProps={{ style: { color: '#222', fontWeight: 500 } }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    required
                                    label="Số điện thoại"
                                    name="phone"
                                    value={personalInfo.phone}
                                    onChange={handlePersonalChange}
                                    InputLabelProps={{ style: { color: '#222', fontWeight: 500 } }}
                                    inputProps={{ style: { color: '#222', fontWeight: 500 } }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    required
                                    label="Lí do cần máu"
                                    name="reason"
                                    value={personalInfo.reason}
                                    onChange={handlePersonalChange}
                                    InputLabelProps={{ style: { color: '#222', fontWeight: 500 } }}
                                    inputProps={{ style: { color: '#222', fontWeight: 500 } }}
                                />
                            </Grid>
                            <Grid item>
                                <TextField
                                    fullWidth
                                    required
                                    label="Mức độ cần máu"
                                    name="level"
                                    value={personalInfo.level}
                                    onChange={handlePersonalChange}
                                    InputLabelProps={{ style: { color: '#222', fontWeight: 500 } }}
                                    inputProps={{ style: { color: '#222', fontWeight: 500 } }}
                                />
                            </Grid>
                            <Grid item>
                                <Button
                                    variant="contained"
                                    color="error"
                                    fullWidth
                                    type="submit"
                                    sx={{ fontWeight: 'bold', fontSize: 18, py: 1.5, borderRadius: 2, color: '#fff', letterSpacing: 1 }}>
                                    Gửi đăng ký
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Box>
        </>
    );
};

export default BloodRequestForm;
