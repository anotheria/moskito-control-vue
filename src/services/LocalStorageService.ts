export default class LocalStorageService {
  private static LANGUAGE = 'language';

  private static AUTH_TOKEN = 'authToken';

  public static getLanguage(): string {
    return this.get(this.LANGUAGE) || '';
  }

  public static setLanguage(language: string) {
    this.set(this.LANGUAGE, language);
  }

  public static getAuthToken(): string {
    return this.get(this.AUTH_TOKEN) || '';
  }

  public static setAuthToken(authToken: string) {
    this.set(this.AUTH_TOKEN, authToken);
  }

  public static removeAuthToken() {
    this.remove(this.AUTH_TOKEN);
  }

  private static set(name: string, value: string): void {
    localStorage.setItem(name, value);
  }

  private static get(name: string): string | null {
    return localStorage.getItem(name);
  }

  private static remove(name: string): void {
    localStorage.removeItem(name);
  }
}
