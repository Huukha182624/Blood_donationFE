import React from 'react';
import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Container,
    Box,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const faqs = [
    {
        question: '1. Ai có thể tham gia hiến máu?',
        answer: `- Tất cả mọi người từ 18 – 60 tuổi, tình nguyện hiến máu để cứu chữa người bệnh.
- Cân nặng ít nhất là 45kg đối với phụ nữ, nam giới. 
- Không bị nhiễm hoặc có hành vi lây nhiễm HIV và các bệnh truyền máu khác.
- Thời gian giữa 2 lần hiến máu là 12 tuần đối với cả Nam và Nữ.
- Có giấy tờ tùy thân.`,
    },
    {
        question: '2. Ai là người không nên hiến máu',
        answer: `- Người đã nhiễm hoặc có nguy cơ nhiễm HIV, viêm gan B, viêm gan C,...
- Người có bệnh tim mạch, huyết áp, hô hấp, dạ dày,...`,
    },
    {
        question: '3. Máu của tôi sẽ được làm những xét nghiệm gì?',
        answer: 'Máu sẽ được xét nghiệm HIV, viêm gan B, C, giang mai, nhóm máu ABO,...',
    },
    {
        question: '4. Máu gồm những thành phần và chức năng gì?',
        answer: 'Máu gồm hồng cầu, bạch cầu, tiểu cầu và huyết tương. Chúng có chức năng vận chuyển oxy, bảo vệ cơ thể và đông máu.',
    },
    {
        question: '5. Tại sao lại có nhiều người cần phải được truyền máu?',
        answer: 'Vì những người bị tai nạn, phẫu thuật, ung thư, thiếu máu,… cần máu để duy trì sự sống.',
    },
];

const Faq = () => {
    return (
        <Container maxWidth="md" sx={{ my: 4 }}>
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
                Lưu ý quan trọng
            </Typography>
            <Box>
                {faqs.map((faq, index) => (
                    <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontWeight: 'bold' }}>{faq.question}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography whiteSpace="pre-line">{faq.answer}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </Container>
    );
};

export default Faq;
