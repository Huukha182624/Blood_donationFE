import api from "../api";

export const getAllHospitals = async () => {
  try {
    const response = await api.get('/hospitals');
    return response.data;
  } catch (error: any) {
    console.error('Error fetching hospitals:', error);
    throw error.response ? error.response.data : error;
  }
};

export const createHospital = async (hospitalData: { name: string; address: string; contactInfo?: string }) => {
  try {
    const response = await api.post('/hospitals', hospitalData);
    return response.data;
  } catch (error: any) {
    console.error('Error creating hospital:', error);
    throw error.response ? error.response.data : error;
  }
};
