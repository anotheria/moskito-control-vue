export interface IDataRepositoryItem {
    name: string;
    value: string | null;
    formulas: string[];
}

export interface IDataRepositoryItems {
    data: Array<IDataRepositoryItem> | [];
}