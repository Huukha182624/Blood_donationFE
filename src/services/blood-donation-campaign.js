import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:3123/',
});

export async function searchCampaignsByDate(start, end) {
    const res = await api.get(`/blood-donation-campaign/search`, {
        params: { start, end }
    });
    return res.data;
}

export async function createCampaign(data) {
    const res = await api.post('/blood-donation-campaign', data);
    return res.data;
}

