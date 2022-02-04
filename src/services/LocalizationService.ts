import ApiService from '@/services/ApiService';
import LocalStorageService from '@/services/LocalStorageService';
import { KEY_LANGUAGE } from '@/types/consts';
import { useMainStore } from '@/store/mainStore';

export default class LocalizationService {
  public static fetchAndStoreMessages(): void {
    const language = LocalStorageService.getLanguage();
    if (language === null || language === KEY_LANGUAGE.key) {
      useMainStore().messages = new Map<string, string>();
      return;
    }
    ApiService.getAndReturnData(`localization/messages/${language}`).then((response: any) => {
      useMainStore().messages = new Map<string, string>(Object.entries(response.results.messages));
    });
  }
}
