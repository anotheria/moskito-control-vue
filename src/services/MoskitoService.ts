import ApiService from '@/services/ApiService.ts';
import {IChart, IComponent, IView} from "@/types/interfaces.ts";

export default class MoskitoService {
  public static fetchViews(): Promise<any> {
    return ApiService.getAndReturnData('configuration/views');
  }

  public static updateView(data: IView): Promise<any> {
    return ApiService.postAndReturnData('configuration/views', data);
  }

  public static deleteView(name: string): Promise<any> {
    return ApiService.deleteAndReturnData(`configuration/views/${name}`);
  }

  public static fetchComponents(): Promise<any> {
    return ApiService.getAndReturnData('configuration/components');
  }

  public static updateComponent(data: IComponent): Promise<any> {
    return ApiService.postAndReturnData('configuration/components', data);
  }

  public static deleteComponent(name: string): Promise<any> {
    return ApiService.deleteAndReturnData(`configuration/components/${name}`);
  }

  public static fetchCharts(): Promise<any> {
    return ApiService.getAndReturnData('configuration/charts');
  }

  public static updateChart(data: IChart): Promise<any> {
    return ApiService.postAndReturnData('configuration/charts', data);
  }

  public static deleteChart(name: string): Promise<any> {
    return ApiService.deleteAndReturnData(`configuration/charts/${name}`);
  }

  public static getControl(): Promise<any> {
    return ApiService.getAndReturnData('control');
  }

  public static debugSaveConfig(): Promise<any> {
    return ApiService.getAndReturnData('debug/saveconfig');
  }

  public static debugNowRunning(): Promise<any> {
    return ApiService.getAndReturnData('debug/nowrunning');
  }

  public static debugNowRunningPast(): Promise<any> {
    return ApiService.getAndReturnData('debug/nowrunningpast');
  }

  public static debug(): Promise<any> {
    return ApiService.getAndReturnData('debug');
  }

  public static getComponentCapabilities(componentName: string): Promise<any> {
    return ApiService.getAndReturnData(`component/${componentName}/capabilities`);
  }

  public static getComponentConfig(componentName: string): Promise<any> {
    return ApiService.getAndReturnData(`component/${componentName}/config`);
  }

  public static getComponentConnectorInfo(componentName: string): Promise<any> {
    return ApiService.getAndReturnData(`component/${componentName}/info`);
  }

  public static getComponentThresholds(componentName: string): Promise<any> {
    return ApiService.getAndReturnData(`component/${componentName}/thresholds`);
  }
}
