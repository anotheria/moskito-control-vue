import { defineStore } from 'pinia';

export type RootState = {
  messages: Map<string, string>;
  views: any;
  activeView: string;
}

export const useMainStore = defineStore({
  id: 'mainStore',

  state: () => ({
    messages: new Map<string, string>(),
    views: null,
    activeView: '',
  } as RootState),

  getters: {
    getMessages: (state) => state.messages,
    getViews: (state) => state.views || [],
  },

  actions: {
    setInitialActiveView() {
      this.activeView = this.views.length ? this.views[0].name : '';
    },
    setActiveView(name: string = '') {
      this.activeView = name;
    }
  },
});
