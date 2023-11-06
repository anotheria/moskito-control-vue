// eslint-disable-next-line @typescript-eslint/ban-types
export interface IResponse<T = {}> {
  success: boolean;
  errorKey: string | null;
  message?: string | null;
  results: T;
}

export interface IToken {
  token: string;
}

export interface ILanguage {
  key: string;
  label: string;
}

export interface ILanguages {
  [key: string]: ILanguage;
}
