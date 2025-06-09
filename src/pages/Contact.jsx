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
        <Box sx={{ px: { xs: 1, md: 4 }, py: 6, bgcolor: "#f8fbfd" }}>
            <Grid
                container
                spacing={4}
                alignItems="stretch"
                sx={{ height: "100%" }} // giúp grid item căn đều theo chiều cao
            >
                {/* CỘT TRÁI */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ height: "100%", display: "flex" }}>
                        <Paper
                            sx={{
                                bgcolor: "#347bd2",
                                color: "#fff",
                                borderRadius: 4,
                                p: 4,
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                            }}
                            elevation={3}
                        >
                            <Typography variant="h4" gutterBottom fontWeight="bold">
                                Liên hệ
                            </Typography>

                            <Box sx={{ display: "flex", alignItems: "center", mt: 3 }}>
                                <EmailIcon sx={{ mr: 1, fontSize: 30 }} />
                                <Typography variant="h6">Email</Typography>
                            </Box>
                            <Typography sx={{ ml: 5, mt: 1 }}>gmv@intelin.vn</Typography>

                            <Divider sx={{ my: 3, borderColor: "#ffffff66" }} />

                            <Box sx={{ display: "flex", alignItems: "center" }}>
                                <PhoneIcon sx={{ mr: 1, fontSize: 30 }} />
                                <Typography variant="h6">Hotline</Typography>
                            </Box>

                            <Box sx={{ ml: 5, mt: 1 }}>
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
                    </Box>
                </Grid>

                {/* CỘT PHẢI */}
                <Grid item xs={12} md={6}>
                    <Box sx={{ height: "100%", display: "flex" }}>
                        <Paper
                            sx={{
                                bgcolor: "#fff",
                                borderRadius: 4,
                                p: 4,
                                display: "flex",
                                flexDirection: "column",
                                flex: 1,
                            }}
                            elevation={3}
                        >
                            <Typography
                                variant="h5"
                                color="primary"
                                fontWeight="bold"
                                gutterBottom
                            >
                                Gửi lời nhắn cho chúng tôi
                            </Typography>
                            <Typography sx={{ mb: 3 }}>
                                Nếu bạn có bất kỳ thắc mắc nào liên quan đến các hoạt động hiến máu tình nguyện,
                                xin vui lòng liên hệ với chúng tôi qua địa chỉ email{" "}
                                <strong style={{ color: "#1a73e8" }}>gmv@intelin.vn</strong> hoặc gửi thông tin
                                cho chúng tôi theo mẫu bên dưới:
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
                                        label="Email"
                                        placeholder="Vui lòng nhập email"
                                        type="email"
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
                                    <Button variant="contained" fullWidth sx={{ bgcolor: "#a9d0ff", color: "#fff" }}>
                                        Gửi lời nhắn
                                    </Button>
                                </Grid>
                            </Grid>
                        </Paper>
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ContactPage;
