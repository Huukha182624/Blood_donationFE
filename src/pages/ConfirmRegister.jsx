import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import { confirmRegister } from "../services/user.service";

const ConfirmRegister = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const confirm = async () => {
      try {
        const res = await confirmRegister(token);
        setMessage(res.message || "Xác thực thành công!");
        setTimeout(() => navigate("/dang-nhap"), 3000);
      } catch (err) {
        setError(err.message || "Xác thực thất bại hoặc token không hợp lệ.");
      } finally {
        setLoading(false);
      }
    };
    confirm();
  }, [token, navigate]);

  return (
    <Box sx={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#e3f2fd" }}>
      <Box sx={{ p: 5, borderRadius: 4, background: "#fff", boxShadow: 3, minWidth: 350, textAlign: "center" }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>XÁC THỰC TÀI KHOẢN</Typography>
        {loading && <CircularProgress />}
        {message && <Alert severity="success" sx={{ mt: 2 }}>{message} <br />Đang chuyển sang trang đăng nhập...</Alert>}
        {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
      </Box>
    </Box>
  );
};

export default ConfirmRegister; 