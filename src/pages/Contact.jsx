import React, { useState, useEffect, useCallback } from 'react';
import {
    Box,
    Typography,
    Paper,
    Grid,
    TextField,
    Button,
    CircularProgress,
    Alert,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Tabs,       // <-- Thêm
    Tab,        // <-- Thêm
    AppBar,     // <-- Thêm
    Chip,
    Divider
} from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import HistoryIcon from '@mui/icons-material/History';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import CancelIcon from '@mui/icons-material/Cancel';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import ScienceIcon from '@mui/icons-material/Science';
import EventNoteIcon from '@mui/icons-material/EventNote';
import { useNavigate } from 'react-router-dom';

// Import các hàm service
import { createBloodRequest, getMyBloodRequests, cancelBloodRequest } from '../services/BloodUnit/bloodRequest.service';
import { getHospitals } from '../services/BloodUnit/bloodUnitService';

// --- COMPONENT HELPER CHO TAB PANEL ---
function TabPanel(props) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: { xs: 2, md: 3 } }}>{children}</Box>
            )}
        </div>
    );
}

// --- COMPONENT CHIP TRẠNG THÁI (Lịch sử) ---
const RequestStatusChip = ({ status }) => {
    const statusConfig = {
        Pending: { label: 'Chờ xử lý', color: 'warning' },
        Verified: { label: 'Đã xác thực', color: 'info' },
        Approved: { label: 'Đã duyệt', color: 'secondary' },
        Fulfilled: { label: 'Đã hoàn thành', color: 'success' },
        Rejected: { label: 'Bị từ chối', color: 'error' },
        PendingAppeal: { label: 'Chờ kêu gọi', color: 'primary' },
        Cancelled: { label: 'Đã hủy', color: 'default' },
    };
    const config = statusConfig[status] || { label: status, color: 'default' };
    return <Chip label={config.label} color={config.color} sx={{ fontWeight: 'bold' }} />;
};

// --- COMPONENT CHÍNH VỚI GIAO DIỆN TAB ---
const BloodRequestManagementPage = () => {
    const [tabValue, setTabValue] = useState(0);

    // --- State cho Tab 1: Tạo Yêu Cầu ---
    const [hospitals, setHospitals] = useState([]);
    const [formData, setFormData] = useState({
        patientName: '', bloodType: 'A_POS', productType: 'WholeBlood',
        quantity: '', reason: '', hospitalId: ''
    });
    const [formLoading, setFormLoading] = useState(false);
    const [formError, setFormError] = useState(null);

    // --- State cho Tab 2: Lịch Sử Yêu Cầu ---
    const [requests, setRequests] = useState([]);
    const [listLoading, setListLoading] = useState(true);
    const [listError, setListError] = useState(null);
    const cancellableStatuses = ['Pending', 'Verified', 'PendingAppeal'];

    // --- API Calls & Logic ---
    const fetchHospitals = useCallback(async () => {
        try {
            const data = await getHospitals();
            setHospitals(data);
        } catch (err) {
            console.error("Lỗi tải danh sách bệnh viện:", err);
            setFormError("Không thể tải danh sách bệnh viện.");
        }
    }, []);

    const fetchMyRequests = useCallback(async () => {
        setListLoading(true);
        try {
            const data = await getMyBloodRequests();
            setRequests(data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
        } catch (err) {
            console.error("Lỗi tải lịch sử yêu cầu:", err);
            setListError("Không thể tải lịch sử yêu cầu.");
        } finally {
            setListLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchHospitals();
        fetchMyRequests();
    }, [fetchHospitals, fetchMyRequests]);

    const handleTabChange = (event, newValue) => {
        setTabValue(newValue);
    };

    const handleFormChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({ ...prevState, [name]: value }));
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        if (!formData.hospitalId) {
            setFormError("Vui lòng chọn một bệnh viện.");
            return;
        }
        setFormLoading(true);
        setFormError(null);
        try {
            const submissionData = {
                ...formData,
                quantity: parseInt(formData.quantity, 10),
                hospitalId: parseInt(formData.hospitalId, 10)
            };
            await createBloodRequest(submissionData);
            alert('Tạo yêu cầu thành công!');
            // Reset form và chuyển sang tab lịch sử
            setFormData({ patientName: '', bloodType: 'A_POS', productType: 'WholeBlood', quantity: '', reason: '', hospitalId: '' });
            setTabValue(1);
            await fetchMyRequests(); // Tải lại danh sách
        } catch (err) {
            console.error("Lỗi tạo yêu cầu:", err);
            setFormError(err.response?.data?.message || "Không thể tạo yêu cầu.");
        } finally {
            setFormLoading(false);
        }
    };

    const handleCancelRequest = async (requestId) => {
        if (!window.confirm("Bạn có chắc chắn muốn hủy yêu cầu này không?")) return;
        try {
            await cancelBloodRequest(requestId);
            alert("Đã hủy yêu cầu thành công!");
            await fetchMyRequests(); // Tải lại danh sách
        } catch (err) {
            console.error("Lỗi hủy yêu cầu:", err);
            setListError(err.response?.data?.message || "Hủy yêu cầu thất bại.");
        }
    };

    return (
        <Box sx={{ maxWidth: 900, mx: 'auto', mt: 4 }}>
            <Paper elevation={3} sx={{ overflow: 'hidden', borderRadius: 3 }}>
                <AppBar position="static" color="default" elevation={1}>
                    <Tabs
                        value={tabValue}
                        onChange={handleTabChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="fullWidth"
                        aria-label="request-management-tabs"
                    >
                        <Tab icon={<AddCircleOutlineIcon />} iconPosition="start" label="Tạo Yêu Cầu" />
                        <Tab icon={<HistoryIcon />} iconPosition="start" label="Lịch sử Yêu cầu" />
                    </Tabs>
                </AppBar>

                {/* --- TAB 1: FORM TẠO YÊU CẦU --- */}
                <TabPanel value={tabValue} index={0}>
                    <Typography variant="h5" gutterBottom fontWeight="bold" color='rgb(114, 6, 17)'>
                        Liên hệ Máu khẩn cấp
                    </Typography>
                    <Box component="form" onSubmit={handleFormSubmit} noValidate>
                        <Grid container spacing={2} direction="column">
                            <Grid item xs={12}>
                                <TextField required fullWidth id="patientName" label="Tên Bệnh nhân" name="patientName" value={formData.patientName} onChange={handleFormChange} />
                            </Grid>
                            <Grid item xs={12}>
                                <FormControl fullWidth required>
                                    <InputLabel>Bệnh viện</InputLabel>
                                    <Select name="hospitalId" value={formData.hospitalId} label="Bệnh viện" onChange={handleFormChange} disabled={hospitals.length === 0}>
                                        {hospitals.map((h) => (<MenuItem key={h.id} value={h.id}>{h.name}</MenuItem>))}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required><InputLabel>Nhóm máu</InputLabel><Select name="bloodType" value={formData.bloodType} label="Nhóm máu" onChange={handleFormChange}><MenuItem value="A_POS">A+</MenuItem><MenuItem value="A_NEG">A-</MenuItem><MenuItem value="B_POS">B+</MenuItem><MenuItem value="B_NEG">B-</MenuItem><MenuItem value="AB_POS">AB+</MenuItem><MenuItem value="AB_NEG">AB-</MenuItem><MenuItem value="O_POS">O+</MenuItem><MenuItem value="O_NEG">O-</MenuItem></Select></FormControl>
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <FormControl fullWidth required><InputLabel>Thành phần máu</InputLabel><Select name="productType" value={formData.productType} label="Thành phần máu" onChange={handleFormChange}><MenuItem value="WholeBlood">Máu toàn phần</MenuItem><MenuItem value="RedBloodCells">Hồng cầu</MenuItem><MenuItem value="Platelets">Tiểu cầu</MenuItem><MenuItem value="Plasma">Huyết tương</MenuItem></Select></FormControl>
                            </Grid>
                            <Grid item xs={12}><TextField required fullWidth id="quantity" label="Số lượng (đơn vị)" name="quantity" type="number" value={formData.quantity} onChange={handleFormChange} /></Grid>
                            <Grid item xs={12}><TextField required fullWidth id="reason" label="Lí do yêu cầu" name="reason" multiline rows={3} value={formData.reason} onChange={handleFormChange} /></Grid>
                            {formError && (<Grid item xs={12}><Alert severity="error" onClose={() => setFormError(null)}>{formError}</Alert></Grid>)}
                            <Grid item xs={12}>
                                <Button type="submit" fullWidth variant="contained" size="large" disabled={formLoading} startIcon={formLoading ? <CircularProgress size={20} color="inherit" /> : <SendIcon />}>
                                    {formLoading ? 'Đang gửi...' : 'Gửi Yêu Cầu'}
                                </Button>
                            </Grid>
                        </Grid>
                    </Box>
                </TabPanel>

                {/* --- TAB 2: LỊCH SỬ YÊU CẦU --- */}
                <TabPanel value={tabValue} index={1}>
                    {listLoading ? (
                        <Box sx={{ display: 'flex', justifyContent: 'center', p: 5 }}><CircularProgress /></Box>
                    ) : listError ? (
                        <Alert severity="error">{listError}</Alert>
                    ) : requests.length === 0 ? (
                        <Typography sx={{ textAlign: 'center', p: 3 }}>Bạn chưa có yêu cầu nào.</Typography>
                    ) : (
                        <Grid container spacing={3}>
                            {requests.map((req) => (
                                <Grid item xs={12} key={req.id}>
                                    <Paper variant="outlined" sx={{ p: 2.5, borderRadius: 2 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                            <Box><Typography variant="h6" fontWeight="bold">BN: {req.patientName}</Typography><Typography variant="caption" color="text.secondary">Ngày: {new Date(req.createdAt).toLocaleString('vi-VN')}</Typography></Box>
                                            <RequestStatusChip status={req.status} />
                                        </Box>
                                        <Divider sx={{ my: 1.5 }} />
                                        <Grid container spacing={2} sx={{ color: 'text.secondary' }}>
                                            <Grid item xs={12} sm={6}><Box display="flex" alignItems="center"><LocalHospitalIcon fontSize="small" sx={{ mr: 1 }} /><Typography variant="body2">BV: <strong>{req.hospital.name}</strong></Typography></Box></Grid>
                                            <Grid item xs={12} sm={6}><Box display="flex" alignItems="center"><ScienceIcon fontSize="small" sx={{ mr: 1 }} /><Typography variant="body2">Máu: <strong>{req.bloodType.replace('_POS', '+').replace('_NEG', '-')}</strong> - {req.quantity} đv</Typography></Box></Grid>
                                            <Grid item xs={12}><Box display="flex" alignItems="flex-start"><EventNoteIcon fontSize="small" sx={{ mr: 1, mt: 0.5 }} /><Typography variant="body2">Lí do: {req.reason}</Typography></Box></Grid>
                                        </Grid>
                                        {cancellableStatuses.includes(req.status) && (
                                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button variant="outlined" color="error" startIcon={<CancelIcon />} onClick={() => handleCancelRequest(req.id)}>Hủy</Button>
                                            </Box>
                                        )}
                                    </Paper>
                                </Grid>
                            ))}
                        </Grid>
                    )}
                </TabPanel>
            </Paper>
        </Box>
    );
};

export default BloodRequestManagementPage;
