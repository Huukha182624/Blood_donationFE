import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    Button,
    CircularProgress,
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Chip
} from "@mui/material";
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import NotesIcon from '@mui/icons-material/Notes';

// Import các hàm service vừa tạo
import { getMyRegistrations,cancelRegistration } from '../services/Campaign/registration.service';

// Component để hiển thị chip trạng thái với màu sắc tương ứng
const StatusChip = ({ status }) => {
    const statusConfig = {
        Pending: { label: 'Chờ xác nhận', color: 'warning' },
        Confirmed: { label: 'Đã xác nhận', color: 'info' },
        Completed: { label: 'Đã hoàn thành', color: 'success' },
        Cancelled: { label: 'Đã hủy', color: 'error' },
        // Thêm các trạng thái khác nếu có
    };

    const config = statusConfig[status] || { label: status, color: 'default' };

    return <Chip label={config.label} color={config.color} size="small" sx={{ fontWeight: 'bold' }} />;
};


// --- COMPONENT CHÍNH ---
const MyRegistrationsPage = () => {
    const [registrations, setRegistrations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);

    // State cho dialog xác nhận hủy
    const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
    const [selectedRegistrationId, setSelectedRegistrationId] = useState(null);

    const fetchRegistrations = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await getMyRegistrations();
            // Sắp xếp các lịch hẹn theo ngày đăng ký mới nhất
            setRegistrations(data.sort((a, b) => new Date(b.registeredAt) - new Date(a.registeredAt)));
        } catch (err) {
            console.error("Failed to fetch registrations:", err);
            setError(err.message || "Không thể tải lịch sử đăng ký.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchRegistrations();
    }, [fetchRegistrations]);

    const handleOpenCancelDialog = (id) => {
        setSelectedRegistrationId(id);
        setCancelDialogOpen(true);
    };

    const handleCloseCancelDialog = () => {
        setCancelDialogOpen(false);
        setSelectedRegistrationId(null);
    };

    const handleConfirmCancel = async () => {
        if (!selectedRegistrationId) return;

        try {
            await cancelRegistration(selectedRegistrationId);
            setSuccess("Hủy lịch hẹn thành công!");
            handleCloseCancelDialog();
            fetchRegistrations(); // Tải lại danh sách để cập nhật trạng thái
        } catch (err) {
            console.error("Failed to cancel registration:", err);
            setError(err.message || "Hủy lịch hẹn thất bại.");
            handleCloseCancelDialog();
        }
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 900, mx: "auto", p: { xs: 2, md: 3 } }}>
            <Typography variant="h4" gutterBottom fontWeight="bold" color="primary.main">
                Lịch sử Đăng ký Hiến máu
            </Typography>

            {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
            {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

            {registrations.length === 0 && !loading ? (
                <Paper elevation={2} sx={{ p: 3, textAlign: 'center' }}>
                    <Typography>Bạn chưa có lịch hẹn nào. Hãy tham gia hiến máu nhé!</Typography>
                </Paper>
            ) : (
                <Grid container spacing={3}>
                    {registrations.map((reg) => (
                        <Grid item xs={12} key={reg.id}>
                            <Paper elevation={2} sx={{ p: 2, borderLeft: '5px solid', borderColor: reg.status === 'Cancelled' ? 'error.main' : 'primary.main' }}>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item xs={12} md={8}>
                                        <Typography variant="h6" fontWeight="bold">{reg.campaign.campaignName}</Typography>
                                        <Box display="flex" alignItems="center" mt={1} color="text.secondary">
                                            <EventIcon fontSize="small" sx={{ mr: 1 }} />
                                            <Typography variant="body2">Ngày diễn ra: {new Date(reg.campaign.campaignDate).toLocaleDateString('vi-VN')}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" mt={0.5} color="text.secondary">
                                            <LocationOnIcon fontSize="small" sx={{ mr: 1 }} />
                                            <Typography variant="body2">{reg.campaign.address}</Typography>
                                        </Box>
                                        <Box display="flex" alignItems="center" mt={0.5} color="text.secondary">
                                            <BloodtypeIcon fontSize="small" sx={{ mr: 1 }} />
                                            <Typography variant="body2">Loại máu đăng ký: {reg.productType}</Typography>
                                        </Box>
                                        {reg.note && (
                                            <Box display="flex" alignItems="flex-start" mt={0.5} color="text.secondary">
                                                <NotesIcon fontSize="small" sx={{ mr: 1, mt: 0.5 }} />
                                                <Typography variant="body2">Ghi chú: {reg.note}</Typography>
                                            </Box>
                                        )}
                                    </Grid>
                                    <Grid item xs={12} md={4} textAlign={{ xs: 'left', md: 'right' }}>
                                        <Box mb={1}>
                                            <StatusChip status={reg.status} />
                                        </Box>
                                        <Typography variant="caption" color="text.secondary">
                                            Đăng ký ngày: {new Date(reg.registeredAt).toLocaleString('vi-VN')}
                                        </Typography>
                                        {/* Chỉ cho phép hủy khi trạng thái là Confirmed hoặc Pending */}
                                        {(reg.status === 'Confirmed' || reg.status === 'Pending') && (
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                sx={{ mt: 1, width: '100%' }}
                                                onClick={() => handleOpenCancelDialog(reg.id)}
                                            >
                                                Hủy đăng ký
                                            </Button>
                                        )}
                                    </Grid>
                                </Grid>
                            </Paper>
                        </Grid>
                    ))}
                </Grid>
            )}

            {/* Dialog xác nhận hủy */}
            <Dialog
                open={cancelDialogOpen}
                onClose={handleCloseCancelDialog}
            >
                <DialogTitle fontWeight="bold">Xác nhận Hủy Lịch hẹn</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn hủy lịch hẹn hiến máu cho sự kiện này không?
                        Hành động này không thể hoàn tác.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCancelDialog}>Không</Button>
                    <Button onClick={handleConfirmCancel} color="error" variant="contained">
                        Xác nhận Hủy
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default MyRegistrationsPage;
