import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
  timeout: 60000,
});

/**
 * Send raw resume data to the serverless function for AI enhancement.
 * @param {object} payload - { personalInfo, experience, education, skills, jobDescription }
 * @returns {Promise<{ summary, skills, experience, atsScore, keywords }>}
 */
export const enhanceResume = async (payload) => {
  const { data } = await api.post('/resume/enhance', payload);
  if (!data.success) throw new Error(data.error || 'Enhancement failed');
  return data.data;
};
