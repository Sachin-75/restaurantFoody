import axios from 'axios';
import Cookies from 'js-cookie'
const BASE_URL = 'http://localhost:5000/api';

const apiRequest = async ({ method = 'GET', url, data = {}, params = {}, headers = {} }) => {
    const token = Cookies.get("token");
    const config = {
        method,
        url: `${BASE_URL}${url}`,
        data,
        params,
        headers: {
            'Content-Type': 'application/json',
            ...(token && { 'Authorization': `Bearer ${token}` }),
            ...headers
        }
    };

    try {
        const response = await axios(config);
        return response;
    } catch (error) {
        console.error('API Error', error);
        throw error;
    }
};

export default apiRequest;
