import {
    Box,
    Button,
    Grid,
    TextField,
    Typography,
} from "@mui/material";
import  { useState } from "react";

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
        <Box sx={{ maxWidth: 700, mx: "auto", p: 2 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                Đăng ký cần máu
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={2} direction="column">
                    <Grid item>
                        <TextField fullWidth required label="Họ và tên" name="fullName" value={personalInfo.fullName} onChange={handlePersonalChange} />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth required label="Ngày sinh" name="dob" type="date" InputLabelProps={{ shrink: true }} value={personalInfo.dob} onChange={handlePersonalChange} />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth required label="Số CMND/CCCD" name="idCard" value={personalInfo.idCard} onChange={handlePersonalChange} />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth required label="Địa chỉ" name="address" value={personalInfo.address} onChange={handlePersonalChange} />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth required label="Email" name="email" type="email" value={personalInfo.email} onChange={handlePersonalChange} />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth required label="Số điện thoại" name="phone" value={personalInfo.phone} onChange={handlePersonalChange} />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth required label="Lí do cần máu" name="reason" value={personalInfo.reason} onChange={handlePersonalChange} />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth required label="Mức độ cần máu" name="level" value={personalInfo.level} onChange={handlePersonalChange} />
                    </Grid>
                    <Grid item>
                        <Button variant="contained" color="primary" fullWidth type="submit">
                            Gửi đăng ký
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default BloodRequestForm;
