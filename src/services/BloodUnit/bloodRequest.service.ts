import api from "../api"; // Đảm bảo đường dẫn này đúng tới file cấu hình axios của bạn

/**
 * Gửi yêu cầu máu khẩn cấp mới.
 * API này yêu cầu xác thực (token).
 * @param {object} payload Dữ liệu của yêu cầu máu.
 * @returns {Promise<object>} Dữ liệu trả về từ API.
 */
export const createBloodRequest = async (payload) => {
  try {
    // Giả định 'api' instance đã được cấu hình interceptor để tự động đính kèm token.
    const response = await api.post('/blood-requests', payload);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

/**
 * Lấy danh sách tất cả các bệnh viện.
 * @returns {Promise<Array>} Mảng các đối tượng bệnh viện.
 */
export const getAllHospitals = async () => {
  try {
    const response = await api.get('/hospitals');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getMyBloodRequests = async () => {
  try {
    const response = await api.get('/blood-requests/me');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const cancelBloodRequest  = async () => {
  try {
    const response = await api.patch('/blood-requests/${requestId}/cancel');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const getAllBloodRequests = async () => {
  try {
    const response = await api.get('/blood-requests');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

export const verifyBloodRequest = async (requestId: number, payload: { status: 'Verified' | 'Rejected' }) => {
  try {
    // SỬA LỖI: Dùng backtick (`) và truyền requestId, payload
    const response = await api.patch(`/blood-requests/${requestId}/verify`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const processBloodRequest = async (requestId: number, payload: { status: 'Approved' }) => {
  try {
    // SỬA LỖI: Dùng backtick (`) và truyền requestId, payload
    const response = await api.patch(`/blood-requests/${requestId}/process`, payload);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const fulfillBloodRequest = async (requestId: number) => {
  try {
    // SỬA LỖI: Dùng backtick (`) và truyền requestId
    const response = await api.patch(`/blood-requests/${requestId}/fulfill`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};