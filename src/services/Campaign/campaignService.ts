import api from "../api";

export const getAllCampaigns = async () => {
  try {
    const response = await api.get('/blood-donation-campaigns');
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const createCampaign = async (campaignData: any) => {
  try {
    const response = await api.post('/blood-donation-campaigns', campaignData);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : error;
  }
};

export const updateCampaign = async (id: string | number, campaignData: any) => {
    try {
      const response = await api.patch(`/blood-donation-campaigns/${id}`, campaignData);
      return response.data;
    } catch (error: any) {
      throw error.response ? error.response.data : error;
    }
  };

export const fetchAllCampaignRegistrations = async () => {
  try {
    const response = await api.get('/campaign-registrations');
    return response.data;
  } catch (error: any) {
    console.error("Failed to fetch campaign registrations:", error);
    throw error.response ? error.response.data : error;
  }
};
