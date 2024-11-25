export interface ICharts {
    charts: Array<IChart> | [];
}

export interface IChart {
    name: string;
    tags: string | null;
    limit?: number;
    lines: Array<IChartLine> | [];
}

export interface IChartLine {
    component: string | null;
    componentTags: string | null;
    accumulator: string | null;
    caption: string | null;
}


export interface IGlobalCharts {
    charts: Array<IGlobalChart> | [];
}

export interface IGlobalChart {
    name: string;
    lines: Array<IGlobalChartLine> | [];
    captions: string[] | [];
    timestamps: number[] | [];
}

export interface IGlobalChartLine {
    lineName: string;
    values: string[] | [];
}