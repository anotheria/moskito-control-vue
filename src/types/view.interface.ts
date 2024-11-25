interface IObjectKeys {
    [key: string]: any;
}

export interface IViews {
    views: Array<IView> | [];
}

export interface IView extends IObjectKeys {
    name: string;
    chartTags: Array<string> | null;
    charts: Array<string> | null;
    componentCategories: Array<string> | null;
    componentTags: Array<string> | null;
    components: Array<string> | null;
    widgetTags: Array<string> | null;
    widgets: Array<string> | null;
}