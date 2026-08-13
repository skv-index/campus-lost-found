// Central API base URL config
// In development: Vite proxy handles /api -> localhost:5000
// In production: set VITE_API_URL to your Render backend URL
const API_BASE = import.meta.env.VITE_API_URL || '';

export default API_BASE;
