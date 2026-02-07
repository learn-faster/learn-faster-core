import api from './api';

/**
 * Service for fetching external learning resources.
 */
const ResourceService = {
    /**
     * Gets 'Active Intel' (Analogy, Insight, Question) for a concept.
     * @param {string} conceptName 
     * @returns {Promise<Object>} { analogy: string, insight: string, question: string }
     */
    scoutResources: async (conceptName) => {
        return await api.get(`resources/scout/${encodeURIComponent(conceptName)}`);
    }
};

export default ResourceService;
