import axios from 'axios';

const BASE_URL = 'http://localhost:3001';

class API {
  get = async (url: string, ...args: any[]) =>
    await axios.get(`${BASE_URL}/${url}`, ...args);

  post = async (url: string, ...args: any[]) =>
    await axios.post(`${BASE_URL}/${url}`, ...args);

  patch = async (url: string, ...args: any[]) =>
    await axios.patch(`${BASE_URL}/${url}`, ...args);

  delete = async (url: string, ...args: any[]) =>
    await axios.delete(`${BASE_URL}/${url}`, ...args);
}

export default new API();
