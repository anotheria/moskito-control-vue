/* eslint-disable no-param-reassign */
import axios, {
  AxiosError, AxiosRequestConfig, AxiosResponse, Method,
} from 'axios';
import LocalStorageService from '@/services/LocalStorageService';
import NotificationService from '@/services/NotificationService';
// import { MutationTypes, useStore } from '@/store';
// import { IUser, IUserInfo } from '@/types/interfaces';
// eslint-disable-next-line import/no-cycle
// dd
import router from '@/router';

const http = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  headers: {
    Accept: 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use((request: AxiosRequestConfig) => {
  request.headers!.authToken = LocalStorageService.getAuthToken();
  request.headers!.language = LocalStorageService.getLanguage();
  // request.headers['UTC-timezone'] = new Date().getTimezoneOffset() / 60;
  return request;
}, (error: AxiosError) => Promise.reject(error));

http.interceptors.response.use((response: AxiosResponse<{ success: boolean; errorKey: string; message: string }>) => {
  function showNotificationOnError(errorKey: string, message: string) {
    return errorKey !== 'REGISTRATION_INCOMPLETE'
      && errorKey !== 'EMAIL_CONFIRMATION_TOKEN_IS_INVALID'
      && errorKey !== 'NO_USER_EXISTS_WITH_SUCH_EMAIL'
      && errorKey !== 'REGISTRATION_EMAIL_ALREADY_EXISTS'
      && errorKey !== 'NAME_OR_PASSWORD_MISMATCH'
      && errorKey !== 'INVALID_SMS_CODE'
      && errorKey !== 'INVALID_PHONE_NUMBER'
      && errorKey !== 'REGISTRATION_CONFIRMATION_RESEND_LIMIT'
      && errorKey !== 'REMOVABLE_DOC_HAS_DEPENDENCIES'
      && errorKey !== 'OLD_PASSWORD_MISMATCH'
      && errorKey !== 'PASSWORD_DOES_NOT_MEET_THE_REQUIREMENTS'
      && errorKey !== 'EMAIL_ALREADY_EXISTS'
      && errorKey !== 'EXCHANGE_UNAUTHORIZED'
      && message !== 'Email already used.'
      && message !== 'ERR.PREMIUM_REQUIRED';
  }

  if (['put', 'delete', 'PUT', 'DELETE'].includes(String(response.config.method)) && response.data.success) {
    NotificationService.notifySuccess();
  }
  if (!response.data.success && showNotificationOnError(response.data.errorKey, response.data.message)) {
    NotificationService.notifyFailure();
  }
  return response;
}, (error) => {
  const { status } = error.response;
  if (status === 401) {
    // LocalStorageService.removeAuthToken();
    // useStore().commit(MutationTypes.SET_USER_PROFILE, {} as IUserInfo);
    router.push('/login');
  } else if (status === 404) {
    router.push('/404');
  } else if (status === 400) {
    console.log('');
  } else {
    NotificationService.notifyFailure();
  }
  return Promise.reject(error);
});

export default http;
