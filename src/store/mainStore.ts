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
  } as RootState),

  getters: {
    getMessages: (state) => state.messages,
    getViews: (state) => state.views || [],
    getChartData: (state) => state.chartData,
    getShowStatus: (state) => state.showStatus,
    getShowHistory: (state) => state.showHistory,
    getShowCharts: (state) => state.showCharts,
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
    setDashboardMode(mode: string) {
      if (mode === 'status') {
        this.showStatus = true;
        this.showHistory = false;
        this.showCharts = false;
      } else if (mode === 'history') {
        this.showHistory = true;
        this.showStatus = false;
        this.showCharts = false;
      } else if(mode === 'charts') {
        this.showCharts = true;
        this.showStatus = false;
        this.showHistory = false;
      }
    },
    fetchHistory() {
      MoskitoService.fetchHistory(this.activeView).then((response: any) => {
        this.historyData = response.historyItems || []
      });

      MoskitoService.fetchChartLines(this.activeView).then((response: any) => {
        console.log(response);
        this.chartData = response.charts || [];
      });
    }
  },
});
