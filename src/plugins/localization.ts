/* eslint-disable no-param-reassign */
import { App } from 'vue';
import { useMainStore } from '@/store/mainStore';

export default {
  install: (app: App) => {
    app.config.globalProperties.$localize = (key: string) => {
      if (key === '') return key;
      return useMainStore().getMessages.get(key) || key;
    };
    app.config.globalProperties.$localizeIfPresent = (key: string) => {
      if (key === '') return key;
      return useMainStore().getMessages.get(key) || '';
    };
    app.config.globalProperties.$localizeError = (errorKey: string) => {
      if (errorKey === '') return errorKey;
      return useMainStore().getMessages.get(`error.${errorKey}`) || errorKey;
    };

    app.provide('$localize', app.config.globalProperties.$localize);
    app.provide('$localizeIfPresent', app.config.globalProperties.$localizeIfPresent);
  },
};
