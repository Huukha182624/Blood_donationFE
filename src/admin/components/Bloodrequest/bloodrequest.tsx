import React, { useState, useEffect, useCallback, useMemo } from 'react';
import {
    Box,
    Typography,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Chip,
    CircularProgress,
    Alert,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Collapse,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Grid,
    Card,
    CardContent,
    TextField,
    InputAdornment
} from "@mui/material";
import {
    CheckCircleOutline,
    HighlightOff,
    HourglassTop,
    MoreHoriz,
    ThumbUp,
    LocalShipping,
    ExpandMore as ExpandMoreIcon,
    Search as SearchIcon,
    WarningAmber,
    PlaylistAddCheck,
    PendingActions,
    Add as AddIcon
} from '@mui/icons-material';

// --- IMPORT CÁC HÀM API THẬT SỰ ---
import { 
    getAllBloodRequests, 
    verifyBloodRequest, 
    processBloodRequest, 
    fulfillBloodRequest,
    createBloodRequest,
    getAllHospitals
} from '../../../services/BloodUnit/bloodRequest.service';

// --- TYPE DEFINITIONS for TypeScript ---
interface User {
    userId: number;
    fullName: string;
}

interface Hospital {
    hospitalId: number; // Giữ nguyên tên này để nhất quán trong component
    name: string;
    address: string;
}

// Interface cho dữ liệu bệnh viện thô từ API
interface RawHospitalData {
    id: number; // API trả về 'id'
    name: string;
    address: string;
}

type RequestStatus = 'Pending' | 'Verified' | 'Rejected' | 'Approved' | 'PendingAppeal' | 'Fulfilled' | 'Cancelled';

interface BloodRequest {
    id: number;
    patientName: string;
    bloodType: string;
    productType: string;
    quantity: number;
    reason: string;
    status: RequestStatus;
    createdAt: string;
    verifiedAt?: string | null;
    approvedAt?: string | null;
    fulfilledAt?: string | null;
    hospital: Hospital;
    requestingUser: User;
    verifyingStaff?: User | null;
    approvingAdmin?: User | null;
}

interface StatusChipProps {
    status: RequestStatus;
}

type ActionType = 'verify' | 'process' | 'fulfill';
type VerifyStatus = 'Verified' | 'Rejected';

interface RequestRowProps {
    request: BloodRequest;
    userRole: 'Admin' | 'Staff'; 
    onAction: (action: ActionType, id: number, status?: VerifyStatus | null) => void;
}

// Giả lập một hook để lấy vai trò người dùng hiện tại
const useAuth = () => {
    // Trong ứng dụng thực tế, bạn sẽ lấy thông tin này từ context, Redux, hoặc token
    return { userRole: 'Admin' as 'Admin' | 'Staff' }; 
};


// --- COMPONENT HELPER ---

const StatusChip = ({ status }: StatusChipProps) => {
    const statusConfig: Record<RequestStatus, { label: string; color: 'warning' | 'info' | 'error' | 'secondary' | 'primary' | 'success' | 'default'; icon?: React.ReactElement }> = {
        Pending: { label: 'Chờ Xác thực', color: 'warning', icon: <HourglassTop /> },
        Verified: { label: 'Đã Xác thực', color: 'info', icon: <CheckCircleOutline /> },
        Rejected: { label: 'Đã Từ chối', color: 'error', icon: <HighlightOff /> },
        Approved: { label: 'Đã Duyệt', color: 'secondary', icon: <ThumbUp /> },
        PendingAppeal: { label: 'Cần Kêu gọi', color: 'primary', icon: <WarningAmber /> },
        Fulfilled: { label: 'Đã Hoàn thành', color: 'success', icon: <LocalShipping /> },
        Cancelled: { label: 'Đã Hủy', color: 'default' }
    };
    const config = statusConfig[status] || { label: status, color: 'default' };
    return <Chip icon={config.icon} label={config.label} color={config.color} size="small" sx={{ fontWeight: 'bold' }} />;
};

const RequestRow = ({ request, userRole, onAction }: RequestRowProps) => {
    const [open, setOpen] = useState(false);

    const handleActionClick = (action: ActionType, status: VerifyStatus | null = null) => {
        onAction(action, request.id, status);
    };

    const isPendingAppeal = request.status === 'PendingAppeal';

    return (
        <React.Fragment>
            <TableRow 
                sx={{ 
                    '& > *': { borderBottom: 'unset' },
                    ...(isPendingAppeal && { bgcolor: 'primary.lighter', '&:hover': { bgcolor: 'primary.light' } })
                }}
            >
                <TableCell>
                    <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
                        {open ? <ExpandMoreIcon sx={{ transform: 'rotate(180deg)' }} /> : <ExpandMoreIcon />}
                    </IconButton>
                </TableCell>
                <TableCell component="th" scope="row">
                    <Typography variant="body2" fontWeight="bold">#{request.id}</Typography>
                    <Typography variant="caption" color="text.secondary">{new Date(request.createdAt).toLocaleDateString('vi-VN')}</Typography>
                </TableCell>
                <TableCell>{request.patientName}</TableCell>
                <TableCell>{request.hospital.name}</TableCell>
                <TableCell>
                    <StatusChip status={request.status} />
                </TableCell>
                <TableCell align="center">
                    {userRole === 'Staff' && request.status === 'Pending' && (
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            <Button variant="contained" size="small" color="success" onClick={() => handleActionClick('verify', 'Verified')}>Xác thực</Button>
                            <Button variant="outlined" size="small" color="error" onClick={() => handleActionClick('verify', 'Rejected')}>Từ chối</Button>
                        </Box>
                    )}
                     {userRole === 'Admin' && request.status === 'Pending' && (
                        <Box sx={{ display: 'flex', gap: 1, justifyContent: 'center' }}>
                            <Button variant="contained" size="small" color="success" onClick={() => handleActionClick('verify', 'Verified')}>Xác thực</Button>
                            <Button variant="outlined" size="small" color="error" onClick={() => handleActionClick('verify', 'Rejected')}>Từ chối</Button>
                        </Box>
                    )}
                    {userRole === 'Admin' && request.status === 'Verified' && (
                        <Button variant="contained" size="small" color="secondary" onClick={() => handleActionClick('process')}>Xử lý & Duyệt</Button>
                    )}
                    {userRole === 'Admin' && request.status === 'Approved' && (
                        <Button variant="contained" size="small" color="primary" onClick={() => handleActionClick('fulfill')}>Hoàn thành</Button>
                    )}
                </TableCell>
            </TableRow>
            <TableRow>
                <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                    <Collapse in={open} timeout="auto" unmountOnExit>
                        <Box sx={{ margin: 1, p: 2, bgcolor: 'grey.50', borderRadius: 2 }}>
                            <Typography variant="h6" gutterBottom component="div">Chi tiết Yêu cầu</Typography>
                            <Grid container spacing={2}>
                                <div>
                                    <Typography variant="body2"><strong>Người yêu cầu:</strong> {request.requestingUser?.fullName || 'N/A'}</Typography>
                                    <Typography variant="body2"><strong>Nhóm máu:</strong> {request.bloodType.replace('_POS', '+').replace('_NEG', '-')}</Typography>
                                    <Typography variant="body2"><strong>Thành phần:</strong> {request.productType}</Typography>
                                    <Typography variant="body2"><strong>Số lượng:</strong> {request.quantity} đơn vị</Typography>
                                </div>
                                <div>
                                    <Typography variant="body2"><strong>Lí do:</strong> {request.reason}</Typography>
                                    {request.verifyingStaff && <Typography variant="body2"><strong>Nhân viên xác thực:</strong> {request.verifyingStaff.fullName}</Typography>}
                                    {request.approvingAdmin && <Typography variant="body2"><strong>Admin duyệt:</strong> {request.approvingAdmin.fullName}</Typography>}
                                    <Typography variant="body2"><strong>Bệnh viện</strong> {request.hospital.name}</Typography>
                                </div>
                            </Grid>
                        </Box>
                    </Collapse>
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
};

// --- COMPONENT CHÍNH ---

const AdminRequestManagementPage = () => {
    const { userRole } = useAuth();
    const [requests, setRequests] = useState<BloodRequest[]>([]);
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [filterStatus, setFilterStatus] = useState<RequestStatus | 'All'>('All');
    const [searchTerm, setSearchTerm] = useState('');
    
    const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [currentAction, setCurrentAction] = useState<{ action: ActionType | null; id: number | null; status: VerifyStatus | null; }>({ action: null, id: null, status: null });

    const [scanDialogOpen, setScanDialogOpen] = useState(false);
    const [scanForm, setScanForm] = useState({
        hospitalId: '',
        bloodType: 'A_POS',
        productType: 'WholeBlood',
        quantity: 100,
        reason: 'Quét kho dự trữ định kỳ'
    });
    const [scanLoading, setScanLoading] = useState(false);
    const [scanError, setScanError] = useState<string | null>(null);

    const fetchData = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [reqData, rawHospData] = await Promise.all([
                getAllBloodRequests(),
                getAllHospitals()
            ]);

            // SỬA LỖI: Chuyển đổi dữ liệu bệnh viện để nhất quán
            const hospData: Hospital[] = (rawHospData as RawHospitalData[]).map(h => ({
                hospitalId: h.id, // Map 'id' từ API sang 'hospitalId'
                name: h.name,
                address: h.address
            }));

            setRequests(reqData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()));
            setHospitals(hospData);
        } catch (err: any) {
            console.error("Lỗi khi tải dữ liệu:", err);
            setError(err.message || "Không thể tải dữ liệu. Vui lòng thử lại.");
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleAction = (action: ActionType, id: number, status: VerifyStatus | null = null) => {
        setCurrentAction({ action, id, status });
        setConfirmDialogOpen(true);
    };

    const handleConfirmAction = async () => {
        const { action, id, status } = currentAction;
        if (!action || !id) return;

        setConfirmDialogOpen(false);
        setLoading(true);
        try {
            switch (action) {
                case 'verify':
                    if (!status) throw new Error("Status is required for verify action.");
                    await verifyBloodRequest(id, { status });
                    break;
                case 'process':
                    await processBloodRequest(id, { status: 'Approved' });
                    break;
                case 'fulfill':
                    await fulfillBloodRequest(id);
                    break;
                default:
                    throw new Error("Hành động không hợp lệ");
            }
            await fetchData(); 
        } catch (err: any) {
            console.error(`Lỗi khi thực hiện hành động '${action}':`, err);
            setError(err.message || `Lỗi khi thực hiện hành động. Vui lòng thử lại.`);
        } finally {
            setLoading(false);
        }
    };
    
    const handleOpenScanDialog = () => {
        setScanError(null);
        setScanForm({
            hospitalId: '',
            bloodType: 'A_POS',
            productType: 'WholeBlood',
            quantity: 100,
            reason: 'Quét kho dự trữ định kỳ'
        });
        setScanDialogOpen(true);
    };

    const handleScanFormChange = (event: any) => {
        const { name, value } = event.target;
        setScanForm(prev => ({...prev, [name]: value}));
    };

    const handleScanSubmit = async () => {
        setScanError(null);
        if (!scanForm.hospitalId) {
            setScanError("Vui lòng chọn một bệnh viện.");
            return;
        }
        setScanLoading(true);
        try {
            const hospitalIdAsNumber = parseInt(scanForm.hospitalId, 10);
            const selectedHospital = hospitals.find(h => h.hospitalId === hospitalIdAsNumber);
            
            if (!selectedHospital) {
                // Lỗi này sẽ không xảy ra nữa sau khi đã map dữ liệu
                throw new Error("Bệnh viện không hợp lệ.");
            }

            const payload = {
                ...scanForm,
                patientName: selectedHospital.name,
                quantity: parseInt(String(scanForm.quantity), 10),
                hospitalId: hospitalIdAsNumber
            };
            await createBloodRequest(payload);
            alert("Tạo yêu cầu quét thành công!");
            setScanDialogOpen(false);
            await fetchData();
        } catch (err: any) {
            console.error("Lỗi tạo yêu cầu quét:", err);
            setScanError(err.message || 'Không thể tạo yêu cầu. Vui lòng thử lại.');
        } finally {
            setScanLoading(false);
        }
    };

    const filteredRequests = useMemo(() => {
        return requests
            .filter(req => filterStatus === 'All' || req.status === filterStatus)
            .filter(req => 
                req.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                req.id.toString().includes(searchTerm)
            );
    }, [requests, filterStatus, searchTerm]);
    
    const stats = useMemo(() => ({
        pending: requests.filter(r => r.status === 'Pending').length,
        pendingAppeal: requests.filter(r => r.status === 'PendingAppeal').length,
        verified: requests.filter(r => r.status === 'Verified').length,
    }), [requests]);

    return (
        <Box sx={{ p: 3, bgcolor: 'grey.100', minHeight: '100vh' }}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>Tổng quan Yêu cầu Máu</Typography>
            
            <Grid container spacing={3} mb={3}>
                <div><Card><CardContent><PendingActions color="warning"/><Typography variant="h5">{stats.pending}</Typography><Typography color="text.secondary">Chờ xác thực</Typography></CardContent></Card></div>
                <div ><Card><CardContent><PlaylistAddCheck color="info"/><Typography variant="h5">{stats.verified}</Typography><Typography color="text.secondary">Chờ duyệt</Typography></CardContent></Card></div>
                <div ><Card><CardContent><WarningAmber color="primary"/><Typography variant="h5">{stats.pendingAppeal}</Typography><Typography color="text.secondary">Cần kêu gọi</Typography></CardContent></Card></div>
            </Grid>

            <Paper elevation={4} sx={{ borderRadius: 3, overflow: 'hidden' }}>
                <Box sx={{ p: 2, display: 'flex', gap: 2, alignItems: 'center', bgcolor: 'grey.50', borderBottom: '1px solid', borderColor: 'divider' }}>
                    <TextField fullWidth variant="outlined" size="small" placeholder="Tìm theo tên bệnh nhân, ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon /></InputAdornment> }} />
                    <FormControl sx={{ minWidth: 200 }} size="small">
                        <InputLabel>Trạng thái</InputLabel>
                        <Select value={filterStatus} label="Trạng thái" onChange={(e) => setFilterStatus(e.target.value as RequestStatus | 'All')}>
                            {/* SỬA LỖI: Thêm key prop */}
                            <MenuItem key="all" value="All">Tất cả</MenuItem>
                            <MenuItem key="pending" value="Pending">Chờ Xác thực</MenuItem>
                            <MenuItem key="verified" value="Verified">Chờ Duyệt</MenuItem>
                            <MenuItem key="approved" value="Approved">Đã Duyệt</MenuItem>
                            <MenuItem key="pending-appeal" value="PendingAppeal">Cần Kêu gọi</MenuItem>
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        startIcon={<AddIcon />}
                        onClick={handleOpenScanDialog}
                        sx={{ flexShrink: 0 }}
                    >
                        Tạo Yêu cầu Quét
                    </Button>
                </Box>
                
                {error && <Alert severity="error" sx={{ m: 2 }} onClose={() => setError(null)}>{error}</Alert>}

                <TableContainer>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow sx={{ bgcolor: 'grey.200' }}>
                                <TableCell />
                                <TableCell sx={{ fontWeight: 'bold' }}>Yêu cầu</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Bệnh nhân</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Bệnh viện</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Trạng thái</TableCell>
                                <TableCell align="center" sx={{ fontWeight: 'bold' }}>Hành động</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {loading ? (
                                <TableRow><TableCell colSpan={6} align="center"><CircularProgress sx={{ my: 4 }} /></TableCell></TableRow>
                            ) : (
                                filteredRequests.map((request) => (
                                    <RequestRow key={request.id} request={request} userRole={userRole} onAction={handleAction} />
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Dialog open={scanDialogOpen} onClose={() => setScanDialogOpen(false)} fullWidth maxWidth="sm">
                <DialogTitle>Tạo Yêu cầu Quét kho cho Bệnh viện</DialogTitle>
                <DialogContent>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
                        {scanError && (
                            <Alert severity="error" onClose={() => setScanError(null)}>{scanError}</Alert>
                        )}
                        <FormControl fullWidth required>
                            <InputLabel id="hospital-select-scan-label">Bệnh viện</InputLabel>
                            <Select
                                labelId="hospital-select-scan-label"
                                name="hospitalId"
                                value={scanForm.hospitalId}
                                label="Bệnh viện"
                                onChange={handleScanFormChange}
                            >
                                {hospitals.map(h => <MenuItem key={h.hospitalId} value={String(h.hospitalId)}>{h.name}</MenuItem>)}
                            </Select>
                        </FormControl>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <FormControl fullWidth required>
                                <InputLabel>Nhóm máu</InputLabel>
                                <Select name="bloodType" value={scanForm.bloodType} label="Nhóm máu" onChange={handleScanFormChange}>
                                    <MenuItem value="A_POS">A+</MenuItem>
                                    <MenuItem value="A_NEG">A-</MenuItem>
                                    <MenuItem value="B_POS">B+</MenuItem>
                                    <MenuItem value="B_NEG">B-</MenuItem>
                                    <MenuItem value="AB_POS">AB+</MenuItem>
                                    <MenuItem value="AB_NEG">AB-</MenuItem>
                                    <MenuItem value="O_POS">O+</MenuItem>
                                    <MenuItem value="O_NEG">O-</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth required>
                                <InputLabel>Thành phần máu</InputLabel>
                                <Select name="productType" value={scanForm.productType} label="Thành phần máu" onChange={handleScanFormChange}>
                                    <MenuItem value="WholeBlood">Máu toàn phần</MenuItem>
                                    <MenuItem value="RedBloodCells">Hồng cầu</MenuItem>
                                    <MenuItem value="Platelets">Tiểu cầu</MenuItem>
                                    <MenuItem value="Plasma">Huyết tương</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <TextField fullWidth required name="quantity" label="Số lượng (đơn vị)" type="number" value={scanForm.quantity} onChange={handleScanFormChange} />
                        <TextField fullWidth required name="reason" label="Lí do" multiline rows={2} value={scanForm.reason} onChange={handleScanFormChange} />
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: '16px 24px' }}>
                    <Button onClick={() => setScanDialogOpen(false)}>Hủy</Button>
                    <Button onClick={handleScanSubmit} variant="contained" disabled={scanLoading}>
                        {scanLoading ? <CircularProgress size={24} /> : "Tạo Yêu cầu"}
                    </Button>
                </DialogActions>
            </Dialog>

            <Dialog open={confirmDialogOpen} onClose={() => setConfirmDialogOpen(false)}>
                <DialogTitle>Xác nhận Hành động</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Bạn có chắc chắn muốn thực hiện hành động này không?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDialogOpen(false)}>Hủy</Button>
                    <Button onClick={handleConfirmAction} autoFocus variant="contained">
                        Xác nhận
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AdminRequestManagementPage;
