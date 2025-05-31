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

const ContactPage = () => {
    return (
        <Box sx={{ px: { xs: 2, md: 10 }, py: 6 }}>
            <Grid container spacing={4} alignItems="stretch">
                {/* BÊN TRÁI */}
                <Grid item xs={12} md={5}>
                    <Paper
                        sx={{
                            bgcolor: "#347bd2",
                            color: "#fff",
                            borderRadius: 4,
                            p: 4,
                            height: "100%",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                        }}
                        elevation={3}
                    >
                        <Typography variant="h4" gutterBottom>
                            Liên hệ
                        </Typography>

                        {/* Email */}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <EmailIcon sx={{ mr: 1 }} />
                            <Typography variant="h6">Email</Typography>
                        </Box>
                        <Typography sx={{ ml: 4, mb: 2 }}>gmv@intelin.vn</Typography>

                        <Divider sx={{ my: 2, borderColor: "#ffffff66" }} />

                        {/* Hotline */}
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                            <PhoneIcon sx={{ mr: 1 }} />
                            <Typography variant="h6">Hotline</Typography>
                        </Box>

                        <Box sx={{ ml: 4 }}>
                            <Typography>TT Hiến Máu Nhân Đạo:</Typography>
                            <Typography>028 3868 5509</Typography>
                            <Typography>028 3868 5507</Typography>

                            <Typography sx={{ mt: 2 }}>Bệnh viện BTH:</Typography>
                            <Typography>028 3957 1342</Typography>
                            <Typography>028 3955 5788</Typography>

                            <Typography sx={{ mt: 2 }}>TT truyền máu Chợ Rẫy:</Typography>
                            <Typography>028 3955 5885</Typography>
                        </Box>
                    </Paper>
                </Grid>

                {/* BÊN PHẢI */}
                <Grid item xs={12} md={7}>
                    <Typography variant="h5" color="primary" gutterBottom>
                        Gửi lời nhắn cho chúng tôi
                    </Typography>
                    <Typography sx={{ mb: 3 }}>
                        Nếu bạn có bất kỳ thắc mắc nào liên quan đến các hoạt động hiến máu
                        tình nguyện, xin vui lòng liên hệ với chúng tôi qua địa chỉ email{" "}
                        <strong>gmv@intelin.vn</strong> hoặc gửi thông tin cho chúng tôi
                        theo mẫu bên dưới:
                    </Typography>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Họ và tên"
                                placeholder="Vui lòng nhập họ và tên"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="email"
                                label="Email"
                                placeholder="Vui lòng nhập email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                label="Lời nhắn"
                                placeholder="Vui lòng nhập lời nhắn"
                                multiline
                                rows={4}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth>
                                Gửi lời nhắn
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ContactPage;
