import axios from 'axios';

const apidois = axios.create({
  baseURL: 'https://api.github.com',
});

export default apidois;
