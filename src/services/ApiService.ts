import { AxiosRequestConfig } from 'axios';
import http from '@/plugins/axios';

export default class ApiService {
  public static get(resource: string, params?: AxiosRequestConfig) {
    return http.get(resource, params);
  }

  public static post(resource: string, data?: unknown, config?: AxiosRequestConfig) {
    return http.post(resource, data, config);
  }

  public static put(resource: string, data?: unknown) {
    return http.put(resource, data);
  }

  public static delete(resource: string, data?: AxiosRequestConfig) {
    return http.delete(resource, data);
  }

  public static getAndReturnData(resource: string, params?: AxiosRequestConfig) {
    return this.get(resource, params).then((response) => response.data);
  }

  public static postAndReturnData(resource: string, data?: unknown, config?: AxiosRequestConfig) {
    return this.post(resource, data, config).then((response) => response.data);
  }

  public static putAndReturnData(resource: string, data?: unknown) {
    return this.put(resource, data).then((response) => response.data);
  }

  public static deleteAndReturnData(resource: string, data?: unknown) {
    return this.delete(resource, { data } as AxiosRequestConfig).then((response) => response.data);
  }
}
