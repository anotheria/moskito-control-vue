import { defineStore } from 'pinia';

export type RootState = {
  messages: Map<string, string>;
}

export const useMainStore = defineStore({
  id: 'mainStore',

  state: () => ({
    messages: new Map<string, string>(),
  } as RootState),

  getters: {
    getMessages: (state) => state.messages,
  },

  actions: {
  },
});
