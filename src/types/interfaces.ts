// eslint-disable-next-line @typescript-eslint/ban-types
import {IChart} from "@/types/chart.interface.ts";
import {IComponent} from "@/types/component.interface.ts";
import {IView} from "@/types/view.interface.ts";

export interface IResponse<T = {}> {
  success: boolean;
  errorKey?: string | null;
  message?: string | null;
  results: T;
}

export interface ILanguage {
  key: string;
  label: string;
}

export interface ILanguages {
  [key: string]: ILanguage;
}

export interface ISettingsContent {
  components: Array<IComponent>;
  views: Array<IView>;
  charts: Array<IChart>;
}


export interface IControl {
  muteStatus: IMuteStatus;
  views: Array<IControlView[]> | [];
}

export interface IControlView {
  name: string;
  viewColor: string;
  components: Array<IControlComponent> | [];
  dataWidgets: Array<IWidget> | [];
}

export interface IMuteStatus {
  remainingMutingTime: number;
  muted: boolean;
  remainingMutingTimeAsString: string;
}

export interface IControlComponent {
  name: string;
  category: string | null;
  color: string;
  messages: Array<string> | [];
  lastUpdateTimestamp: number;
  ISO8601Timestamp: string;
}

export interface IWidget {
  type: string;
  caption: string;
  data: IWidgetData;
}

export interface IWidgetData {
  number: string;
  color?: string | null;
  arrow?: string | null;
  change?: string | null;
  percent?: string | null;
}
