import api from "../api";

/**
 * Lấy danh sách tất cả các đơn vị máu.
 * Yêu cầu quyền Admin hoặc Staff.
 */
export const fetchAllBloodUnits = async () => {
  try {
    // Interceptor sẽ tự động đính kèm token
    const response = await api.get('/blood-units');
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch blood units:", error);
    throw error.response ? error.response.data : error;
  }
};

/**
 * Cập nhật trạng thái của một đơn vị máu cụ thể.
 * Yêu cầu quyền Admin hoặc Staff.
 */
export const updateBloodUnitStatus = async (unitId: string | number, payload: any) => {
    try {
        const response = await api.patch(`/blood-units/${unitId}/status`, payload);
        return response.data;
    } catch (error: any) {
        console.error(`Failed to update status for unit ${unitId}:`, error);
        throw error.response ? error.response.data : error;
    }
};

/**
 * Admin tạo một đơn vị máu thủ công.
 */
export const manualCreateBloodUnit = async (payload: any) => {
    try {
        const response = await api.post('/blood-units/manual-create', payload);
        return response.data;
    } catch (error: any) {
        console.error("Failed to manually create blood unit:", error);
        throw error.response ? error.response.data : error;
    }
}

export const getHospitals = async (payload: any) => {
    try {
        const response = await api.get('/hospitals');
        return response.data;
    } catch (error: any) {
        console.error("Failed to get hospital", error);
        throw error.response ? error.response.data : error;
    }
}



