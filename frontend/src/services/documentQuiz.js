import api from './api';

const DocumentQuizService = {
    getStudySettings: (documentId) => api.get(`/documents/${documentId}/study-settings`),
    saveStudySettings: (documentId, payload) => api.post(`/documents/${documentId}/study-settings`, payload),
    generateQuizItems: (documentId, payload) => api.post(`/documents/${documentId}/quiz/generate`, payload),
    createSession: (documentId, payload) => api.post(`/documents/${documentId}/quiz/session`, payload),
    getSession: (documentId, sessionId) => api.get(`/documents/${documentId}/quiz/session/${sessionId}`),
    gradeItem: (documentId, payload) => api.post(`/documents/${documentId}/quiz/grade`, payload),
    getStats: (documentId) => api.get(`/documents/${documentId}/quiz/stats`),
    testLlm: (payload) => api.post('/ai/test-llm', payload)
};

export default DocumentQuizService;
