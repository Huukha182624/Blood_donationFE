import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5249/api',
});

export async function searchCampaignsByDate(start, end) {
    const res = await api.get(`/blood-donation-campaigns/search`, {
        params: { start, end }
    });
    return res.data;
}

export async function createCampaign(data) {
    const res = await api.post('/blood-donation-campaigns', data);
    return res.data;
}

export async function updateCampaign(id, data) {
    const res = await api.patch(`/blood-donation-campaigns/${id}`, data);
    return res.data;
}