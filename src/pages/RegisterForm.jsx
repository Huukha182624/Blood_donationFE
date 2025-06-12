import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    Grid,
    Radio,
    RadioGroup,
    TextField,
    Typography,
} from "@mui/material";
import React from "react";

const MedicalForm = () => {
    return (
        <Box sx={{ maxWidth: 600, mx: "auto", p: 2 }}>
            <Typography variant="h4" gutterBottom fontWeight="bold">
                Đăng ký hiến máu
            </Typography>

            <Grid container spacing={2} direction="column">
                <Grid item>
                    <TextField fullWidth required label="Họ và tên" />
                </Grid>

                <Grid item>
                    <TextField fullWidth required label="Ngày sinh" type="date" InputLabelProps={{ shrink: true }} />
                </Grid>

                <Grid item>
                    <TextField fullWidth required label="Số CMND/CCCD" />
                </Grid>

                <Grid item>
                    <TextField fullWidth required label="Địa chỉ" />
                </Grid>

                <Grid item>
                    <TextField fullWidth required label="Email" />
                </Grid>

                <Grid item>
                    <TextField fullWidth required label="Số điện thoại" />
                </Grid>

                <Grid item>
                    <TextField fullWidth required label="Ngày muốn hiến máu" type="date" InputLabelProps={{ shrink: true }} />
                </Grid>

                <Grid item>
                    <TextField fullWidth required label="Địa điểm muốn hiến máu" />
                </Grid>

                {/* Câu hỏi sàng lọc y tế */}
                <Grid item>
                    <Typography variant="h6" fontWeight="bold">Câu hỏi sàng lọc y tế</Typography>
                </Grid>

                {[
                    "Gần đây bạn có bị sốt, ho, hoặc nhiễm trùng không?",
                    "Bạn có đang điều trị bệnh lý mãn tính không?",
                    "Trong 6 tháng qua, bạn có thực hiện phẫu thuật hoặc thủ thuật y tế không?",
                    "Bạn có đang sử dụng thuốc điều trị dài hạn không?",
                    "Bạn có bị dị ứng hoặc phản ứng với thuốc, thực phẩm hay môi trường không?",
                    "Bạn có đang mang thai hoặc đang cho con bú không?",
                    "Bạn có xăm hình hoặc xỏ khuyên trong 6 tháng qua không?",
                    "Bạn có tiếp xúc với người mắc bệnh truyền nhiễm không?",
                    "Bạn đã từng hiến máu trong vòng 3 tháng qua không?"
                ].map((question, index) => (
                    <Grid item key={index}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">{question}</FormLabel>
                            <RadioGroup row>
                                <FormControlLabel value="yes" control={<Radio />} label="Có" />
                                <FormControlLabel value="no" control={<Radio />} label="Không" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                ))}

                <Grid item>
                    <Button variant="contained" color="primary" fullWidth>
                        Gửi đăng ký
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );
};

export default MedicalForm;
