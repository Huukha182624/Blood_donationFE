import api from './api';
import type { IDonor, IDonationRecord } from '../types/donor'; // Giả sử bạn có các type này

/**
 * Hàm helper để lấy lịch sử hiến máu của một người dùng.
 * @param {string | number} userId - ID của người dùng.
 * @returns {Promise<IDonationRecord[]>} - Mảng chứa các bản ghi lịch sử.
 */
async function fetchDonationHistory(userId: string | number): Promise<IDonationRecord[]> {
  try {
    // SỬA LỖI: Sử dụng 'api' instance và đúng đường dẫn
    const response = await api.get(`/campaign-registrations/history/user/${userId}`);
    return response.data;
  } catch (error) {
    console.error(`Không thể lấy lịch sử cho người dùng ${userId}:`, error);
    return []; // Trả về mảng rỗng nếu có lỗi
  }
}

/**
 * Lấy danh sách tất cả người dùng từ backend và kết hợp với lịch sử hiến máu của họ.
 * @returns {Promise<IDonor[]>} - Mảng các đối tượng người hiến máu đã có đầy đủ thông tin.
 */
export async function fetchAllUsersWithHistory(): Promise<IDonor[]> {
  try {
    // 1. Lấy danh sách tất cả người dùng. Interceptor sẽ tự động thêm token.
    const userResponse = await api.get('/users');
    const rawUsers: any[] = userResponse.data;

    // 2. Tạo một mảng các "lời hứa" (promise) sẽ lấy lịch sử cho từng người dùng
    const historyPromises = rawUsers.map(user => fetchDonationHistory(user.userId));
    
    // 3. Dùng Promise.all để thực thi tất cả các promise song song
    const allHistories = await Promise.all(historyPromises);

    // 4. Ánh xạ dữ liệu người dùng, kết hợp với lịch sử của họ và tính toán
    const mappedDonors: IDonor[] = rawUsers.map((user, index) => {
      const donationHistory = allHistories[index] || [];

      // Tính toán các thông số
      const totalDonations = donationHistory.length;
      const totalVolume = donationHistory.reduce((sum, record) => sum + record.volume, 0);
      
      // Lịch sử từ backend đã được sắp xếp, chỉ cần lấy ngày của bản ghi đầu tiên
      const lastDonationDate = totalDonations > 0 ? donationHistory[0].date : '';

      // SỬA LỖI: Sử dụng đúng tên thuộc tính camelCase từ backend
      return {
        id: user.userId.toString(),
        name: user.fullName,
        dob: user.birthday,
        gender: user.gender, // Backend đã trả về chuỗi "Male", "Female", "Other"
        // --- SỬA LỖI: Thêm thuộc tính idCard còn thiếu ---
        idCard: user.idCard || '', // Giả sử idCard có thể không tồn tại trên user object
        address: user.address,
        bloodGroup: user.bloodType,
        phone: user.phoneNumber,
        email: user.email,
        lat: user.lat,
        lng: user.lng,
        avatar_image: user.avatarImage, // Sửa lại tên thuộc tính
        role: user.role,
        
        // Gán các giá trị vừa tính toán được
        totalVolume: totalVolume,
        totalDonations: totalDonations,
        lastDonationDate: lastDonationDate,
        donationHistory: donationHistory,
      };
    });

    console.log('[userService] Dữ liệu người dùng đầy đủ (đã có lịch sử):', mappedDonors);
    
    return mappedDonors;

  } catch (error) {
    console.error("Lỗi khi lấy và xử lý dữ liệu người dùng:", error);
    throw error.response ? error.response.data : error;
  }
}
