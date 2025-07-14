import api from "../api";

/**
 * Admin tạo một người dùng mới (vai trò Member).
 */
export const adminCreateUser = async (payload: any) => {
  try {
    const response = await api.post('/users/admin/create', payload);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

/**
 * Admin cập nhật thông tin của một người dùng.
 */
export const adminUpdateUser = async (userId: string | number, payload: any) => {
    try {
      // Backend của chúng ta dùng PUT /users/{id} để cập nhật
      const response = await api.put(`/users/${userId}`, payload);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error;
    }
  };

/**
 * Admin xóa một người dùng.
 */
export const adminDeleteUser = async (userId: string | number) => {
  try {
    const response = await api.delete(`/users/${userId}`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

/**
 * Lấy danh sách tất cả người dùng (dành cho Admin/Staff).
 */
export const fetchAllUsers = async () => {
  try {
    const response = await api.get('/users');
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};
