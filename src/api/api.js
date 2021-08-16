import axios from 'axios';

const serverUrl = process.env.REACT_APP_SERVER_URL?process.env.REACT_APP_SERVER_URL:'http://localhost:8080'
const api = axios.create({
    baseURL: serverUrl,
    params: {
        id: localStorage.getItem('UserId')
      }, headers: { authentication: `Bearer ${localStorage.getItem('token')}` }
});

export default api;