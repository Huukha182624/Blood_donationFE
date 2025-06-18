import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getUserById } from '../services/user.service';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const stored = localStorage.getItem('user');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.data;
      } catch {
        localStorage.removeItem('user');
      }
    }
    return null;
  });

  useEffect(() => {
    async function fetchUser() {
      if (user && user.user_id) {
        try {
          const freshUser = await getUserById(user.user_id);
          setUser(freshUser);
          localStorage.setItem('user', JSON.stringify({ data: freshUser }));
        } catch {
          // Nếu lỗi (ví dụ user không còn tồn tại), có thể logout hoặc giữ nguyên
        }
      }
    }
    fetchUser();
    // eslint-disable-next-line
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify({
      data: userData
    }));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

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