import { Box, Typography, TextField, InputAdornment, IconButton } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

export default function HeaderTopBar() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: '#f5f5f5',
                px: 2,
                py: 1,
            }}
        >
            {/* Địa chỉ */}
            <Typography variant="body2" color="textSecondary">
                Địa chỉ: Vinhomes Grand Park, Long Bình, Thủ Đức, Hồ Chí Minh
            </Typography>

            {/* Thanh tìm kiếm */}
            <TextField
                size="small"
                variant="outlined"
                placeholder="Tìm kiếm..."
                sx={{ width: 350 }}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton edge="end">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        </Box>
    );
}
