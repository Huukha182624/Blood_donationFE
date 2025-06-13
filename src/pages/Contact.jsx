import {
    Box,
    Grid,
    Typography,
    TextField,
    Button,
    Paper,
    Divider,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import './Contact.css';

const Contact = () => {
    return (
        <Box
            className="contact-container"
            sx={{
                width: '100%',
                maxWidth: '1200px',
                margin: '0 auto',
                padding: '32px 16px',
            }}
        >
            <Grid container spacing={4}>
                {/* CỘT TRÁI - LIÊN HỆ */}
                <Grid item xs={12} md={4}>
                    <Paper
                        elevation={3}
                        sx={{
                            background: '#3973d6',
                            color: '#fff',
                            borderRadius: '48px 48px 48px 48px',
                            height: '100%',
                            padding: { xs: 3, md: 5 },
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                        }}
                    >
                        <Typography variant="h4" fontWeight="bold" gutterBottom sx={{ color: '#fff', textAlign: 'left', width: '100%' }}>
                            Liên hệ
                        </Typography>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <EmailIcon sx={{ mr: 1, color: '#fff', fontSize: 36 }} />
                            <Typography variant="h6" sx={{ color: '#fff' }}>Email</Typography>
                        </Box>
                        <Typography sx={{ ml: 7, mb: 2, color: '#fff' }}>gmv@intelin.vn</Typography>

                        <Divider sx={{ my: 2, background: 'rgba(255,255,255,0.3)' }} />

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <PhoneIcon sx={{ mr: 1, color: '#fff', fontSize: 36 }} />
                            <Typography variant="h6" sx={{ color: '#fff' }}>Hotline</Typography>
                        </Box>

                        <Box sx={{ ml: 7 }}>
                            <Typography sx={{ color: '#fff', fontWeight: 400 }}>TT Hiến Máu Nhân Đạo:</Typography>
                            <Typography sx={{ color: '#fff', fontWeight: 700 }}>028 3868 5509</Typography>
                            <Typography sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>028 3868 5507</Typography>

                            <Typography sx={{ color: '#fff', fontWeight: 400 }}>Bệnh viện BTH:</Typography>
                            <Typography sx={{ color: '#fff', fontWeight: 700 }}>028 3957 1342</Typography>
                            <Typography sx={{ color: '#fff', fontWeight: 700, mb: 2 }}>028 3955 7858</Typography>

                            <Typography sx={{ color: '#fff', fontWeight: 400 }}>TT truyền máu Chợ Rẫy:</Typography>
                            <Typography sx={{ color: '#fff', fontWeight: 700 }}>028 3955 5885</Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* CỘT PHẢI - GỬI LỜI NHẮN */}
                <Grid item xs={12} md={8}>
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'flex-start',
                            textAlign: 'left',
                            height: '100%',
                            justifyContent: 'center',
                        }}
                    >
                        <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
                            Gửi lời nhắn cho chúng tôi
                        </Typography>

                        <Typography
                            sx={{
                                mb: 3,
                                maxWidth: '600px',
                                lineHeight: 1.6,
                            }}
                        >
                            Nếu bạn có bất kỳ thắc mắc nào liên quan đến các hoạt động hiến máu tình nguyện,
                            xin vui lòng liên hệ với chúng tôi qua địa chỉ email{" "}
                            <strong style={{ color: "#1a73e8" }}>gmv@intelin.vn</strong> hoặc gửi thông tin
                            cho chúng tôi theo mẫu bên dưới:
                        </Typography>

                        {/* FORM */}
                        <Box
                            component="form"
                            noValidate
                            autoComplete="off"
                            sx={{
                                width: '100%',
                                maxWidth: '600px',
                                display: 'flex',
                                flexDirection: 'column',
                                gap: 2,
                            }}
                        >
                            <TextField
                                fullWidth
                                label="Họ và tên"
                                placeholder="Vui lòng nhập họ và tên"
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                placeholder="Vui lòng nhập email"
                                type="email"
                            />
                            <TextField
                                fullWidth
                                label="Lời nhắn"
                                placeholder="Vui lòng nhập lời nhắn"
                                multiline
                                rows={4}
                            />
                            <Button
                                variant="contained"
                                fullWidth
                                type="submit"
                                className="contact-submit-button"
                            >
                                Gửi lời nhắn
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Contact;