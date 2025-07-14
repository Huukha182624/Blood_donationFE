import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
// --- SỬA LỖI: Import đúng hàm getCurrentUser ---
import { getCurrentUser } from '../services/user.service';

const UserContext = createContext(null);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Thêm state loading để xử lý việc tải ban đầu

  useEffect(() => {
    const fetchCurrentUser = async () => {
      // Chỉ fetch khi có token trong localStorage nhưng chưa có thông tin user trong state
      const token = localStorage.getItem('authToken');
      if (token && !user) {
        try {
          const currentUser = await getCurrentUser();
          setUser(currentUser);
          localStorage.setItem('user', JSON.stringify(currentUser)); // Lưu lại thông tin mới nhất
        } catch (error) {
          console.error("Failed to fetch current user, logging out.", error);
          // Nếu token không hợp lệ, hãy đăng xuất
          logout();
        }
      }
      setLoading(false);
    };

    fetchCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const login = (userData) => {
    // Hàm login giờ đây chỉ cần nhận dữ liệu user đã có sẵn từ API login
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('authToken');
  };

  // Chỉ render children khi đã xác định xong trạng thái đăng nhập
  if (loading) {
    return <div>Loading...</div>; // Hoặc một component Spinner đẹp hơn
  }

  return (
    <UserContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useUser = () => useContext(UserContext);
