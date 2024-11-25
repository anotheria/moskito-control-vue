export interface ICapabilities {
    thresholds: boolean;
    connectorInfo: boolean;
    nowRunning: boolean;
    componentInfo: boolean;
    history: boolean;
    accumulators: boolean;
    config: boolean;
    actions: boolean;
}

export interface IConfig {
    config: string;
}

export interface IConnectorInfo {
    "Machine Name": string;
    "Start Command": string;
    "Uptime": string;
    "Updays": string;
    "JVM Version": string;
    "PID": string;
    "Uphours": string;
}

export interface IComponentInfo {
    "Last Update ts": string;
    "Category": string;
    "Update type": string;
    "Last Update": string;
    "Connector type": string;
    "Tags": string;
    "Update age": string;
    "Name": string;
    "Location": string;
}

export interface IThreshold {
    name: string;
    status: string;
    lastValue: string;
    statusChangeTimestamp: string;
}

export interface IThresholds {
    thresholds: IThreshold[] | [];
}

export interface IAccumulators {
    accumulators: string[] | [];
}

export interface IAccumulatorsData {
    component: string | null;
    accumulators: string[];
}

export interface IAccumulatorsChartLine {
    caption: string;
    values: string[];
    timestamp: number;
    jsonwithNumericTimestamp: string;
    debugTs: string;
}

export interface IAccumulatorsChart {
    name: string;
    divId: string;
    legend: string;
    lineNames: string[];
    points: IAccumulatorsChartLine[];
}

export interface IAccumulatorsCharts {
    charts: IAccumulatorsChart[] | [];
}

export interface IAction {
    type: string;
    name: string;
    componentName: string;
    command: string;
    parameters: Record<string, any>;
    parametersJSON: string;
}

export interface IActions {
    actions: IAction[] | [];
}

export interface IHistoryItem {
    timestamp: number;
    isoTimestamp: string;
    oldStatus: string;
    newStatus: string;
    componentName: string;
    oldMessages: string[];
    newMessages: string[];
}

export interface IHistory {
    history: IHistoryItem[] | [];
}

export interface IComponentData {
    name?: string;
    color?: string;
    thresholds?: IThreshold[] | [];
    config?: IConfig | string;
    connectorInfo?: Array<{ key: string, value: string }>;
    componentInfo?: Array<{ key: string, value: string }>;
    accumulators?: Array<{ name: string }>;
    actions?: IAction[];
    history?: IHistoryItem[];
}

// Settings

export interface IComponents {
    components: Array<IComponent> | [];
}

export interface IComponent {
    name: string;
    category: string | null;
    tags: string | null;
    connectorType: string | null;
    credentials: string | null;
    data: any;
    headers: Array<IHeader> | null;
    location: string | null;
}

export interface IHeader {
    key: string;
    value: string | null;
}

export interface IComponentData {
    key: string;
    value: string | null;
}

export interface IArrayDataItem {
    key: string;
    value: string;
}