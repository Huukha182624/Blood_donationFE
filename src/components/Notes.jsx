import {
    Box,
    Typography,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Button
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useNavigate } from 'react-router-dom';

export default function ImportantNotes() {
    const navigate = useNavigate();

    return (
        <Box sx={{ mt: 10, mb: 6, textAlign: 'center' }}>
            <Typography
                variant="h4"
                fontWeight="bold"
                gutterBottom
                sx={{ color: 'rgb(120, 2, 14)', fontSize: { xs: '28px', md: '36px' } }}
            >
                Lưu ý quan trọng cần biết
            </Typography>

            <Box sx={{ maxWidth: 800, mx: 'auto', textAlign: 'left' }}>
                {[
                    {
                        title: 'Ai có thể tham gia hiến máu?',
                        details: [
                            'Tất cả mọi người từ 18 – 60 tuổi, tình nguyện hiến máu để cứu chữa người bệnh.',
                            'Cân nặng ít nhất 45kg đối với cả nam và nữ.',
                            'Không bị nhiễm hoặc có hành vi lây nhiễm HIV và các bệnh truyền máu khác.',
                            'Thời gian giữa 2 lần hiến máu là 12 tuần đối với cả nam và nữ.',
                            'Có giấy tờ tùy thân.'
                        ]
                    },
                    {
                        title: 'Ai là người không nên hiến máu?',
                        details: [
                            'Người đã nhiễm hoặc có nguy cơ nhiễm HIV, viêm gan B, viêm gan C,...',
                            'Người có bệnh tim mạch, huyết áp, hô hấp, dạ dày,...'
                        ]
                    },
                    {
                        title: 'Máu của tôi sẽ được làm những xét nghiệm gì?',
                        details: [
                            'Máu sẽ được xét nghiệm HIV, viêm gan B, viêm gan C, giang mai, nhóm máu ABO,...'
                        ]
                    }
                ].map((item, index) => (
                    <Accordion
                        key={index}
                        sx={{
                            mb: 2,
                            border: '1px solid #cfd8dc',
                            borderRadius: 2,
                            boxShadow: 'none',
                            '&:before': { display: 'none' }
                        }}
                    >
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontWeight: 'bold', fontSize: '18px', color: '#b71c1c' }}>
                                {item.title}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            {item.details.map((text, idx) => (
                                <Typography key={idx} sx={{ mb: 1 }}>
                                    - {text}
                                </Typography>
                            ))}
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>

            <Button
                sx={{ mt: 2, color: '#b71c1c', fontWeight: 'bold', textTransform: 'none' }}
                variant="text"
                onClick={() => navigate("/hoi-dap")}
            >
                Xem thêm &raquo;
            </Button>
        </Box>
    );
}
