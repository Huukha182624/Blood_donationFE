import { Typography, Box, List, ListItem, ListItemText, Paper } from '@mui/material';

export default function Sidebar() {
    const articles = [
        "Samsung Electronics Việt Nam: Mỗi giọt máu được hiến tặng đều mang trong mình một câu chuyện, một hy vọng",
        "PCCC và CNCH là hoạt động phải làm thường xuyên và liên tục...",
        "Ý nghĩa chương trình hiến máu tại Trường Đại học Y Hà Nội"
    ];

    return (
        <Box sx={{ flex: 1 }}>
            <Paper elevation={3} sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom color="error">
                    ĐỌC NHIỀU NHẤT
                </Typography>
                <List dense>
                    {articles.map((text, index) => (
                        <ListItem key={index}>
                            <ListItemText primary={text} />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </Box>
    );
}
