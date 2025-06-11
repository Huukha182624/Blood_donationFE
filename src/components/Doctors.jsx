
// src/components/Doctors.jsx
import { Box, Typography, Card, CardMedia, CardContent } from "@mui/material";

const doctors = [
    {
        name: "BS. Nguyễn Văn A",
        image: "/doctor1.jpg",
        specialty: "Tim mạch",
        experience: "15 năm",
        workingHours: "Thứ 2 - Thứ 6, 8:00 - 17:00",
        contact: "nguyenvana@hospital.vn"
    },
    {
        name: "BS. Trần Thị B",
        image: "/doctor2.jpg",
        specialty: "Nhi khoa",
        experience: "10 năm",
        workingHours: "Thứ 2 - Thứ 7, 9:00 - 18:00",
        contact: "tranthib@hospital.vn"
    },
    {
        name: "BS. Lê Văn C",
        image: "/doctor3.jpg",
        specialty: "Da liễu",
        experience: "8 năm",
        workingHours: "Thứ 3 - Chủ nhật, 7:30 - 16:30",
        contact: "levanc@hospital.vn"
    },
    {
        name: "BS. Phạm Thị D",
        image: "/doctor4.jpg",
        specialty: "Nội tiết",
        experience: "12 năm",
        workingHours: "Thứ 2 - Thứ 6, 8:30 - 17:30",
        contact: "phamthid@hospital.vn"
    },
    {
        name: "BS. Trương Văn E",
        image: "/doctor5.jpg",
        specialty: "Nội tiết",
        experience: "12 năm",
        workingHours: "Thứ 2 - Thứ 6, 8:30 - 17:30",
        contact: "phamthid@hospital.vn"
    },
    {
        name: "BS. Lý Văn F",
        image: "/doctor6.jpg",
        specialty: "Nội tiết",
        experience: "12 năm",
        workingHours: "Thứ 2 - Thứ 6, 8:30 - 17:30",
        contact: "phamthid@hospital.vn"
    },
];

const DoctorCard = ({ doctor }) => (
    <Card sx={{ width: 300, flexShrink: 0, m: 2, borderRadius: 7, boxShadow: 20 }}>
        <CardMedia
            component="img"
            height="220"
            image={doctor.image}
            alt={`Bác sĩ ${doctor.name}`}
            sx={{ objectFit: "contain", p: 2, borderRadius: 5 }}
        />
        <CardContent>
            <Typography variant="h6" color="primary" fontWeight="bold">
                {doctor.name}
            </Typography>
            <Typography fontSize={14}>Chuyên khoa: <strong>{doctor.specialty}</strong></Typography>
            <Typography fontSize={14}>Kinh nghiệm: {doctor.experience}</Typography>
            <Typography fontSize={14}>Giờ làm việc: {doctor.workingHours}</Typography>
            <Typography fontSize={14}>Liên hệ: {doctor.contact}</Typography>
        </CardContent>
    </Card>
);


export default function Doctors() {
    return (
        <Box sx={{ mt: 5 }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom textAlign="center">
                Đội ngũ bác sĩ chuyên môn
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    overflowX: "auto",
                    py: 2,
                    px: 1,
                    scrollbarWidth: "auto",
                    "&::-webkit-scrollbar": {
                        height: "16px"
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
                {doctors.map((doctor, idx) => (
                    <DoctorCard key={idx} doctor={doctor} />
                ))}
            </Box>
        </Box>
    );
}