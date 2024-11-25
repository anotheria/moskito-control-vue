import ApiService from "@/services/ApiService.ts";
import {
    IAccumulators, IAccumulatorsCharts, IAccumulatorsData, IActions,
    ICapabilities,
    IComponentInfo,
    IConfig,
    IConnectorInfo, IHistory,
    IThresholds
} from "@/types/component.interface.ts";

export const getComponentCapabilities = async (componentName: string): Promise<ICapabilities> => {
    const response = await ApiService.getAndReturnData(`component/${componentName}/capabilities`);
    return response.results;
}

export const getComponentConfig = async (componentName: string): Promise<IConfig> => {
    const response = await ApiService.getAndReturnData(`component/${componentName}/config`);
    return response.results;
}

export const getComponentConnectorInfo = async (componentName: string): Promise<IConnectorInfo> => {
    const response = await ApiService.getAndReturnData(`component/${componentName}/connectorInfo`);
    return response.results;
}

export const getComponentInformation = async (componentName: string): Promise<IComponentInfo> => {
    const response = await ApiService.getAndReturnData(`component/${componentName}/componentInfo`);
    return response.results;
}

export const getComponentThresholds = async (componentName: string): Promise<IThresholds> => {
    const response = await ApiService.getAndReturnData(`component/${componentName}/thresholds`);
    return response.results;
}

export const getComponentAccumulators = async (componentName: string): Promise<IAccumulators> => {
    const response = await ApiService.getAndReturnData(`component/${componentName}/accumulators`);
    return response.results;
}

export const getAccumulatorsCharts = async (data: IAccumulatorsData): Promise<IAccumulatorsCharts> => {
    const response = await ApiService.postAndReturnData(`component/charts`, data);
    return response.results;
}

export const getComponentActions = async (componentName: string): Promise<IActions> => {
    const response = await ApiService.getAndReturnData(`component/${componentName}/actions`);
    return response.results;
}

export const getComponentHistory = async (componentName: string): Promise<IHistory> => {
    const response = await ApiService.getAndReturnData(`component/${componentName}/history`);
    return response.results;
}