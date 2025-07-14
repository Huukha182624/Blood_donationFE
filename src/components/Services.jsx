import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";

const services = [
    {
        icon: "/doctor.jpg",
        title: "Khám và tư vấn",
        items: [
            "Khám - kiểm tra sức khỏe định kỳ",
            "Khám theo yêu cầu",
            "Khám có thẻ bảo hiểm y tế",
            "Khám sức khỏe cho cơ quan, doanh nghiệp",
        ],
    },
    {
        icon: "/lab.jpg",
        title: "Xét nghiệm và thăm dò chức năng",
        items: [
            "Xét nghiệm máu cơ bản",
            "Xét nghiệm máu chuyên sâu",
            "Xét nghiệm theo yêu cầu",
            "Chẩn đoán hình ảnh, thăm dò chức năng",
        ],
    },
    {
        icon: "/treatment.jpg",
        title: "Điều trị",
        items: [
            "Bệnh máu lành tính",
            "Bệnh máu ác tính",
            "Bệnh máu di truyền, bẩm sinh",
            "Bệnh máu ở trẻ em",
        ],
    },
    {
        icon: "/bag.jpg",
        title: "Tiếp nhận máu và cung cấp máu",
        items: [
            "Tổ chức hiến máu",
            "Tiếp nhận máu và thành phần máu",
            "Sàng lọc, điều chế các chế phẩm máu",
            "Lưu trữ, cung cấp các chế phẩm máu",
        ],
    },
];

export default function OutstandingServices() {
    return (
        <Box sx={{ backgroundColor: "rgb(249, 244, 218)", py: 7, px: 5 }}>
            <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
                DỊCH VỤ NỔI BẬT
            </Typography>
            <Typography textAlign="center" sx={{ mb: 4 }}>
                Các dịch vụ thế mạnh và nổi bật của Hiến Máu Nhân Ái Việt
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "space-between",
                    gap: 2,
                }}
            >
                {services.map((service, index) => (
                    <Box
                        key={index}
                        sx={{
                            flex: "1 1 calc(25% - 16px)", // 4 cột chia đều
                            minWidth: "250px",
                            backgroundColor: "#fff",
                            px: 2,
                            textAlign: "center",
                        }}
                    >
                        <Box
                            component="img"
                            src={service.icon}
                            alt={service.title}
                            sx={{ height: 80, mb: 2 }}
                        />
                        <Typography fontWeight="bold" color="error" gutterBottom sx={{ minHeight: 60 }}>
                            {service.title}
                        </Typography>
                        <Box sx={{ borderTop: "2px solid #eee", mt: 1, pt: 1 }}>
                            <List dense>
                                {service.items.map((item, idx) => (
                                    <ListItem key={idx} sx={{ py: 0.5 }}>
                                        <ListItemIcon sx={{ minWidth: 30 }}>
                                            <CheckCircleIcon fontSize="small" color="action" />
                                        </ListItemIcon>
                                        <ListItemText
                                            primary={item}
                                            primaryTypographyProps={{ fontSize: 14 }}
                                        />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>
                    </Box>
                ))}
            </Box>
        </Box>
    );
}
