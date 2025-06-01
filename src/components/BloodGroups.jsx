// src/components/BloodGroups.jsx
import { Box, Typography, Card, CardMedia, CardContent, Chip, Stack, Grid } from "@mui/material";

const bloodGroups = [
    {
        type: "O-",
        image: "/O-.jpg",
        percentage: "6.6%",
        canDonateTo: ["Tất cả nhóm máu"],
        canReceiveFrom: ["O-"]
    },
    {
        type: "O+",
        image: "/O+.jpg",
        percentage: "37.5%",
        canDonateTo: ["O+", "A+", "B+", "AB+"],
        canReceiveFrom: ["O-", "O+"]
    },
    {
        type: "A-",
        image: "/A-.jpg",
        percentage: "6.3%",
        canDonateTo: ["A-", "A+", "AB-", "AB+"],
        canReceiveFrom: ["O-", "A-"]
    },
    {
        type: "A+",
        image: "/A+.jpg",
        percentage: "26.3%",
        canDonateTo: ["A+", "AB+"],
        canReceiveFrom: ["O-", "O+", "A-", "A+"]
    },
    {
        type: "B-",
        image: "/B-.jpg",
        percentage: "1.5%",
        canDonateTo: ["B-", "B+", "AB-", "AB+"],
        canReceiveFrom: ["O-", "B-"]
    },
    {
        type: "B+",
        image: "/B+.jpg",
        percentage: "9.4%",
        canDonateTo: ["B+", "AB+"],
        canReceiveFrom: ["O-", "O+", "B-", "B+"]
    },
    {
        type: "AB-",
        image: "/AB-.jpg",
        percentage: "0.6%",
        canDonateTo: ["AB-", "AB+"],
        canReceiveFrom: ["O-", "A-", "B-", "AB-"]
    },
    {
        type: "AB+",
        image: "/AB+.jpg",
        percentage: "2.5%",
        canDonateTo: ["AB+"],
        canReceiveFrom: ["Tất cả nhóm máu"]
    }
];
const BloodGroupCard = ({ group }) => (
    <Card sx={{ width: 280, flexShrink: 0, m: 2, borderRadius: 7, boxShadow: 20 }}>
        <CardMedia
            component="img"
            height="160"
            image={group.image} // Sửa tại đây
            alt={`Nhóm máu ${group.type}`}
            sx={{ objectFit: "contain", p: 2 }}
        />
        <CardContent>
            <Typography variant="h6" color="error" fontWeight="bold">
                Nhóm máu {group.type}
            </Typography>
            <Typography fontSize={14}>
                Tỉ lệ dân số: <strong>{group.percentage}</strong>
            </Typography>

            <Typography mt={2} fontWeight="bold" fontSize={14}>
                Có thể cho:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" mt={0.5}>
                {group.canDonateTo.map((to, idx) => (
                    <Chip key={idx} label={to} color="primary" size="small" />
                ))}
            </Stack>

            <Typography mt={2} fontWeight="bold" fontSize={14}>
                Có thể nhận:
            </Typography>
            <Stack direction="row" spacing={1} flexWrap="wrap" mt={0.5}>
                {group.canReceiveFrom.map((from, idx) => (
                    <Chip key={idx} label={from} color="success" size="small" />
                ))}
            </Stack>
        </CardContent>
    </Card>
);

export default function BloodGroups() {
    return (
        <Box sx={{ mt: 5 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
                Thông tin chi tiết các nhóm máu
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    py: 2,
                    px: 1,
                    scrollbarWidth: "auto",
                    "&::-webkit-scrollbar": {
                        height: "20px",

                    },
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#888",
                        borderRadius: "10px",
                        border: "4px solid transparent",
                        backgroundClip: "content-box"
                    },
                    "&::-webkit-scrollbar-track": {
                        backgroundColor: "#eee"
                    }
                }}
            >


                {bloodGroups.map((group, idx) => (
                    <BloodGroupCard key={idx} group={group} />
                ))}
            </Box>
        </Box>
    );
}