import { defineStore } from 'pinia';
import MoskitoService from "@/services/MoskitoService.ts";

export type RootState = {
  messages: Map<string, string>;
  views: any;
  activeView: string;
  historyData: any;
  chartData: any;
  showStatus: boolean;
  showHistory: boolean;
  showCharts: boolean;
}

export const useMainStore = defineStore({
  id: 'mainStore',

  state: () => ({
    messages: new Map<string, string>(),
    views: null,
    activeView: '',
    historyData: null,
    chartData: [],
    showStatus: true,
    showHistory: false,
    showCharts: false,
    showTV: false,
  } as RootState),

  getters: {
    getMessages: (state) => state.messages,
    getViews: (state) => state.views || [],
    getChartData: (state) => state.chartData,
    getShowStatus: (state) => state.showStatus,
    getShowHistory: (state) => state.showHistory,
    getShowCharts: (state) => state.showCharts,
    getShowTV: (state) => state.showTV,
    getDashboardStatuses: (state) => ({
      status: state.showStatus,
      charts: state.showHistory,
      history: state.showCharts,
    }),
    getActiveViewStatus: (state) =>
        state.views.find((view: any) => view.name === state.activeView).viewColor || 'none',
  },

  actions: {
    setInitialActiveView() {
      this.activeView = this.views.length ? this.views[0].name : '';
      this.fetchHistory();
    },
    setActiveView(name: string = '') {
      this.activeView = name;
      this.fetchHistory();
    },
    setDashboardMode(mode: any) {
      this.showStatus = mode['status'];
      this.showHistory = mode['history'];
      this.showCharts = mode['charts'];
      this.showTV = mode['tv'];
    },
    fetchHistory() {
      MoskitoService.fetchHistory(this.activeView).then((response: any) => {
        this.historyData = response.results.history || []
      });

      MoskitoService.fetchChartLines(this.activeView).then((response: any) => {
        this.chartData = response.charts || [];
      });
    }
  },
});
