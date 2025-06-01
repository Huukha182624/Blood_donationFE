// src/components/Services.jsx
import { Grid, Box, Typography, Paper } from "@mui/material";
import { Favorite, LocalHospital, VolunteerActivism, Bloodtype } from "@mui/icons-material";

const services = [
    { icon: <Favorite color="error" />, title: "Hiến máu tình nguyện" },
    { icon: <LocalHospital color="primary" />, title: "Tiếp nhận & truyền máu" },
    { icon: <VolunteerActivism color="success" />, title: "Tư vấn sức khỏe" },
    { icon: <Bloodtype color="secondary" />, title: "Ngân hàng máu sống" }
];

export default function Services() {
    return (
        <Box sx={{ mt: 6 }}>
            <Typography variant="h5" fontWeight="bold" textAlign="center" gutterBottom>
                Dịch vụ nổi bật
            </Typography>

            <Grid container spacing={3} justifyContent="center">
                {services.map((service, idx) => (
                    <Grid item xs={12} sm={6} md={3} key={idx}>
                        <Paper elevation={3} sx={{ p: 3, textAlign: "center", borderRadius: 3 }}>
                            <Box sx={{ fontSize: 40, mb: 1 }}>{service.icon}</Box>
                            <Typography variant="subtitle1" fontWeight="medium">
                                {service.title}
                            </Typography>
                        </Paper>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}
