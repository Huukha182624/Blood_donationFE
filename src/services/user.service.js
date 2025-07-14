import axios from 'axios';

// --- CẬP NHẬT: Cấu hình axios để trỏ đến backend .NET ---
const api = axios.create({
  baseURL: 'http://localhost:5249/api/', // Cổng 5249 và tiền tố /api/
});

// Thêm một "interceptor" để tự động đính kèm token vào mỗi yêu cầu
// nếu token đã được lưu trong localStorage.
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken'); // Giả sử bạn lưu token với key 'authToken'
    if (token && !config.headers.Authorization) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);


// --- Hàm tiện ích để lấy tọa độ từ địa chỉ ---
export const getCoordinatesFromAddress = async (address) => {
  const apiKey = import.meta.env.VITE_Maps_API_KEY;
  if (!apiKey) {
    console.error("VITE_Maps_API_KEY is not configured in .env file");
    return null;
  }
  const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.status === 'OK' && data.results.length > 0) {
      return data.results[0].geometry.location;
    } else {
      console.error('Geocoding failed:', data.status, data.error_message);
      return null;
    }
  } catch (error) {
    console.error('Error fetching geocoding data:', error);
    return null;
  }
};


// =================================================================
// CÁC HÀM LIÊN QUAN ĐẾN XÁC THỰC (Authentication)
// =================================================================

export const registerUser = async (userData) => {
  try {
    // Gửi thẳng payload từ component vì nó đã có định dạng đúng
    // (camelCase) mà backend .NET mong đợi.
    const response = await api.post('/users/register', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const confirmRegister = async (token) => {
  try {
    // Đường dẫn mới và token được truyền dưới dạng query parameter
    const response = await api.get(`/users/confirm-registration?token=${token}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/users/login', credentials);
    // Lưu token vào localStorage sau khi đăng nhập thành công
    if (response.data.token) {
        localStorage.setItem('authToken', response.data.token);
    }
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const logoutUser = () => {
    localStorage.removeItem('authToken');
};

export const updateUserProfile = async (userData) => {
  try {
    // Gọi đến API PUT /users/me mà chúng ta đã tạo ở backend
    // Interceptor sẽ tự động đính kèm token
    const response = await api.put('/users/me', userData);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
// =================================================================
// CÁC HÀM LIÊN QUAN ĐẾN NGƯỜI DÙNG (User)
// =================================================================

export const getUserById = async (id) => {
  try {
    // Interceptor sẽ tự động thêm token
    const response = await api.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getCurrentUser = async (id) => {
  try {
    // Interceptor sẽ tự động thêm token
    const response = await api.get(`/users/me`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

const fetchDonationHistory = async (userId) => {
  try {
    const response = await api.get(`/campaign-registrations/history/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Không thể lấy lịch sử cho người dùng ${userId}:`, error);
    return [];
  }
};



export const fetchAllUsersWithHistory = async () => {
  try {
    const userResponse = await api.get('/users');
    const rawUsers = userResponse.data;

    const historyPromises = rawUsers.map(user => fetchDonationHistory(user.userId));
    const allHistories = await Promise.all(historyPromises);

    const mappedDonors = rawUsers.map((user, index) => {
      const donationHistory = allHistories[index] || [];
      const totalDonations = donationHistory.length;
      const totalVolume = donationHistory.reduce((sum, record) => sum + record.volume, 0);
      const lastDonationDate = totalDonations > 0 ? donationHistory[0].date : '';

      return {
        id: user.userId,
        name: user.fullName,
        dob: user.birthday,
        gender: user.gender,
        address: user.address,
        bloodGroup: user.bloodType,
        phone: user.phoneNumber,
        email: user.email,
        lat: user.lat,
        lng: user.lng,
        avatar_image: user.avatarImage,
        totalVolume,
        totalDonations,
        lastDonationDate,
        donationHistory,
      };
    });
    
    return mappedDonors;
  } catch (error) {
    console.error("Lỗi khi lấy và xử lý dữ liệu người dùng:", error);
    throw error.response ? error.response.data : error;
  }
};
