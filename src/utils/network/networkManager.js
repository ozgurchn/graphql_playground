import { Alert } from 'react-native';
import axios from 'axios';
import config from '../../config/app.config';

axios.interceptors.response.use(
  response => {
    return response.data;
  },
  error => {
    if (__DEV__) {
      Alert.alert('Network Error', `${error}`);
    }

    return Promise.reject(error);
  }
);

axios.interceptors.request.use(_request => {
  return _request;
});

export default function request(url, method, data) {
  
  return axios(`${config.api.baseUrl}${url}`, {
    params: data,
    method,
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Authorization': `Bearer ${config.api.token}`,
    },
    data,
  });
}
