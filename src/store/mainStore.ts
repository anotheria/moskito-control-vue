import { defineStore } from 'pinia';
import {INotification} from "@/types/notification.interface.ts";
import {fetchChartLines, fetchHistory} from "@/api/common";
import {IGlobalChart, IGlobalCharts} from "@/types/chart.interface.ts";
import {IHistory, IHistoryItem} from "@/types/component.interface.ts";
import {IControlView} from "@/types/interfaces.ts";

export type RootState = {
  messages: Map<string, string>;
  views: Array<IControlView> | [];
  activeView: string;
  historyData: Array<IHistoryItem> | [];
  chartData: Array<IGlobalChart> | [];
  showStatus: boolean;
  showHistory: boolean;
  showCharts: boolean;
  muteStatus: INotification | {};
}

export const useMainStore = defineStore({
  id: 'mainStore',

  state: () => ({
    messages: new Map<string, string>(),
    views: [],
    activeView: '',
    historyData: [],
    chartData: [],
    showStatus: true,
    showHistory: false,
    showCharts: false,
    showTV: false,
    muteStatus: {},
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
        state.views.find((view: IControlView) => view.name === state.activeView).viewColor || 'none',
    getMuteStatus: (state) => state.muteStatus,
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
      this.showStatus = mode['status'];
      this.showHistory = mode['history'];
      this.showCharts = mode['charts'];
      this.showTV = mode['tv'];
    },
    fetchHistory() {
      fetchHistory(this.activeView).then((response: IHistory) => {
        this.historyData = response.history || []
      });

      fetchChartLines(this.activeView).then((response: IGlobalCharts) => {
        this.chartData = response.charts || [];
      });
    }
  },
});
