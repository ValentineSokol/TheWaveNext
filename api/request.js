export const BASE_URL = 'http://localhost:5000';

export class ApiError extends Error {
    constructor(url, status) {
        super(`Faced an error while fetching data from ${BASE_URL}${url}. Got a ${status} status code.`);
        this.name = 'ApiError';
        this.status = status;
    }
}
const request = async (url, { method = 'GET', payload } = {}) => {
    let body;
    const headers = new Headers();
    if (payload) {
        headers.set('Content-Type', 'application/json');
        body = JSON.stringify(payload);
    }
    const res = await fetch(`${BASE_URL}${url}`, { method, headers, body });
    if (!res.ok) throw new ApiError(url, res.status);
    return res.json();
}

export default {
    get: (url) => request(url),
    post: (url, payload) => request(url, { method: 'POST', payload })
};
