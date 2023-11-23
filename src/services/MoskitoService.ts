import ApiService from '@/services/ApiService.ts';

export default class MoskitoService {
  public static fetchViews(): Promise<any> {
    return ApiService.getAndReturnData('configuration/views');
  }

  public static deleteView(name: string): Promise<any> {
    return ApiService.deleteAndReturnData(`configuration/views/${name}`);
  }

  public static fetchComponents(): Promise<any> {
    return ApiService.getAndReturnData('configuration/components');
  }

  public static deleteComponent(name: string): Promise<any> {
    return ApiService.deleteAndReturnData(`configuration/components/${name}`);
  }

  public static fetchCharts(): Promise<any> {
    return ApiService.getAndReturnData('configuration/charts');
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
}
