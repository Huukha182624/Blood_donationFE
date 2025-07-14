import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    Checkbox,
    TextField,
    Typography,
} from "@mui/material";
import React, { useState } from "react";

const HealthScreeningForm = () => {
    const [hasDisease, setHasDisease] = useState('no');
    const [diseaseDetail, setDiseaseDetail] = useState('');
    const [specialVaccine, setSpecialVaccine] = useState('');
    const [recentVaccine, setRecentVaccine] = useState('');

    // Thông tin cá nhân
    const [personalInfo, setPersonalInfo] = useState({
        fullName: '',
        dob: '',
        idCard: '',
        address: '',
        email: '',
        phone: '',
        donateDate: '',
        donatePlace: '',
    });

    const handlePersonalChange = (e) => {
        const { name, value } = e.target;
        setPersonalInfo((prev) => ({ ...prev, [name]: value }));
    };

    return (
        <>
            <Box sx={{ height: 40, backgroundColor: '#f8eaea' }} />
            <Box sx={{ maxWidth: 700, mx: "auto", p: 2 }}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                    Đăng ký hiến máu
                </Typography>
                <Grid container spacing={2} direction="column">
                    {/* Thông tin cá nhân */}
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
                        <TextField fullWidth required label="Email" name="email" value={personalInfo.email} onChange={handlePersonalChange} />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth required label="Số điện thoại" name="phone" value={personalInfo.phone} onChange={handlePersonalChange} />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth required label="Ngày muốn hiến máu" name="donateDate" type="date" InputLabelProps={{ shrink: true }} value={personalInfo.donateDate} onChange={handlePersonalChange} />
                    </Grid>
                    <Grid item>
                        <TextField fullWidth required label="Địa điểm muốn hiến máu" name="donatePlace" value={personalInfo.donatePlace} onChange={handlePersonalChange} />
                    </Grid>
                </Grid>

                {/* PHIẾU ĐÁNH GIÁ SỨC KHỎE NGƯỜI HIẾN MÁU */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        🧾 PHIẾU ĐÁNH GIÁ SỨC KHỎE NGƯỜI HIẾN MÁU
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" sx={{ mt: 2, mb: 2 }}>I. CÂU HỎI SÀNG LỌC</Typography>
                    <Box sx={{ mb: 2 }}>
                        <Typography fontWeight="bold" display="inline">
                            Anh/chị đã từng hiến máu chưa?
                        </Typography>
                        <FormControlLabel sx={{ ml: 2 }} value="yes" control={<Radio />} label="Có" />
                        <FormControlLabel value="no" control={<Radio />} label="Không" />
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography fontWeight="bold">
                            Hiện tại, anh/chị có mắc bệnh như: viêm khớp, đau dạ dày, viêm gan, vàng da, bệnh tim, huyết áp thấp/cao, hen, ho kéo dài, bệnh máu,... không?
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                            <FormControlLabel value="yes" control={<Radio checked={hasDisease === 'yes'} onChange={() => setHasDisease('yes')} />} label="Có" />
                            <FormControlLabel value="no" control={<Radio checked={hasDisease === 'no'} onChange={() => setHasDisease('no')} />} label="Không" />
                            {hasDisease === 'yes' && (
                                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                                    <Typography sx={{ mr: 1 }}>– Nếu Có, vui lòng ghi rõ bệnh:</Typography>
                                    <TextField size="small" placeholder="....................................................." value={diseaseDetail} onChange={e => setDiseaseDetail(e.target.value)} sx={{ width: 250 }} />
                                </Box>
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography fontWeight="bold" sx={{ mb: 1 }}>
                            Trong 12 tháng gần đây, anh/chị có mắc các bệnh và đã được điều trị khỏi:
                        </Typography>
                        <Box sx={{ ml: 2 }}>
                            <FormControlLabel control={<Checkbox />} label={<Typography>Sốt rét</Typography>} />
                            <FormControlLabel control={<Checkbox />} label={<Typography>Giang mai, Lao, Viêm não, Phẫu thuật ngoại khoa</Typography>} />
                            <FormControlLabel control={<Checkbox />} label={<Typography>Bị truyền máu, chế phẩm máu</Typography>} />
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <FormControlLabel control={<Checkbox />} label={<Typography>Tiêm vaccine bệnh đặc biệt (khác):</Typography>} />
                                <TextField size="small" placeholder="............................." value={specialVaccine} onChange={e => setSpecialVaccine(e.target.value)} sx={{ width: 180, ml: 1 }} />
                            </Box>
                        </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography fontWeight="bold" sx={{ mb: 1 }}>
                            Trong 06 tháng gần đây, anh/chị có bị một trong số các triệu chứng sau không?
                        </Typography>
                        <Box sx={{ ml: 2 }}>
                            <FormControlLabel control={<Checkbox />} label={<Typography>Sút cân không rõ nguyên nhân</Typography>} />
                            <FormControlLabel control={<Checkbox />} label={<Typography>Nổi hạch kéo dài</Typography>} />
                            <FormControlLabel control={<Checkbox />} label={<Typography>Rất ngứa, chàm, vẩy nến</Typography>} />
                            <FormControlLabel control={<Checkbox />} label={<Typography>Xăm mình, xỏ lỗ tai, lỗ mũi...</Typography>} />
                            <FormControlLabel control={<Checkbox />} label={<Typography>Sử dụng ma túy</Typography>} />
                            <FormControlLabel control={<Checkbox />} label={<Typography>Quan hệ tình dục với người nhiễm HIV hoặc người có hành vi nguy cơ</Typography>} />
                        </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography fontWeight="bold" sx={{ mb: 1 }}>
                            Trong 01 tháng gần đây, anh/chị có:
                        </Typography>
                        <Box sx={{ ml: 2 }}>
                            <FormControlLabel control={<Checkbox />} label={<Typography>Khỏi bệnh sau khi mắc viêm đường tiết niệu, viêm tai giữa, viêm phổi, quai bị, sởi, Rubella...</Typography>} />
                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                <FormControlLabel control={<Checkbox />} label={<Typography>Tiêm vaccine ngừa bệnh gì?</Typography>} />
                                <TextField size="small" placeholder="............................." value={recentVaccine} onChange={e => setRecentVaccine(e.target.value)} sx={{ width: 180, ml: 1 }} />
                            </Box>
                            <FormControlLabel control={<Checkbox />} label={<Typography>Đi vào vùng có dịch lưu hành sốt rét, Zika, SXH...</Typography>} />
                        </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography fontWeight="bold" sx={{ mb: 1 }}>
                            Trong 07 ngày gần đây, anh/chị có:
                        </Typography>
                        <Box sx={{ ml: 2 }}>
                            <FormControlLabel control={<Checkbox />} label={<Typography>Bị cảm cúm, ho, nhức đầu, sốt</Typography>} />
                            <FormControlLabel control={<Checkbox />} label={<Typography>Đang dùng thuốc cảm, Aspirin, Corticoid</Typography>} />
                            <FormControlLabel control={<Checkbox />} label={<Typography>Tiêm vaccine cúm, sởi, viêm gan siêu vi B</Typography>} />
                        </Box>
                    </Box>
                    <Box sx={{ mb: 2 }}>
                        <Typography fontWeight="bold" sx={{ mb: 1 }}>
                            Chị em phụ nữ:
                        </Typography>
                        <Box sx={{ ml: 2 }}>
                            <FormControlLabel control={<Checkbox />} label={<Typography>Đang có thai, sau sinh dưới 12 tháng</Typography>} />
                            <FormControlLabel control={<Checkbox />} label={<Typography>Đang hành kinh hoặc vừa hết kinh &lt; 3 ngày</Typography>} />
                        </Box>
                    </Box>
                    <Button variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
                        Gửi đăng ký
                    </Button>
                </Box>
            </Box>
        </>
    );
};

export default HealthScreeningForm;
