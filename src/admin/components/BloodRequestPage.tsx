import React, { useState } from "react";
import { Box, Button, Typography, Paper, Grid } from "@mui/material";

const BloodRequestPage = () => {
  const [requests, setRequests] = useState([
    { id: 1, name: "Nguyễn Văn A", reason: "Tai nạn giao thông", status: "pending" },
    { id: 2, name: "Trần Thị B", reason: "Phẫu thuật tim", status: "pending" },
  ]);

  const handleAccept = (id: number) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "accepted" } : r))
    );
  };

  const handleReject = (id: number) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: "rejected" } : r))
    );
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        🩸 Danh sách đơn cần máu
      </Typography>
      <Grid container spacing={2}>
        {requests.map((req) => (
          <Grid item xs={12} md={6} key={req.id}>
            <Paper elevation={3} sx={{ p: 2 }}>
              <Typography><b>Người cần máu:</b> {req.name}</Typography>
              <Typography><b>Lý do:</b> {req.reason}</Typography>
              <Typography><b>Trạng thái:</b> {req.status === "pending" ? "Chờ xử lý" : req.status === "accepted" ? "Đã nhận" : "Đã từ chối"}</Typography>
              {req.status === "pending" && (
                <Box sx={{ mt: 2 }}>
                  <Button variant="contained" color="success" onClick={() => handleAccept(req.id)} sx={{ mr: 1 }}>
                    Nhận
                  </Button>
                  <Button variant="contained" color="error" onClick={() => handleReject(req.id)}>
                    Từ chối
                  </Button>
                </Box>
              )}
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BloodRequestPage;
