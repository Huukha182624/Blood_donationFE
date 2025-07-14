import React, { useState } from "react";
import {
    Box,
    Button,
    Grid,
    Radio,
    RadioGroup,
    Checkbox,
    TextField,
    Typography,
    Alert,
    FormControlLabel,
    MenuItem
} from "@mui/material";
// CẢI TIẾN: Import hàm API từ file service riêng
import { registerForCampaign } from "../services/Campaign/registration.service";
import { useUser } from "../store/userStore";


// --- COMPONENT CHÍNH ---
const HealthScreeningForm = ({ selectedCampaign, onClose }) => {
    const { user } = useUser(); // Lấy thông tin người dùng đã đăng nhập

    // State cho các input
    const [note, setNote] = useState('');
    const [productType, setProductType] = useState('WholeBlood');

    // State cho tất cả các câu hỏi sàng lọc sức khỏe
    const [healthAnswers, setHealthAnswers] = useState({
        hasChronicDisease: 'no',
        sotRet: false,
        giangMaiLao: false,
        truyenMau: false,
        sutCan: false,
        xamMinh: false,
        quanHeHIV: false,
        coThai: false,
        hanhKinh: false,
    });
    
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Kiểm tra xem người dùng có đủ điều kiện không
    const isEligible = 
        healthAnswers.hasChronicDisease === 'no' &&
        !Object.values(healthAnswers).some(answer => typeof answer === 'boolean' && answer === true);

    // Handler cho các câu hỏi sức khỏe
    const handleHealthChange = (e) => {
        const { name, value, type, checked } = e.target;
        const answer = type === 'checkbox' ? checked : value;
        setHealthAnswers((prev) => ({ ...prev, [name]: answer }));
    };

    // Handler khi gửi form
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!isEligible) {
            alert('Dựa trên thông tin bạn cung cấp, bạn chưa đủ điều kiện để hiến máu tại thời điểm này. Vui lòng liên hệ nhân viên y tế để được tư vấn thêm.');
            return;
        }
        
        if (!selectedCampaign || !selectedCampaign.id) {
            alert('Lỗi: Không tìm thấy thông tin sự kiện. Vui lòng thử lại.');
            return;
        }

        setIsSubmitting(true);

        const payload = {
            campaignId: Number(selectedCampaign.id),
            note: note,
            productType: productType,
        };

        try {
            // CẢI TIẾN: Gọi hàm API đã được import từ service
            await registerForCampaign(payload);
            alert('Đăng ký hiến máu thành công! Chúng tôi sẽ liên hệ với bạn để xác nhận lịch hẹn.');
            onClose(); // Đóng form sau khi thành công
        } catch (error) {
            console.error("Registration failed:", error);
            // Logic xử lý lỗi không đổi, vì service đã ném ra lỗi có cấu trúc tương tự
            const errorMessage = error.message || 'Đăng ký thất bại. Đã có lỗi xảy ra.';
            alert(errorMessage);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 800, mx: "auto", p: 3, border: '1px solid #ddd', borderRadius: 2, boxShadow: 3 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" color="primary.main" textAlign="center">
                Phiếu Đăng ký Hiến máu
            </Typography>

            {/* --- THÔNG TIN CÁ NHÂN (TỰ ĐỘNG ĐIỀN) --- */}
            <Typography variant="h6" fontWeight="bold" sx={{ mt: 3, mb: 1 }}>I. THÔNG TIN CÁ NHÂN</Typography>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth disabled label="Họ và tên" value={user?.fullName || ''} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField 
                        fullWidth 
                        disabled 
                        label="Ngày sinh" 
                        value={user?.birthday ? new Date(user.birthday).toLocaleDateString('vi-VN') : ''} 
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth disabled label="Email" value={user?.email || ''} />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField fullWidth disabled label="Số điện thoại" value={user?.phoneNumber || ''} />
                </Grid>
                <Grid item xs={12}>
                    <TextField fullWidth disabled label="Địa chỉ" value={user?.address || ''} />
                </Grid>
            </Grid>

            {/* --- THÔNG TIN ĐĂNG KÝ --- */}
            <Typography variant="h6" fontWeight="bold" sx={{ mt: 3, mb: 1 }}>II. THÔNG TIN ĐĂNG KÝ</Typography>
            <Grid container spacing={2}>
                 <Grid item xs={12} sm={6}>
                    <TextField
                        fullWidth
                        disabled
                        label="Sự kiện đã chọn"
                        value={`${selectedCampaign.name} - (${new Date(selectedCampaign.activeTime).toLocaleDateString('vi-VN')})`}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        select
                        fullWidth
                        label="Loại máu hiến tặng"
                        value={productType}
                        onChange={(e) => setProductType(e.target.value)}
                    >
                        <MenuItem value="WholeBlood">Máu toàn phần</MenuItem>
                        <MenuItem value="Platelet">Tiểu cầu</MenuItem>
                        <MenuItem value="Plasma">Huyết tương</MenuItem>
                    </TextField>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Ghi chú (Tùy chọn)"
                        name="note"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        multiline
                        rows={2}
                    />
                </Grid>
            </Grid>

            {/* --- PHIẾU ĐÁNH GIÁ SỨC KHỎE --- */}
            <Typography variant="h6" fontWeight="bold" sx={{ mt: 3, mb: 1 }}>III. CÂU HỎI SÀNG LỌC SỨC KHỎE</Typography>
            
            <Box sx={{ mb: 2 }}>
                <Typography fontWeight="bold">Hiện tại, anh/chị có mắc bệnh như: viêm khớp, đau dạ dày, viêm gan, vàng da, bệnh tim, huyết áp thấp/cao, hen, ho kéo dài, bệnh máu,... không?</Typography>
                <RadioGroup row name="hasChronicDisease" value={healthAnswers.hasChronicDisease} onChange={handleHealthChange}>
                    <FormControlLabel value="yes" control={<Radio />} label="Có" />
                    <FormControlLabel value="no" control={<Radio />} label="Không" />
                </RadioGroup>
            </Box>

            <Box sx={{ mb: 2 }}>
                <Typography fontWeight="bold">Trong 12 tháng gần đây, anh/chị có mắc các bệnh và đã được điều trị khỏi:</Typography>
                <Box sx={{ ml: 2 }}>
                    <FormControlLabel control={<Checkbox name="sotRet" checked={healthAnswers.sotRet} onChange={handleHealthChange} />} label="Sốt rét" />
                    <FormControlLabel control={<Checkbox name="giangMaiLao" checked={healthAnswers.giangMaiLao} onChange={handleHealthChange} />} label="Giang mai, Lao, Viêm não, Phẫu thuật" />
                    <FormControlLabel control={<Checkbox name="truyenMau" checked={healthAnswers.truyenMau} onChange={handleHealthChange} />} label="Bị truyền máu, chế phẩm máu" />
                </Box>
            </Box>
            
            <Box sx={{ mb: 2 }}>
                <Typography fontWeight="bold">Trong 06 tháng gần đây, anh/chị có bị một trong số các triệu chứng/hành vi sau không?</Typography>
                <Box sx={{ ml: 2 }}>
                    <FormControlLabel control={<Checkbox name="sutCan" checked={healthAnswers.sutCan} onChange={handleHealthChange} />} label="Sút cân không rõ nguyên nhân" />
                    <FormControlLabel control={<Checkbox name="xamMinh" checked={healthAnswers.xamMinh} onChange={handleHealthChange} />} label="Xăm mình, xỏ lỗ tai, lỗ mũi..." />
                    <FormControlLabel control={<Checkbox name="quanHeHIV" checked={healthAnswers.quanHeHIV} onChange={handleHealthChange} />} label="Quan hệ tình dục với người có nguy cơ" />
                </Box>
            </Box>
            
            <Box sx={{ mb: 2 }}>
                <Typography fontWeight="bold">Chị em phụ nữ:</Typography>
                 <Box sx={{ ml: 2 }}>
                    <FormControlLabel control={<Checkbox name="coThai" checked={healthAnswers.coThai} onChange={handleHealthChange} />} label="Đang có thai hoặc sau sinh dưới 12 tháng" />
                    <FormControlLabel control={<Checkbox name="hanhKinh" checked={healthAnswers.hanhKinh} onChange={handleHealthChange} />} label="Đang trong kỳ kinh nguyệt" />
                </Box>
            </Box>

            {!isEligible && (
                <Alert severity="warning" sx={{ mt: 2 }}>
                    Dựa trên thông tin bạn cung cấp, bạn chưa đủ điều kiện để hiến máu tại thời điểm này.
                </Alert>
            )}

            <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 3, py: 1.5, fontSize: '1.1rem' }} disabled={!isEligible || isSubmitting}>
                {isSubmitting ? 'Đang gửi...' : 'Gửi đăng ký'}
            </Button>
        </Box>
    );
};

export default HealthScreeningForm;
