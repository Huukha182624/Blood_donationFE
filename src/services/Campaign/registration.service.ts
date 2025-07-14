import api from "../api"; // Đường dẫn tới file cấu hình axios của bạn

/**
 * Gửi yêu cầu đăng ký tham gia một sự kiện hiến máu.
 * API này yêu cầu xác thực (token).
 * @param {object} payload Dữ liệu đăng ký, bao gồm campaignId, note, và productType.
 * @returns {Promise<object>} Dữ liệu trả về từ API.
 */
export const registerForCampaign = async (payload) => {
  try {
    // Giả định rằng 'api' instance đã được cấu hình với interceptor 
    // để tự động đính kèm token vào header Authorization.
    const response = await api.post('/campaign-registrations', payload);
    return response.data;
  } catch (error) {
    // Ném lỗi đã được định dạng lại để component có thể bắt và xử lý
    throw error.response ? error.response.data : error;
  }
};

export const getMyRegistrations = async () => {
  try {
    // Giả định 'api' instance đã được cấu hình interceptor để gửi token
    const response = await api.get('/campaign-registrations/me');
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

/**
 * Gửi yêu cầu hủy một lịch hẹn hiến máu đã đăng ký.
 * API này yêu cầu xác thực (token).
 * @param {number} registrationId ID của lịch hẹn cần hủy.
 * @returns {Promise<object>} Dữ liệu trả về từ API sau khi hủy thành công.
 */
export const cancelRegistration = async (registrationId) => {
  try {
    const response = await api.patch(`/campaign-registrations/${registrationId}/cancel`);
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};