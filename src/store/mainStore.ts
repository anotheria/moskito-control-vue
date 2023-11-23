import { defineStore } from 'pinia';

export type RootState = {
  messages: Map<string, string>;
  views: any;
}

export const useMainStore = defineStore({
  id: 'mainStore',

  state: () => ({
    messages: new Map<string, string>(),
    views: null,
  } as RootState),

  getters: {
    getMessages: (state) => state.messages,
  },

  actions: {
  },
});
