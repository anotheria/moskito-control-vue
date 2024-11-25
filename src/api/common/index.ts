import ApiService from "@/services/ApiService.ts";
import {IDataRepositoryItems} from "@/types/repository.interface.ts";
import {IHistory} from "@/types/component.interface.ts";
import {IGlobalCharts} from "@/types/chart.interface.ts";
import {IControl} from "@/types/interfaces.ts";

export const fetchHistory = async (view: string): Promise<IHistory> => {
    const { results } = await ApiService.getAndReturnData(`/history/${view}`);
    return results;
};

export const fetchChartLines = async (view: string): Promise<IGlobalCharts> => {
    return await ApiService.getAndReturnData(`/charts/lines/${view}`);
};

export const getControl = async (): Promise<IControl> => {
    const { results } = await ApiService.getAndReturnData('control');
    return results;
};

export const getDataRepository = async (): Promise<IDataRepositoryItems> => {
    const { results } = await ApiService.getAndReturnData(`/datarepository/store`);
    return results;
};