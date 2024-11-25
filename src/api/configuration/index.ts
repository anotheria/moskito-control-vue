import ApiService from "@/services/ApiService.ts";
import {IChart, ICharts} from "@/types/chart.interface.ts";
import {IComponent, IComponents} from "@/types/component.interface.ts";
import {IViews, IView} from "@/types/view.interface.ts";


export const fetchCharts = async (): Promise<ICharts> => {
    const response = await ApiService.getAndReturnData('configuration/charts');
    return response.results;
}

export const updateChart = async (data: IChart): Promise<void> => {
    return await ApiService.postAndReturnData('configuration/charts', data);
}

export const deleteChart = async (name: string): Promise<void> => {
    return await ApiService.deleteAndReturnData(`configuration/charts/${name}`);
}

export const fetchComponents = async (): Promise<IComponents> => {
    const response = await ApiService.getAndReturnData('configuration/components');
    return response.results;
}

export const updateComponent = async (data: IComponent): Promise<void> => {
    return await ApiService.postAndReturnData('configuration/components', data);
}

export const deleteComponent = async (name: string): Promise<void> => {
    return await ApiService.deleteAndReturnData(`configuration/components/${name}`);
}

export const fetchViews = async (): Promise<IViews> => {
    const response = await ApiService.getAndReturnData('configuration/views');
    return response.results;
}

export const updateView = async (data: IView): Promise<void> => {
    return await ApiService.postAndReturnData('configuration/views', data);
}

export const deleteView = async (name: string): Promise<void> => {
    return await ApiService.deleteAndReturnData(`configuration/views/${name}`);
}