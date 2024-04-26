import axios from 'axios';
import { errorInterceptors, responseInterceptors } from './interceptors';
import { Environment } from '../../../environment';


export const Api = axios.create({
  baseURL: Environment.URL_BASE
});

Api.interceptors.response.use(
  (response) => responseInterceptors(response),
  (error) => errorInterceptors(error),
);