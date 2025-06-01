import { Box, Container, Typography } from "@mui/material";

import BloodGroups from "./BloodGroups";

import Notes from "./Notes"
export default function MainContent() {
    return (
        <>
            <Container sx={{ mt: 4 }}>
                <Typography variant="h4" fontWeight="bold" gutterBottom>
                    Nhóm máu và nhóm máu hiếm
                </Typography>

                <Typography variant="body2" color="textSecondary">
                    Ngày đăng: 21-05-2025
                </Typography>

                <Typography variant="body1" sx={{ mt: 2 }}>
                    Bài viết dưới đây sẽ cung cấp cho bạn những thông tin thú vị về các nhóm máu,
                    sẽ giúp bạn giải đáp thắc mắc Nhóm máu nào là nhóm máu hiếm ở Việt Nam.
                </Typography>

                <Box
                    component="img"
                    src="/blood-type.jpg"
                    alt="Blood Types"
                    sx={{ mt: 3, maxWidth: "100%", borderRadius: 2 }}
                />

                {/* Nội dung thông tin nhóm máu */}
                <Box sx={{ mt: 5 }}>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                        1. Có bao nhiêu hệ nhóm máu?
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Năm 1901, nhà bác học vĩ đại Karl Landsteiner đã phát hiện ra hệ nhóm máu ABO, mở ra kỷ nguyên mới trong thực hành truyền máu. Những năm sau đó, nhiều hệ nhóm máu hồng cầu khác đã được phát hiện như hệ nhóm máu Rh, Kell, Kidd, Duffy, Lewis, MNS…
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Năm 2019, Hội Truyền máu quốc tế công nhận có tới 39 hệ nhóm máu hồng cầu với 367 kháng nguyên nhóm máu khác nhau; trong đó, hai hệ nhóm máu ABO và Rh là quan trọng nhất trong hoạt động truyền máu.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Mỗi hệ nhóm máu lại có các nhóm máu khác nhau do sự có mặt hay vắng mặt của kháng nguyên mang đặc tính di truyền trên bề mặt hồng cầu và kháng thể trong huyết thanh của người đó. Hệ nhóm máu Rh có hệ kháng nguyên đa dạng và phức tạp nhất với hơn 50 kháng nguyên, trong đó kháng nguyên D là phổ biến nhất.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Ví dụ:
                        <br />Hệ ABO có 4 nhóm máu: A, B, AB và O
                        <br />Hệ Rh có 2 nhóm máu thường gặp là Rh(D) dương và Rh(D) âm, hay còn gọi là Rh(D)+ và Rh(D)-
                        <br />Chỉ tính riêng 2 hệ nhóm máu ABO và hệ Rh, đã có 8 nhóm máu phổ biến như: A+; A-; B+; B-; AB+; AB-; O+; O-
                        (A+ nghĩa là người đó vừa có nhóm máu A thuộc hệ ABO vừa có nhóm máu Rh(D)+ thuộc hệ Rh).
                    </Typography>

                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
                        2. Phân bố các nhóm máu tại Việt Nam?
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Hệ nhóm máu ABO gồm 4 nhóm máu là A, B, O và AB với tỷ lệ phân bố trong cộng đồng khác nhau ở từng chủng tộc.
                        Ở Việt Nam, tỷ lệ này là: nhóm O khoảng 45%, nhóm B khoảng 30%, nhóm A khoảng 20% và nhóm AB khoảng 5%.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Hệ Rh có 2 nhóm máu thường gặp là Rh(D) dương và Rh(D) âm. Ở Việt Nam, những người có nhóm máu Rh(D) âm (bao gồm nhóm O-, A-, B-, AB-)
                        ước tính chiếm khoảng 0,1% dân số (trong 1.000 người mới có 1 người), nên được coi là nhóm máu hiếm.
                    </Typography>

                    <Typography variant="h5" fontWeight="bold" gutterBottom sx={{ mt: 4 }}>
                        3. Nhóm máu nào là nhóm máu hiếm?
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Kháng nguyên nhóm máu có tỷ lệ rất khác nhau tùy thuộc vào chủng tộc, quốc gia và các vùng địa lý. Theo quy ước của Hội Truyền máu quốc tế,
                        nhóm máu có tỷ lệ dưới 0,1% trong quần thể được coi là hiếm và dưới 0,01% được coi là rất hiếm.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Ở Việt Nam, những người có nhóm máu Rh(D) âm (bao gồm nhóm O-, A-, B-, AB-) ước tính chiếm khoảng 0,1% dân số,
                        nên được coi là nhóm máu hiếm.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Trong khi đó, ở Châu Âu, Châu Mỹ, Châu Úc… tỷ lệ nhóm máu Rh(D) âm trong cộng đồng cao hơn nhiều, chiếm khoảng 15% – 40% dân số.
                    </Typography>
                    <Typography variant="body1" paragraph>
                        Nhóm máu hiếm Rh(D) âm như các nhóm máu khác; người có nhóm máu hiếm có cuộc sống sinh hoạt, học tập, lao động như tất cả những người mang nhóm máu Rh(D) dương (trên 99% người Việt Nam).
                    </Typography>
                </Box>
            </Container>

            <BloodGroups />
            <Notes />

        </>
    );
}
