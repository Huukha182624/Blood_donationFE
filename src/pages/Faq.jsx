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
    {
        question: '6. Hiến máu có hại cho sức khỏe không?',
        answer: 'Không. Hiến máu đúng cách và đúng tiêu chuẩn không ảnh hưởng đến sức khỏe, ngược lại còn kích thích cơ thể tạo máu mới.',
    },
    {
        question: '7. Sau khi hiến máu cần làm gì?',
        answer: '- Nghỉ ngơi ít nhất 10 phút tại khu vực hiến máu.\n- Uống nhiều nước và ăn nhẹ sau hiến.\n- Không làm việc nặng trong 1-2 ngày đầu.',
    },
    {
        question: '8. Bao lâu thì cơ thể hồi phục sau khi hiến máu?',
        answer: 'Cơ thể sẽ hồi phục lượng huyết tương trong vài giờ và số lượng hồng cầu trong vòng vài ngày đến vài tuần.',
    },
    {
        question: '9. Một lần hiến máu lấy bao nhiêu ml?',
        answer: 'Thông thường, một lần hiến máu toàn phần là 250ml, 350ml hoặc 450ml tùy cân nặng và thể trạng.',
    },
    {
        question: '10. Phụ nữ có thể hiến máu khi đang có kinh nguyệt không?',
        answer: 'Nếu sức khỏe ổn định, không mệt mỏi hay thiếu máu, phụ nữ vẫn có thể hiến máu khi đang có kinh.',
    },
    {
        question: '11. Có thể hiến máu khi đang uống thuốc không?',
        answer: 'Tùy loại thuốc. Một số thuốc có thể ảnh hưởng đến chất lượng máu, nên tham khảo bác sĩ trước khi hiến.',
    },
    {
        question: '12. Có thể hiến máu khi đang bị cảm lạnh không?',
        answer: 'Không nên. Cần đợi đến khi khỏi hẳn để tránh nguy cơ lây bệnh và bảo vệ người nhận máu.',
    },
    {
        question: '13. Hiến máu bao nhiêu lần một năm là hợp lý?',
        answer: 'Mỗi người có thể hiến máu tối đa 4 lần/năm, tức mỗi 3 tháng 1 lần.',
    },
    {
        question: '14. Người ăn chay có thể hiến máu không?',
        answer: 'Có. Miễn là họ đủ dinh dưỡng, sức khỏe tốt và đạt tiêu chuẩn cân nặng.',
    },
    {
        question: '15. Có được nhận giấy chứng nhận sau khi hiến máu không?',
        answer: 'Có. Người hiến máu sẽ nhận được giấy chứng nhận hiến máu tình nguyện.',
    },
    {
        question: '16. Giấy chứng nhận hiến máu có giá trị gì?',
        answer: 'Được miễn phí máu bằng tổng số lượng đã hiến nếu cần truyền máu tại bệnh viện nhà nước.',
    },
    {
        question: '17. Có thể hiến máu nhân dịp nào?',
        answer: 'Có thể hiến máu vào bất kỳ thời điểm nào trong năm. Ngoài ra, còn có các sự kiện như Ngày Toàn dân hiến máu (7/4), Lễ hội Xuân Hồng,...',
    }


];

const Faq = () => {
    return (
        <Container maxWidth="md" sx={{ my: 4 }}>
            <Typography variant="h4" align="center" gutterBottom fontWeight="bold"
                sx={{ color: 'rgb(120, 2, 14)', fontWeight: 'bold', fontSize: 38 }}>
                Lưu ý quan trọng
            </Typography>
            <Box>
                {faqs.map((faq, index) => (
                    <Accordion key={index}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography sx={{ fontWeight: 'bold', color: '#b71c1c', fontSize: 20 }}>{faq.question}</Typography>
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