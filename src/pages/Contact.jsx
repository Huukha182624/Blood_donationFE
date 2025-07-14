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


const Contact = () => {
    return (
        <>
            <Box sx={{ height: 180 }} />
            <Box
                className="contact-container"
                sx={{
                    width: '100%',
                    maxWidth: '1300px',
                    margin: '0 auto',
                    padding: '32px 16px',
                }}
            >
                <Grid
                    container
                    spacing={3}
                    sx={{
                        display: 'flex',
                        alignItems: 'stretch', // giúp 2 cột cao bằng nhau
                        maxWidth: 1100,
                        margin: '0 auto',
                    }}
                >
                    {/* CỘT TRÁI - LIÊN HỆ */}
                    <Grid item xs={12} md={6}>
                        <Paper
                            elevation={3}
                            sx={{
                                padding: 3,
                                height: '100%',
                                borderRadius: 3,
                                backgroundColor: '#d32f2f',
                                color: 'white',
                                display: 'flex',
                                flexDirection: 'column',
                            }}
                        >
                            <Typography variant="h5" fontWeight="bold" gutterBottom>
                                Liên hệ
                            </Typography>

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <EmailIcon sx={{ mr: 1 }} />
                                <Typography variant="subtitle1" fontWeight="bold">Email</Typography>
                            </Box>
                            <Typography sx={{ ml: 4, mb: 2 }}>
                                gmv@intelin.vn
                            </Typography>

                            <Divider sx={{ my: 2, borderColor: 'rgba(255,255,255,0.5)' }} />

                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                                <PhoneIcon sx={{ mr: 1 }} />
                                <Typography variant="subtitle1" fontWeight="bold">Hotline</Typography>
                            </Box>

                            <Box sx={{ ml: 4 }}>
                                <Typography>TT Hiến Máu Nhân Đạo:</Typography>
                                <Typography>028 3868 5509</Typography>
                                <Typography>028 3868 5507</Typography>

                                <Typography sx={{ mt: 2 }}>Bệnh viện BTH:</Typography>
                                <Typography>028 3957 1342</Typography>
                                <Typography>028 3955 7858</Typography>

                                <Typography sx={{ mt: 2 }}>TT truyền máu Chợ Rẫy:</Typography>
                                <Typography>028 3955 5885</Typography>
                            </Box>
                        </Paper>
                    </Grid>

                    {/* CỘT PHẢI - GỬI LỜI NHẮN */}
                    <Grid item xs={12} md={6}>
                        <Paper
                            elevation={3}
                            sx={{
                                padding: 3,
                                borderRadius: 3,
                                height: '100%', // để bằng chiều cao bên trái
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    textAlign: 'center',
                                }}
                            >
                                <Typography variant="h6" sx={{ color: '#f44336', fontWeight: 'bold' }} gutterBottom>
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
                                    xin vui lòng liên hệ với chúng tôi qua địa chỉ email{' '}
                                    <strong style={{ color: "#f44336" }}>gmv@intelin.vn</strong> hoặc gửi thông tin
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
                                        sx={{ background: '#f44336', color: '#fff', fontWeight: 'bold', '&:hover': { background: '#d32f2f' } }}
                                    >
                                        Gửi lời nhắn
                                    </Button>
                                </Box>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default Contact;