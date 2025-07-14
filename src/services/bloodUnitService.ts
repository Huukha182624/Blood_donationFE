import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5249/',
});


export async function updateBloodUnitStatus(id: string, payload: { status: string; verifiedByUserId: number; hospitalId: number }) {
  const res = await api.patch(`/blood-units/${id}/status`, payload);
  return res.data;
}