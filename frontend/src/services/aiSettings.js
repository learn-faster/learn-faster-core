import api from './api';
import { getUserId } from '../lib/utils/user-id';

const aiSettings = {
    get: async () => api.get('/settings/ai', { params: { user_id: getUserId() } }),
    update: async (payload) => api.put('/settings/ai', payload, { params: { user_id: getUserId() } })
};

export default aiSettings;
