// eslint-disable-next-line @typescript-eslint/ban-types
export interface IResponse<T = {}> {
  success: boolean;
  errorKey: string | null;
  message?: string | null;
  results: T;
}

interface IObjectKeys {
  [key: string]: any;
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
  charts: Array<any>;
}

export interface IComponent {
  name: string | null;
  category: string | null;
  tags: string | null;
  connectorType: string | null;
  credentials: string | null;
  data: any;
  headers: Array<IHeader> | null;
  location: string | null;
}

export interface IHeader {
  key: string | null;
  value: string | null;
}

export interface IView extends IObjectKeys {
  name: string | null;
  chartTags: Array<string> | null;
  charts: Array<string> | null;
  componentCategories: Array<string> | null;
  componentTags: Array<string> | null;
  components: Array<string> | null;
  widgetTags: Array<string> | null;
  widgets: Array<string> | null;
}
export interface IChart {
  name: string | null;
  tags: string | null;
  limit?: number | null;
  lines: Array<IChartLine> | null;
}

export interface IChartLine {
  component: string | null;
  componentTags: string | null;
  accumulator: string | null;
  caption: string | null;
}

