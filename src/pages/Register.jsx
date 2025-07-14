import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Alert,
  InputAdornment,
} from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/user.service";

const Register = () => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [errors, setErrors] = useState({});
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState("");
  const navigate = useNavigate();

  const validate = () => {
    const newErrors = {};
    if (!fullName) newErrors.fullName = "Họ và tên là bắt buộc";
    if (!phone) newErrors.phone = "Số điện thoại là bắt buộc";
    if (!email) newErrors.email = "Email là bắt buộc";
    if (!address) newErrors.address = "Địa chỉ là bắt buộc";
    if (!birthday) newErrors.birthday = "Sinh nhật là bắt buộc";
    if (!gender) newErrors.gender = "Giới tính là bắt buộc";
    if (!password) newErrors.password = "Mật khẩu là bắt buộc";
    if (!confirmPassword)
      newErrors.confirmPassword = "Xác nhận mật khẩu là bắt buộc";
    if (password && confirmPassword && password !== confirmPassword)
      newErrors.confirmPassword = "Mật khẩu xác nhận không khớp";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSendOtp = async () => {
    if (!validate()) return;
    try {
      await registerUser({
        password,
        full_name: fullName,
        email,
        phone_number: phone,
        address,
        birthday,
        gender,
      });
      setSuccess("Vui lòng kiểm tra email để xác nhận tài khoản.");
      setError("");
    } catch (err) {
      setError(err.message || "Đăng ký thất bại. Vui lòng thử lại.");
      setSuccess("");
    }
  };
  return (
    <>
      <Box sx={{ height: 140, backgroundColor: '#f8eaea' }} />
      <Box
        sx={{
          backgroundImage: "url('/register.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Box
          sx={{
            backgroundColor: "rgba(185, 234, 246, 0.5)",
            borderRadius: 4,
            padding: 7,
            maxWidth: 500,
            width: "120%",
            boxShadow: 3,
          }}
        >
          <Box sx={{ textAlign: "center", mb: 2 }}>
            <Box sx={{ fontSize: 60, color: "#fff" }}>📝</Box>
            <Typography variant="h6" sx={{ color: "#fff", fontWeight: "bold" }}>
              TẠO TÀI KHOẢN MỚI
            </Typography>
          </Box>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success ? (
            <Alert severity="success" sx={{ mb: 2, textAlign: 'center' }}>
              {success}
            </Alert>
          ) : (
            <>
              <TextField
                fullWidth
                placeholder="Họ và tên"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 1 }}
                error={!!errors.fullName}
                helperText={errors.fullName}
              />
              <TextField
                fullWidth
                placeholder="Số điện thoại"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 1 }}
                error={!!errors.phone}
                helperText={errors.phone}
              />
              <TextField
                fullWidth
                placeholder="Địa chỉ"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 1 }}
                error={!!errors.address}
                helperText={errors.address}
              />
              <TextField
                fullWidth
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 1 }}
                error={!!errors.email}
                helperText={errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                label="Ngày sinh"
                type="date"
                value={birthday}
                onChange={(e) => setBirthday(e.target.value)}
                sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 1 }}
                error={!!errors.birthday}
                helperText={errors.birthday}
                InputLabelProps={{ shrink: true }}
              />
              <TextField
                select
                fullWidth
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 1 }}
                error={!!errors.gender}
                helperText={errors.gender}
                SelectProps={{ native: true }}
              >
                <option value="">Chọn giới tính</option>
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </TextField>
              <TextField
                fullWidth
                type="password"
                placeholder="Mật khẩu"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mb: 2, backgroundColor: "#fff", borderRadius: 1 }}
                error={!!errors.password}
                helperText={errors.password}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <TextField
                fullWidth
                type="password"
                placeholder="Xác nhận mật khẩu"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                sx={{ mb: 3, backgroundColor: "#fff", borderRadius: 1 }}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  ),
                }}
              />
              <Button
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "rgb(243, 110, 110)",
                  color: "#000",
                  fontWeight: "bold",
                  mb: 2,
                  "&:hover": {
                    backgroundColor: "rgb(247, 33, 33)",
                  },
                }}
                onClick={handleSendOtp}
              >
                Đăng ký
              </Button>
            </>
          )}

          <Box sx={{ textAlign: "center" }}>
            <Typography variant="body2" color="#fff">
              Đã có tài khoản?{" "}
              <Button
                variant="text"
                color="primary"
                sx={{ fontWeight: "bold", textTransform: "none", ml: 1 }}
                onClick={() => navigate("/dang-nhap")}
              >
                Đăng nhập
              </Button>
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default Register;
